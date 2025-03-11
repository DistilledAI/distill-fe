import ChatWindowV2 from "@components/ChatWindowV2"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import { PlayFilledIcon } from "@components/Icons/SocialLinkIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import {
  getConfigAgentValueByKeys,
  LIST_AGENT_CONFIG_KEYS,
} from "@pages/AgentDetail/helpers"
import ChatInput from "@pages/ChatPage/ChatContainer/ChatInput"
import { useQuery } from "@tanstack/react-query"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useCallback, useState } from "react"
import { postChatToPreviewAgent } from "services/chat"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import { v4 as uuidv4 } from "uuid"

export enum PreviewRoleChat {
  USER = "user",
  ASSITANT = "assistant",
}
const TestAgent: React.FC<{ agentData: any; agentConfigs: any }> = ({
  agentData,
  agentConfigs,
}) => {
  const userNameData = agentData?.username
  const descriptionData = agentData?.description
  const agentConfigsData = getConfigAgentValueByKeys(
    agentConfigs,
    LIST_AGENT_CONFIG_KEYS,
  )
  const personalityTraits = agentConfigsData?.personality_traits
  const communicationStyle = agentConfigsData?.communication_style
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, _] = useState<boolean>(false)
  const groupId = "1"
  const { isLogin } = useAuthState()
  const { spacing } = useStyleSpacing()

  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })

  const onChatSubmit = async (message: string) => {
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
      messages.length > 0 ? messages : [chatHistoryRecordDefault]

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
    }

    console.log("res", res)
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
                  src: message.avatar,
                  publicAddress: message.publicAddress,
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

  const onLoadPrevMessages = () => {}

  return (
    <div className="top-[95px] mt-2 w-[330px] rounded-[22px] border-1 border-mercury-100 py-4">
      <div className="flex items-center justify-between border-b-1 px-4 pb-4">
        <span className="text-[22px] font-bold text-mercury-950">
          Test Agent
        </span>
        <div className="flex items-center gap-4">
          <RefreshIcon color="#545454" />
          <Button className="h-[33px] rounded-full border border-mercury-50 bg-brown-50">
            <PlayFilledIcon />
            <span className="text-base-b text-brown-600">Update</span>
          </Button>
        </div>
      </div>

      <div className="relative h-[600px] flex-1 pt-1">
        <ChatWindowV2
          messages={messages}
          itemContent={renderMessage}
          isLoading={isLoading}
          onLoadPrevMessages={onLoadPrevMessages}
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
            isDisabledInput={isChatting || !isLogin}
            wrapperClassName="max-md:fixed bottom-8 md:bottom-0 flex-col items-end md:py-3 rounded-2xl md:rounded-3xl justify-end left-1/2 -translate-x-1/2 w-[calc(100%-16px)] md:w-[calc(100%-32px)]"
          />
        </>
      </div>
    </div>
  )
}

export default TestAgent
