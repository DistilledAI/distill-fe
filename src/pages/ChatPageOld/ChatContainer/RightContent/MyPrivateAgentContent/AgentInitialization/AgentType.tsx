import { maxAvatar } from "@assets/images"
import { DefaultAgentTypeIcon } from "@components/Icons/BrainAIIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import {
  DeepSeekIcon,
  DistilledIconNoText,
} from "@components/Icons/DistilledAIIcon"
import useAuthState from "@hooks/useAuthState"
import { Button, Checkbox } from "@nextui-org/react"
import { FieldLabel } from "@pages/AgentDetail/CategoryLabel"
import { findTokenByAddress } from "@pages/MyPrivateAgent/helpers"
import { Network } from "@pages/MyPrivateAgent/interface"
import useSend from "@pages/MyPrivateAgent/Send/useSend"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import useGetPaymentHistory from "./useGetPaymentHistory"

export enum AGENT_TYPE_KEY {
  DEFAULT = 0,
  DEFAI = 1,
}

export const TYPE_LLM_MODEL = {
  LLM_MODEL_BASIC: 1,
  DEEPSEEK_MODEL: 2,
}

const agentType = {
  title: "AI Agent with Private Intelligence",
  desc: [
    "AI Agent trained on your private data",
    "Customizable behaviors",
    "Automation for X and Telegram activities",
  ],
  icon: <DefaultAgentTypeIcon />,
  key: AGENT_TYPE_KEY.DEFAI,
}

const LLM_MODEL_OPTIONS = [
  {
    label: "Distilled",
    value: TYPE_LLM_MODEL.LLM_MODEL_BASIC,
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mercury-950">
        <DistilledIconNoText color="#FFFFFF" width={25} height={13} />
      </div>
    ),
  },
  {
    label: "DeepSeek",
    value: TYPE_LLM_MODEL.DEEPSEEK_MODEL,
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4D6BFE]">
        <DeepSeekIcon />
      </div>
    ),
    description: "Not available for Clans",
  },
]

const urlStaging = ["mesh-distilled-ai-dev.web.app", "localhost:5173"]
const isStaging = urlStaging.includes(window.location.host)

const AgentType: React.FC<{
  isDisabledTypeAgent?: boolean
  isDisabledLLMModel?: boolean
  llmModel?: number
  setLlmModel?: React.Dispatch<React.SetStateAction<number>>
}> = ({ isDisabledTypeAgent, isDisabledLLMModel, setLlmModel, llmModel }) => {
  const { isPaid, checkPayment } = useGetPaymentHistory()
  const { control } = useFormContext()
  const { handleSend } = useSend()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const amountMAX = isStaging ? 1 : 1000
  const maxTokenAddress = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h"
  const ADDRESS_PAYMENT_NETWORK_SOL = isStaging
    ? "H65QnPNMWj1EGgwDD5RH3oHQBbwmuBbAzXgW8no6gKwQ"
    : "G8BHHS9nf9Rrizecm1DJh2Lj124VERVRr59n36j18zfg"
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
      <div className="mb-2 mt-4 flex items-center gap-3 max-md:flex-wrap">
        <div
          className="flex h-fit w-full items-start justify-between gap-3 rounded-[14px] border-[2px] border-transparent bg-mercury-30 p-4 hover:cursor-pointer max-md:h-auto"
          key={agentType.key}
        >
          <div className="flex gap-3">
            {agentType.icon}
            <div>
              <span className="text-base-b text-mercury-900">
                {agentType.title}
              </span>
              <div className="ml-4 mt-1">
                {agentType.desc.map((record: any, index: number) => {
                  return (
                    <ul key={index} className="list-disc">
                      <li>
                        <span className="text-[13px] font-medium text-mercury-700">
                          {record}
                        </span>
                      </li>
                    </ul>
                  )
                })}
              </div>
            </div>
          </div>

          {isPaymentSuccess || isPaid ? (
            <Button className="h-8 rounded-full bg-[#DEFAE5]">
              <div className="flex items-center gap-1">
                <CheckFilledIcon color="#20993F" />
                <span className="text-14 font-bold text-[#20993F]">
                  Payment Successful
                </span>
              </div>
            </Button>
          ) : (
            <Button
              className="h-8 rounded-full bg-mercury-950"
              onPress={() => {
                if (isDisabledTypeAgent) return
                handleSubmit({
                  tokenAddress: maxTokenAddress,
                  toAccountAddress: ADDRESS_PAYMENT_NETWORK_SOL,
                  amount: amountMAX.toString(),
                })
              }}
              isLoading={isLoading}
            >
              <div className="flex items-center gap-1">
                <img src={maxAvatar} width={16} className="rounded-full" />
                <span className="font-medium text-[#BCAA88]">
                  <span className="font-bold">1,000 </span>
                  MAX
                </span>
                <span className="text-14-base font-bold uppercase text-mercury-30">
                  {" "}
                  Activate <span className="text-[#FF3B30]">*</span>
                </span>
              </div>
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <span className="text-base-sb italic text-mercury-900">
          <span className="text-[#FF3B30]">*</span> Note: You can pay later, but
          payment is required to activate your agent.
        </span>
      </div>

      <div className="max-md:mt-5">
        <FieldLabel text="LLM Model" />
      </div>
      <div className="mt-2 flex w-full gap-3 max-md:flex-wrap">
        {LLM_MODEL_OPTIONS.map((record, index) => {
          return (
            <Controller
              key={index}
              name="llmModel"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                const isSelected =
                  value == record.value || llmModel == record.value
                return (
                  <div
                    className="flex h-[80px] w-1/2 items-start justify-between gap-3 rounded-[14px] border-[2px] border-transparent bg-mercury-30 p-4 hover:cursor-pointer aria-checked:opacity-50 aria-selected:border-brown-500 max-md:h-auto max-md:w-full"
                    key={record.value}
                    aria-selected={isSelected}
                    aria-checked={isDisabledLLMModel}
                    onClick={() => {
                      if (isDisabledLLMModel) return
                      onChange(record.value)
                      if (setLlmModel) setLlmModel(record.value)
                    }}
                  >
                    <div className="flex gap-3">
                      {record.icon}
                      <div>
                        <span className="text-base-b text-mercury-900">
                          {record.label}
                        </span>
                        <br />
                        <span className="text-[13px] font-medium text-[#F78500]">
                          {record.description}
                        </span>
                      </div>
                    </div>
                    <Checkbox
                      radius="full"
                      isSelected={isSelected}
                      onChange={() => {
                        if (isDisabledLLMModel) return
                        onChange(record.value)
                        if (setLlmModel) setLlmModel(record.value)
                      }}
                    />
                  </div>
                )
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
export default AgentType
