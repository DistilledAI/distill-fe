import { maxAvatar } from "@assets/images"
import {
  DefaiAgentTypeIcon,
  DefaultAgentTypeIcon,
} from "@components/Icons/BrainAIIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { UserHexagonIcon } from "@components/Icons/UserIcon"
import useAuthState from "@hooks/useAuthState"
import { Button, Checkbox } from "@nextui-org/react"
import CategoryLabel from "@pages/AgentDetail/CategoryLabel"
import { findTokenByAddress } from "@pages/MyPrivateAgent/helpers"
import { Network } from "@pages/MyPrivateAgent/interface"
import useSend from "@pages/MyPrivateAgent/Send/useSend"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import useGetPaymentHistory from "./useGetPaymentHistory"

export const AGENT_TYPE_KEY = {
  DEFAULT: 0,
  DEFAI: 1,
}

const AGENT_TYPE_OPTIONS = [
  {
    title: "Default Agent",
    desc: [
      "AI Agent trained on your private data",
      "Customizable behaviors",
      "Automation for X and Telegram activities",
    ],
    icon: <DefaultAgentTypeIcon />,
    key: AGENT_TYPE_KEY.DEFAULT,
  },
  {
    title: "DeFAI Agent",
    desc: [
      "Automation DeFi activities",
      "All Default Agent utilities included",
      "Creator does not control the agent wallet.",
    ],
    icon: <DefaiAgentTypeIcon />,
    key: AGENT_TYPE_KEY.DEFAI,
  },
]

const AgentType: React.FC<{ isDisabled?: boolean }> = ({ isDisabled }) => {
  const { isPaid, checkPayment } = useGetPaymentHistory()
  const { control } = useFormContext()
  const { handleSend } = useSend()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const amountMAX = 1
  const maxTokenAddress = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h"
  const ADDRESS_PAYMENT_NETWORK_SOL =
    "H65QnPNMWj1EGgwDD5RH3oHQBbwmuBbAzXgW8no6gKwQ"
  const [isPaymentSuccess, setPaymentSuccess] = useState<boolean>(false)

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
        setPaymentSuccess(true)
      }
    } catch (error) {
      console.error(error, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <CategoryLabel text="Agent Type" icon={<UserHexagonIcon />} />
      <div className="mb-2 mt-4 flex items-center gap-3">
        {AGENT_TYPE_OPTIONS.map((item: any) => {
          const isDefaiType = item.key === AGENT_TYPE_KEY.DEFAI

          return (
            <Controller
              name="typeAgent"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                const isSelected = value === item.key
                return (
                  <div
                    className="flex h-[200px] items-start justify-between gap-3 rounded-[14px] border-[2px] border-transparent bg-mercury-30 p-4 hover:cursor-pointer aria-checked:opacity-60 aria-selected:border-brown-500"
                    key={item.key}
                    aria-selected={isSelected}
                    aria-checked={isDisabled}
                    onClick={() => {
                      if (isDisabled) return
                      onChange(item.key)
                    }}
                  >
                    {item.icon}
                    <div>
                      <span className="text-base-b text-mercury-900">
                        {item.title}
                      </span>

                      <div className="mt-2">
                        {item.desc.map((record: any, index: number) => {
                          return (
                            <div key={index}>
                              <span
                                className={twMerge(
                                  "text-14-base text-mercury-700",
                                  isDefaiType &&
                                    index === 0 &&
                                    "font-semibold text-[#7EB000]",
                                )}
                              >
                                {record}
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      {isDefaiType &&
                        (isPaymentSuccess || isPaid ? (
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
                            className="mt-2 h-8 rounded-full bg-mercury-950"
                            onPress={() => {
                              if (isDisabled) return
                              handleSubmit({
                                tokenAddress: maxTokenAddress,
                                toAccountAddress: ADDRESS_PAYMENT_NETWORK_SOL,
                                amount: amountMAX.toString(),
                              })
                            }}
                            isLoading={isLoading}
                            isDisabled={!isSelected}
                          >
                            <div className="flex items-center gap-1">
                              <img
                                src={maxAvatar}
                                width={16}
                                className="rounded-full"
                              />
                              <span className="font-medium text-[#BCAA88]">
                                <span className="font-bold">5,000 </span>
                                Max
                              </span>
                              <span className="text-14-base-b text-mercury-30">
                                {" "}
                                Pay Now*
                              </span>
                            </div>
                          </Button>
                        ))}
                    </div>
                    <Checkbox radius="full" isSelected={isSelected} />
                  </div>
                )
              }}
            />
          )
        })}
      </div>

      <div className="flex justify-end">
        <span className="text-[13px] italic text-mercury-700">
          *Note: You can pay later to activate the DeFAI type.
        </span>
      </div>
    </div>
  )
}
export default AgentType
