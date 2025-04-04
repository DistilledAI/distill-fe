import ContextCleared from "@components/ContextCleared"
import ReCaptchaWraper from "@components/ReCaptchaWraper"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import {
  CLEAR_CACHED_MESSAGE,
  PATH_NAMES,
  STATUS_AGENT,
} from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useSubmitChat from "@hooks/useSubmitChat"
// import useFetchMyData from "@pages/MyData/useFetch"
import { distilledAiPlaceholder } from "@assets/images"
import AlertBox from "@components/AlertBox"
import ChatWindowV2 from "@components/ChatWindowV2"
import DynamicTitleMeta from "@components/DynamicTitleMeta"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { useQuery } from "@tanstack/react-query"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import ChatInput from "../../ChatPageOld/ChatContainer/ChatInput"
import ChatActions from "../../ChatPageOld/ChatContainer/ChatMessages/ChatActions"
import {
  IMessageBox,
  RoleChat,
} from "../../ChatPageOld/ChatContainer/ChatMessages/helpers"
import useFetchMessages from "../../ChatPageOld/ChatContainer/ChatMessages/useFetchMessages"

const ChatMyAgentBox: React.FC<{
  hasInputChat?: boolean
}> = ({ hasInputChat = true }) => {
  const reCaptchaRef = useRef<any>()
  const { spacing } = useStyleSpacing()
  const { privateChatId: groupId = "" } = useParams()
  const {
    isLoading,
    onLoadPrevMessages,
    messages,
    isFetched,
    isFetchingPreviousPage,
    hasPreviousMore,
  } = useFetchMessages(groupId)

  const { mutation } = useSubmitChat({
    groupId,
    callbackDone: SpeechRecognition.stopListening,
  })
  // const { list: listMyData, isFetched: isFetchedMyData } = useFetchMyData()
  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })
  const agent = useAppSelector((state) => state.agents.myAgent)
  const isBotActive = !!agent && agent?.status === STATUS_AGENT.ACTIVE
  // const isShowAddData =
  //   listMyData.length === 0 && isFetchedMyData && isBotActive

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
              src: message.avatar || distilledAiPlaceholder,
              className: "bg-white",
              badgeIcon: <FilledBrainAIIcon size={14} />,
              badgeClassName: "bg-[#FFCC00]",
            }}
            content={message.content}
            isTyping={message.isTyping}
            isPrivateChat
          />
        ) : null}
        {message.role === RoleChat.OWNER ? (
          <SenderMessage
            content={message.content}
            baseClassName="bg-lgd-code-agent-3  text-white"
          />
        ) : null}
      </div>
    )
  }

  const isChatActions = isBotActive

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  const pageTitleMeta = agent?.username
    ? `Agent ${agent?.username} - Private Chat`
    : ""

  return (
    <>
      <DynamicTitleMeta title={pageTitleMeta} />
      <ChatWindowV2
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={groupId}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        style={{
          paddingBottom: `${spacing}px`,
        }}
        className={twMerge(
          "h-[calc(100dvh-146px)] max-h-full md:max-h-[calc(100%-136px)]",
          !isBotActive && "h-[calc(100dvh-238px)] md:max-h-[calc(100%-204px)]",
        )}
        isChatActions={isChatActions}
      />
      <div className="absolute bottom-[100px] left-1/2 w-[calc(100%-24px)] -translate-x-1/2 space-y-2 bg-white pb-0 md:bottom-[132px] md:pb-2">
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
        {/* {isShowAddData ? (
          <AlertBox
            className="mx-auto max-w-[768px]"
            isVisible={true}
            messages={[
              "Since no data has been added, your agent lacks personalized intelligence.",
              "Please add your data to help your agent learn more about you.",
            ]}
            links={[{ to: PATH_NAMES.ADD_MY_DATA, label: "Add Data" }]}
          />
        ) : null} */}
      </div>
      {hasInputChat && (
        <>
          <ChatInput
            onSubmit={onChatSubmit}
            isDisabledInput={isChatting}
            wrapperClassName="bottom-8 md:bottom-12 flex-col items-end md:py-3 md:rounded-3xl justify-end md:w-[calc(100%-32px)] left-1/2 -translate-x-1/2 max-md:fixed w-[calc(100%-16px)] rounded-2xl"
          />
          <ReCaptchaWraper reCaptchaRef={reCaptchaRef} />
        </>
      )}
      <ChatActions
        isClearContextBtn
        isDelegateBtn={false}
        className="fixed bottom-0 justify-end md:absolute md:bottom-3"
      />
    </>
  )
}
export default ChatMyAgentBox
