import { distilledAiPlaceholder } from "@assets/images"
import ChatWindowV2 from "@components/ChatWindowV2"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import useAuthState from "@hooks/useAuthState"
import ChatInput from "@pages/ChatPage/ChatContainer/ChatInput"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useCallback, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { postChatToPreviewAgent } from "services/chat"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

export enum PreviewRoleChat {
  USER = "user",
  ASSITANT = "assistant",
}
const TestAgent: React.FC<{ agentData: any; agentConfigs: any }> = () => {
  const { watch } = useFormContext()
  const userNameData = watch("username")
  const avatarData = watch("avatar") || distilledAiPlaceholder
  const descriptionData = watch("description")
  const personalityTraits = watch("personality_traits")
  const communicationStyle = watch("communication_style")
  const [messages, setMessages] = useState<any[]>([])
  console.log("🚀 ~ messages:", messages)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isLogin } = useAuthState()
  const { spacing } = useStyleSpacing()

  useEffect(() => {
    setMessages((prevMessages) => {
      const updatedMessage = {
        ...prevMessages[0],
        role: PreviewRoleChat.ASSITANT,
        content: `Hello, I'm ${userNameData}. How can I help you?`,
      }

      return [updatedMessage, ...prevMessages.slice(1)]
    })
  }, [userNameData])

  const onChatSubmit = async (message: string) => {
    setIsLoading(true)
    try {
      const uid = uuidv4()
      const newSenderMessages = [
        {
          role: PreviewRoleChat.USER,
          content: message,
          isTyping: false,
        },
        {
          role: PreviewRoleChat.ASSITANT,
          isTyping: true,
          id: uid,
        },
      ]

      const chatHistoryRecordDefault = {
        role: PreviewRoleChat.USER,
        content: `You are ${userNameData}. You are ${descriptionData}, ${personalityTraits} personality traits and ${communicationStyle} communication style.`,
      }
      const chatHistory =
        messages.length > 1
          ? [chatHistoryRecordDefault, ...messages]
          : [chatHistoryRecordDefault]

      setMessages([...messages, ...newSenderMessages])

      const res = await postChatToPreviewAgent({
        messages: message,
        chatHistory,
      })

      if (res) {
        setMessages((prevState) => {
          const newReceiverMessages = prevState.map((message: any, index) => {
            if (index === prevState.length - 1) {
              return {
                role: PreviewRoleChat.ASSITANT,
                content: res?.data?.data,
                isTyping: false,
              }
            }

            return message
          })

          return newReceiverMessages
        })
        setIsLoading(false)
      }
    } catch (error) {
      console.log("error:", error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const renderMessage = useCallback(
    (index: number, message: any) => {
      const paddingBottomStyle = ""

      const isUser = message.role === PreviewRoleChat.USER
      const isAssistant = message.role === PreviewRoleChat.ASSITANT

      return (
        <div
          className={twMerge(
            "relative mx-auto w-full max-w-full rounded-[22px]",
            isUser && `${paddingBottomStyle} relative`,
            isAssistant && "group/item",
            index === messages.length - 1 && "pb-24",
          )}
        >
          {isAssistant && (
            <>
              <ReceiverMessage
                avatar={{
                  src: avatarData,
                }}
                content={message.content}
                isTyping={message.isTyping}
                baseClassName="relative"
              />
            </>
          )}
          {isUser && (
            <SenderMessage
              content={message.content}
              // baseClassName={twMerge(bgColor, borderRadiusStyle)}
            />
          )}
        </div>
      )
    },
    [messages],
  )

  return (
    <div className="top-[95px] mt-2 w-[330px] rounded-[22px] border-1 border-mercury-100 py-4">
      <div className="flex items-center justify-between border-b-1 px-4 pb-4">
        <span className="text-[22px] font-bold text-mercury-950">
          Character Preview
        </span>
        <div className="flex items-center gap-4">
          <RefreshIcon color="#545454" />
        </div>
      </div>

      <div className="relative h-[600px] flex-1 pt-1">
        <ChatWindowV2
          messages={messages}
          itemContent={renderMessage}
          isLoading={false}
          isFetched={true}
          style={{
            paddingBottom: `${spacing}px`,
          }}
          className="md:max-h-[calc(100%)]"
          scrollBottomClassName="absolute !bottom-[20%] h-4"
        />

        <>
          <ChatInput
            onSubmit={onChatSubmit}
            isDisabledInput={!isLogin || !!isLoading}
            wrapperClassName="max-md:fixed bottom-8 md:bottom-0 flex-col items-end md:py-3 rounded-2xl md:rounded-3xl justify-end left-1/2 -translate-x-1/2 w-[calc(100%-16px)] md:w-[calc(100%-32px)]"
          />
        </>
      </div>
    </div>
  )
}

export default TestAgent
