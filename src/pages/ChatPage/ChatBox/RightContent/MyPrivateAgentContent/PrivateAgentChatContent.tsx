import { brainAIIcon } from "@assets/svg"
import AlertBox from "@components/AlertBox"
import ChatWindow from "@components/ChatWindow"
import ContextCleared from "@components/ContextCleared"
import ReCaptchaWraper from "@components/ReCaptchaWraper"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import {
  CLEAR_CACHED_MESSAGE,
  PATH_NAMES,
  STATUS_AGENT,
} from "@constants/index"
import useSubmitChat from "@hooks/useSubmitChat"
import useFetchMyData from "@pages/MyData/useFetch"
import { useQuery } from "@tanstack/react-query"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import ChatInput from "../../ChatInput"
import ChatActions from "../../ChatMessages/ChatActions"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchMessages from "../../ChatMessages/useFetchMessages"
import { useAppSelector } from "@hooks/useAppRedux"

const PrivateAgentChatContent: React.FC<{
  hasInputChat?: boolean
}> = ({ hasInputChat = true }) => {
  const {
    isLoading,
    onLoadPrevMessages,
    messages,
    isFetched,
    isFetchingPreviousPage,
    hasPreviousMore,
  } = useFetchMessages()
  const reCaptchaRef = useRef<any>()
  const { spacing } = useStyleSpacing()
  const { privateChatId } = useParams()
  const groupId = privateChatId
  const { mutation } = useSubmitChat({
    groupId,
    callbackDone: SpeechRecognition.stopListening,
  })
  const { list: listMyData, isFetched: isFetchedMyData } = useFetchMyData()
  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })
  const agent = useAppSelector((state) => state.agents.myAgent)
  const isBotActive = !!agent && agent?.status === STATUS_AGENT.ACTIVE
  const isShowAddData =
    listMyData.length === 0 && isFetchedMyData && isBotActive

  const renderMessage = (index: number, message: IMessageBox) => {
    if (message.content === CLEAR_CACHED_MESSAGE) {
      return (
        <ContextCleared
          wrapperClassName={twMerge(
            "max-w-[768px] mx-auto pb-4 px-3 md:px-0",
            messages.length - 1 === index && "pb-10",
          )}
        />
      )
    }

    return (
      <div className="mx-auto w-full max-w-[768px] px-3 pb-4 max-md:px-4">
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{
              src: brainAIIcon,
              className: "bg-white p-1",
            }}
            content={message.content}
            isTyping={message.isTyping}
          />
        ) : null}
        {message.role === RoleChat.OWNER ? (
          <SenderMessage
            content={message.content}
            baseClassName="bg-lgd-code-agent-1 bg-mercury-950 text-white"
          />
        ) : null}
      </div>
    )
  }

  const isChatActions = isBotActive && !isShowAddData

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  return (
    <>
      <ChatWindow
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={privateChatId}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        style={{
          paddingBottom: `${spacing}px`,
        }}
        className={
          !isBotActive && !isChatActions
            ? "max-h-[calc(100%-120px)] md:max-h-[calc(100%-190px)]"
            : ""
        }
        isChatActions={isChatActions}
      />
      {isChatActions ? (
        <ChatActions isClearContextBtn isDelegateBtn={false} />
      ) : null}
      <div
        className={twMerge(
          "absolute bottom-[70px] left-1/2 w-[calc(100%-32px)] -translate-x-1/2 bg-white pb-0 md:bottom-[95px] md:pb-2",
          isChatActions && "bottom-[124px] md:bottom-[140px]",
        )}
      >
        {!isBotActive ? (
          <AlertBox
            className="mx-auto max-w-[768px]"
            isVisible={true}
            messages={[
              "While your private agent is being created, you’ll be chatting with a default agent that doesn’t have your personalized intelligence.",
            ]}
            links={[
              { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
            ]}
          />
        ) : null}
        {isShowAddData ? (
          <AlertBox
            className="mx-auto max-w-[768px]"
            isVisible={true}
            messages={[
              "Since no data has been added, your agent lacks personalized intelligence.",
              "Please add your data to help your agent learn more about you.",
            ]}
            links={[{ to: PATH_NAMES.ADD_MY_DATA, label: "Add Data" }]}
          />
        ) : null}
      </div>
      {hasInputChat && (
        <>
          <ChatInput
            onSubmit={onChatSubmit}
            isDisabledInput={isChatting}
            wrapperClassName="left-1/2 -translate-x-1/2 w-[calc(100%-32px)]"
            isDarkTheme
          />
          <ReCaptchaWraper reCaptchaRef={reCaptchaRef} />
        </>
      )}
    </>
  )
}
export default PrivateAgentChatContent
