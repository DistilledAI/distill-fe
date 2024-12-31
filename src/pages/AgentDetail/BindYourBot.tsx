import { agentToTelebot, echoAgentBadge, telebotToAgent } from "@assets/images"
import CloseButton from "@components/CloseButton"
import {
  CircleCheckFilled,
  LinkAccountIcon,
  XboxXFilled,
} from "@components/Icons"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { BookIcon, TelegramOnlineIcon } from "@components/Icons/SocialLinkIcon"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { telegramMapAgent } from "services/agent"
import { twMerge } from "tailwind-merge"

const BinYourBot: React.FC<{ botWebhooks: any; refetch: any }> = ({
  botWebhooks,
  refetch,
}) => {
  const telegramBotData = botWebhooks?.find(
    (bot: any) => bot.platform === "telegram",
  )
  console.log("🚀 ~ telegramBotData:", telegramBotData)
  const telegramBotUsername = telegramBotData?.usernamePlatform
  const { agentId } = useParams()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [tokenKeyValue, setTokenKeyValue] = useState<string>("")
  const [isBindSuccess, setIsBindSuccess] = useState<boolean>(false)
  const [isBindError, setIsBindError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onChangeInputValue = (value: string) => {
    setTokenKeyValue(value)
  }

  const onBindAgentToTelegramBot = async () => {
    try {
      setLoading(true)
      const agentIdNumber = Number(agentId)
      const payload = {
        token: tokenKeyValue,
        botId: agentIdNumber,
      }
      const res = await telegramMapAgent(payload)
      if (res?.data) {
        setIsBindSuccess(true)
        refetch()
      }
    } catch (error: any) {
      setIsBindError(true)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onRestTokenKey = () => {
    setTokenKeyValue("")
    setIsBindError(false)
  }

  return (
    <>
      {telegramBotUsername ? (
        <div className="flex items-center gap-2">
          <TelegramOnlineIcon />
          <span className="text-base-b">{telegramBotUsername}</span>
          <span
            className="text-base-md cursor-pointer text-brown-10 hover:underline"
            onClick={onOpen}
          >
            Change
          </span>
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center gap-2 hover:underline"
          onClick={onOpen}
        >
          <LinkAccountIcon />
          <span className="text-base-md text-brown-500">Bind your Bot</span>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "bg-mercury-100",
        }}
        size="xl"
      >
        <ModalContent>
          <ModalHeader className="relative px-6">
            <h3 className="flex-1 text-start text-24 font-semibold text-mercury-950">
              Bind your Bot
            </h3>
            <CloseButton
              onClose={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </ModalHeader>
          <ModalBody className="gap-4 px-6 py-4 pb-10">
            <a
              className="ml-2 flex cursor-pointer items-center gap-2 hover:underline"
              href="https://distilled.foundation/developer-resources/how-to-bind-your-twitter-and-telegram-account"
              target="_blank"
            >
              <BookIcon />
              <span className="text-base-md text-brown-500">
                Read the tutorial to bind your autonomous Telegram bot.
              </span>
            </a>

            <div className="flex">
              <div className="w-[50px] py-4">
                <div className="relative h-full">
                  <div className="absolute left-1/2 top-1/2 h-[85%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-mercury-400" />
                  <BadgeStepWrap step="1" />
                  <BadgeStepWrap step="2" stepClassName=" top-[28%]" />
                  <BadgeStepWrap step="3" stepClassName=" top-[85%]" />
                </div>
              </div>
              <div className="w-full">
                <StepWrap
                  label="Create your Bot on Telegram"
                  desc="Skip if already created."
                  icon={
                    <img src={echoAgentBadge} className="h-full" width={60} />
                  }
                />
                <StepWrap
                  label="Bind your Agent with created bot"
                  icon={
                    <img src={telebotToAgent} className="h-full" width={150} />
                  }
                  stepClassName="my-4"
                >
                  <Input
                    placeholder="Enter your bot token key"
                    classNames={{
                      inputWrapper: twMerge(
                        "!bg-white rounded-2 mt-4 !border !border-mercury-400 px-2",
                        isBindError && "!border-[#FF3B30]",
                      ),
                      innerWrapper: "!bg-white rounded-full",
                      input: "text-16 !text-mercury-950 caret-[#363636]",
                    }}
                    size="lg"
                    value={tokenKeyValue}
                    onChange={(e) => onChangeInputValue(e.target.value)}
                    endContent={
                      <>
                        {isBindSuccess ? (
                          <CircleCheckFilled />
                        ) : isBindError || tokenKeyValue ? (
                          <div
                            onClick={onRestTokenKey}
                            className="cursor-pointer"
                          >
                            <XboxXFilled
                              color={tokenKeyValue ? "#545454" : undefined}
                            />
                          </div>
                        ) : (
                          <div />
                        )}
                      </>
                    }
                  />
                  <Button
                    className="mt-4 w-full rounded-full bg-mercury-950"
                    size="lg"
                    onPress={onBindAgentToTelegramBot}
                    isDisabled={!tokenKeyValue || isBindSuccess}
                    isLoading={loading}
                  >
                    {isBindSuccess && <CheckFilledIcon />}
                    <span className="text-18 text-mercury-30">
                      {isBindSuccess ? "Bot Bound Successfully" : "Bind"}
                    </span>
                  </Button>
                </StepWrap>
                <StepWrap
                  label="Add your Bot (Agent) to a group"
                  desc="Skip if already added to a group."
                  icon={
                    <img src={agentToTelebot} className="h-full" width={150} />
                  }
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

interface BadgeStepWrapProps {
  step: string
  stepClassName?: string
}

export const BadgeStepWrap = ({ step, stepClassName }: BadgeStepWrapProps) => {
  return (
    <div
      className={twMerge(
        "absolute left-1/2 top-0 -translate-x-1/2",
        stepClassName,
      )}
    >
      <div className="flex h-10 w-6 items-center justify-center rounded-full bg-mercury-950">
        <span className="text-base-b text-white">{step}</span>
      </div>
    </div>
  )
}

interface StepWrapProps {
  label: string | React.ReactNode
  desc?: string | React.ReactNode
  stepClassName?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  onClick?: any
}

export const StepWrap = ({
  label,
  desc,
  stepClassName,
  children,
  icon,
  onClick,
}: StepWrapProps) => {
  return (
    <div
      className={twMerge(
        "rounded-[22px] border-[1px] border-mercury-100 bg-mercury-70 p-4",
        stepClassName,
      )}
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <span className="text-18 font-semibold text-mercury-950">
            {label}
          </span>
          <span className="text-14 text-mercury-800">{desc}</span>
        </div>
        {icon}
      </div>
      {children}
    </div>
  )
}

export default BinYourBot
