import { maxAvatar } from "@assets/images"
import AlertBox from "@components/AlertBox"
import HeaderMobileBack from "@components/HeaderMobileBack"
import { DefaiAgentTypeIcon } from "@components/Icons/BrainAIIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import MyAgents from "@pages/Account/MyAgents"
import AgentStatus from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization/AgentStatus"
import { AGENT_TYPE_KEY } from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import useGetPaymentHistory from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization/useGetPaymentHistory"
import { findTokenByAddress } from "@pages/MyPrivateAgent/helpers"
import { Network } from "@pages/MyPrivateAgent/interface"
import useSend from "@pages/MyPrivateAgent/Send/useSend"
import { toBN } from "@utils/format"
import { useState } from "react"
import { toast } from "react-toastify"

const MyAgentPage = () => {
  const { isPaid } = useGetPaymentHistory()
  const agents = useAppSelector((state) => state.agents.myAgents)
  const agent = agents[0]
  const isAgentActive = agent && agent?.status === STATUS_AGENT.ACTIVE
  //@ts-ignore
  const typeAgentData = agent?.typeAgent

  const { handleSend } = useSend()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const amountMAX = 1
  const maxTokenAddress = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h"
  const ADDRESS_PAYMENT_NETWORK_SOL =
    "H65QnPNMWj1EGgwDD5RH3oHQBbwmuBbAzXgW8no6gKwQ"

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

  return (
    <div className="mx-auto max-w-[860px] space-y-6 px-4 pb-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[50px]">
      <div className="md:hidden">
        <HeaderMobileBack title="My Agents" />
      </div>
      {!!agent && (
        <>
          <AgentStatus
            classNames={{
              wrapper: "flex-row justify-center gap-4",
              textWrapper: "flex-row gap-1 items-center",
            }}
            isAgentActive={isAgentActive}
          />

          {!isAgentActive && typeAgentData === AGENT_TYPE_KEY.DEFAI ? (
            <AlertBox
              isVisible={!isAgentActive}
              messages={[
                "Please ignore this if you have already made a payment.",
                `Please make a payment to activate the DeFAI Agent type.`,
                `Your agent will automatically activate once your payment is verified (within 24 working hours).`,
              ]}
              icon={<DefaiAgentTypeIcon />}
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
                      <img
                        src={maxAvatar}
                        width={14}
                        className="rounded-full"
                      />
                      <span className="text-14 font-medium text-[#BCAA88]">
                        <span className="font-bold">5,000 </span>
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
          ) : (
            <AlertBox
              isVisible={!isAgentActive}
              messages={[
                "Please join the whitelist to activate. You will receive an email from contact@distilled.ai once your Personal Agent has been approved.",
              ]}
              links={[
                {
                  to: "https://forms.gle/qGWWAnt3nWWAkxeE9",
                  label: "Enter waitlist",
                  external: true,
                },
                { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
              ]}
            />
          )}
        </>
      )}
      <MyAgents agents={agents} />
    </div>
  )
}

export default MyAgentPage
