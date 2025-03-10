import { maxAvatar } from "@assets/images"
import AgentStatus from "@components/AgentStatus"
import AlertBox from "@components/AlertBox"
import HeaderMobileBack from "@components/HeaderMobileBack"
import {
  DefaiAgentTypeIcon,
  DefaultAgentTypeIcon,
} from "@components/Icons/BrainAIIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { AGENT_TYPE_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import useGetPaymentHistory from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/useGetPaymentHistory"
import { findTokenByAddress } from "@pages/MyPrivateAgent/helpers"
import { Network } from "@pages/MyPrivateAgent/interface"
import useSend from "@pages/MyPrivateAgent/Send/useSend"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const urlStaging = ["mesh-distilled-ai-dev.web.app", "localhost:5173"]
const isStaging = urlStaging.includes(window.location.host)

const MyAgentPage = () => {
  const { isPaid, checkPayment } = useGetPaymentHistory()
  const agents = useAppSelector((state) => state.agents.myAgents)
  const agent = agents[0]
  const isAgentActive = agent && agent?.status === STATUS_AGENT.ACTIVE
  const typeAgentData = agent?.typeAgent

  const { handleSend } = useSend()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const amountMAX = isStaging ? 1 : 1000
  const maxTokenAddress = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h"
  const ADDRESS_PAYMENT_NETWORK_SOL = isStaging
    ? "H65QnPNMWj1EGgwDD5RH3oHQBbwmuBbAzXgW8no6gKwQ"
    : "G8BHHS9nf9Rrizecm1DJh2Lj124VERVRr59n36j18zfg"

  useEffect(() => {
    checkPayment()
  }, [])

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

          {
            !isAgentActive && (
              <AlertBox
                isVisible={!isAgentActive}
                messages={[
                  "Please ignore this if you have already made a payment.",
                  `Please make a payment to activate the agent type.`,
                  `Your agent will automatically activate once your payment is verified (within 24 working hours).`,
                ]}
                icon={
                  typeAgentData == AGENT_TYPE_KEY.DEFAI ? (
                    <DefaiAgentTypeIcon />
                  ) : (
                    <DefaultAgentTypeIcon />
                  )
                }
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
                          <span className="font-bold">1,000 </span>
                          MAX
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
            )

            // : (
            //   <AlertBox
            //     isVisible={!isAgentActive}
            //     messages={[
            //       "Please join the whitelist to activate. You will receive an email from contact@distilled.ai once your Personal Agent has been approved.",
            //     ]}
            //     links={[
            //       {
            //         to: "https://forms.gle/qGWWAnt3nWWAkxeE9",
            //         label: "Enter waitlist",
            //         external: true,
            //       },
            //       { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
            //     ]}
            //   />
            // )
          }
        </>
      )}
    </div>
  )
}

export default MyAgentPage
