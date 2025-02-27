import { avaMaxGray, maxAvatar } from "@assets/images"
import { solanaCircleIcon } from "@assets/svg"
import AgentStatus from "@components/AgentStatus"
import AlertBox from "@components/AlertBox"
import AvatarCustom from "@components/AvatarCustom"
import { CloudXIcon } from "@components/Icons"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { PenFullIcon } from "@components/Icons/Edit"
import { MessagePlusIcon } from "@components/Icons/Message"
import { PublishIcon } from "@components/Icons/RewardsIcons"
import { PATH_NAMES, Publish, STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import ContractDisplay from "@pages/ChatBoxLive/ContractDisplay"
import TradeTokenButton from "@pages/ChatBoxLive/TradeTokenButton"
import { AGENT_TYPE_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import useGetPaymentHistory from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/useGetPaymentHistory"
import { findTokenByAddress } from "@pages/MyPrivateAgent/helpers"
import { Network } from "@pages/MyPrivateAgent/interface"
import useSend from "@pages/MyPrivateAgent/Send/useSend"
import { useQueryClient } from "@tanstack/react-query"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { publishMarketplace } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const urlStaging = ["mesh-distilled-ai-dev.web.app", "localhost:5173"]
const isStaging = urlStaging.includes(window.location.host)
const maxTokenAddress = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h"
const ADDRESS_PAYMENT_NETWORK_SOL = isStaging
  ? "H65QnPNMWj1EGgwDD5RH3oHQBbwmuBbAzXgW8no6gKwQ"
  : "G8BHHS9nf9Rrizecm1DJh2Lj124VERVRr59n36j18zfg"

const CurrentAgent = () => {
  const { isPaid, checkPayment } = useGetPaymentHistory()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const agents = useAppSelector((state) => state.agents.myAgents)
  const agent = agents[0]
  const [isPublished, setIsPublished] = useState(
    agent.publish === Publish.Published,
  )
  const isAgentActive = agent && agent?.status === STATUS_AGENT.ACTIVE

  const { handleSend } = useSend()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const amountMAX = isStaging ? 1 : 1000

  useEffect(() => {
    checkPayment()
  }, [])

  useEffect(() => {
    setIsPublished(agent.publish === Publish.Published)
  }, [agent.publish])

  const handleSubmit = async ({
    toAccountAddress,
    amount,
    tokenAddress,
  }: {
    toAccountAddress?: string
    amount?: string
    tokenAddress?: string
  }) => {
    try {
      if (!toAccountAddress || !amount || !tokenAddress) return
      setIsLoading(true)
      const timestamp = Math.floor(Date.now())
      const decimals = findTokenByAddress(tokenAddress)?.decimals || 6
      const sendAmount = toBN(
        toBN(amount)
          .multipliedBy(10 ** decimals)
          .toFixed(0, 1),
      ).toNumber()

      const result = await handleSend({
        network: Network.SOL,
        fromWalletAddress: user?.publicAddress,
        tokenAddress,
        toWalletAddress: toAccountAddress,
        amount: sendAmount,
        timestamp,
        decimals,
      })
      if (result) {
        toast.success("Sent successfully!")
      }
    } catch (error) {
      console.error(error, "error")
    } finally {
      setIsLoading(false)
    }
  }

  const onPublishMarketplace = async (botId: number) => {
    try {
      if (!isAgentActive) return
      setLoading(true)
      const res = await publishMarketplace(botId)
      if (res) {
        setIsPublished(!isPublished)
        queryClient.refetchQueries({
          queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL],
        })
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const getTradeLink = () => {
    if (!agent.contractAddress) return undefined
    return `https://agents.land/${agent.typeAgent === AGENT_TYPE_KEY.DEFAULT ? "trading" : "trading-defai"}/${agent.contractAddress}`
  }

  return (
    <div>
      <AgentStatus
        classNames={{
          wrapper: "flex-row gap-4 mb-6",
          textWrapper: "flex-row gap-1",
        }}
        isAgentActive={isAgentActive}
      />
      {!isAgentActive && (
        <AlertBox
          isVisible={!isAgentActive}
          messages={[
            <p className="mb-2 font-bold">
              Please ignore this if you have already made a payment.
            </p>,
            `Please make a payment to activate the agent type.`,
            `Your agent will automatically activate once your payment is verified (within 24 working hours).`,
          ]}
          icon={null}
          extendButton={
            isPaid ? (
              <Button className="mt-2 h-8 rounded-full bg-[#DEFAE5]">
                <div className="flex items-center gap-1">
                  <CheckFilledIcon color="#20993F" />
                  <span className="text-14 font-bold text-[#20993F]">
                    Payment Successful
                  </span>
                </div>
              </Button>
            ) : (
              <Button
                className="h-8 min-w-[165px] rounded-full bg-mercury-950"
                onPress={() => {
                  handleSubmit({
                    tokenAddress: maxTokenAddress,
                    toAccountAddress: ADDRESS_PAYMENT_NETWORK_SOL,
                    amount: amountMAX.toString(),
                  })
                }}
                isLoading={isLoading}
              >
                <div className="flex items-center gap-1">
                  <img src={maxAvatar} width={14} className="rounded-full" />
                  <span className="text-14 font-medium text-[#BCAA88]">
                    <span className="font-bold">1,000 </span>
                    Max
                  </span>
                  <span className="text-13 font-bold text-mercury-30">
                    {" "}
                    Pay Now
                  </span>
                </div>
              </Button>
            )
          }
        />
      )}
      <div className="mb-2 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-base-b text-mercury-950 max-md:text-15">
            Preview:
          </p>
          <Button
            isDisabled={!isAgentActive || loading}
            isLoading={loading}
            onPress={() => onPublishMarketplace(agent.id)}
            className="h-[32px] rounded-full bg-mercury-100 font-semibold"
          >
            {!isPublished ? <PublishIcon color="black" /> : <CloudXIcon />}
            <span>{!isPublished ? "Publish" : "Unpublish"}</span>
          </Button>
        </div>
        <div className="mt-2 rounded-[14px] border-1 border-mercury-100 bg-mercury-50 p-4">
          <div className="flex gap-6">
            <div>
              <AvatarCustom
                className="h-[72px] w-[72px] rounded-full border-none max-md:h-[50px] max-md:w-[50px]"
                src={agent.avatar || avaMaxGray}
                publicAddress={agent.publicAddress || agent.username}
              />
            </div>
            <div>
              <p className="line-clamp-1 font-bold max-md:text-14">
                {agent.username}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-medium text-mercury-600 max-md:text-14">
                  Created by
                </span>
                <div className="flex items-center gap-1">
                  <AvatarCustom
                    className="h-[18px] w-[18px] rounded-full max-md:h-[15px] max-md:w-[15px]"
                    src={user.avatar}
                    publicAddress={user.publicAddress}
                  />
                  <p className="font-bold text-[#A2845E] max-md:text-14">
                    @{user.username}
                  </p>
                </div>
              </div>
              <p className="mt-2 line-clamp-5 max-h-[65px] overflow-y-auto text-14 font-medium text-mercury-600 scrollbar-hide max-md:mt-1">
                {agent.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <TradeTokenButton
                  tradeLink={getTradeLink()}
                  classNames={{
                    btnNot: "!w-auto h-[32px]",
                    btnLink: "!w-auto h-[32px]",
                  }}
                />
                {agent.contractAddress && (
                  <ContractDisplay
                    label=""
                    classNames={{
                      contentWrapper: "bg-mercury-100 py-1",
                    }}
                    icon={solanaCircleIcon}
                    value={agent.contractAddress}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="my-6 w-full border-t-1 border-dashed border-mercury-400 max-md:my-3" />
          <div className="flex items-center justify-between">
            <Link to={`${PATH_NAMES.PRIVATE_AGENT}/${agent.id}`}>
              <MessagePlusIcon color="black" />
            </Link>
            <Button
              onPress={() => navigate(`${PATH_NAMES.AGENT_DETAIL}/${agent.id}`)}
              isDisabled={!isAgentActive}
              className="flex h-[50px] items-center gap-1 rounded-full bg-mercury-950 px-4 font-semibold text-white max-md:h-[44px]"
            >
              <PenFullIcon />
              <span>Edit Agent</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentAgent
