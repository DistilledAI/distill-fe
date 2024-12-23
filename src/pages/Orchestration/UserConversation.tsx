import ChatWindow from "@components/ChatWindow"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import MessageLive from "@pages/ChatBoxLive/MessageLive"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { useRef } from "react"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"

const UserConversation = () => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
    groupId,
  } = useFetchMessages()

  const reCaptchaRef = useRef<any>()
  const { isLogin } = useAuthState()
  const isEnableTextInput = isLogin && groupId
  const { mutation } = useSubmitChat({
    callbackDone: () => {
      SpeechRecognition.stopListening()
      // resetReply()
    },
    groupId: groupId,
    // reply: replyId
    //   ? {
    //       messageId: replyId,
    //       message: replyTxt,
    //       username: replyUsername || "",
    //     }
    //   : undefined,
    // isClan,
  })

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  const renderMessage = (index: number, message: IMessageBox) => {
    return (
      <div
        className={twMerge(
          "p-3 pl-7",
          index === 0 && "pt-4",
          index === messages.length - 1 && "pb-8",
        )}
      >
        <MessageLive
          key={index}
          message={message}
          // onReply={() => onReply(message)}
          groupId={groupId}
        />
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <ChatWindow
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={groupId}
        isChatActions={false}
        msgBoxClassName="p-0"
        className={twMerge("md:max-h-[calc(100%-60px)]")}
        // scrollBottomClassName="md:!bottom-10 h-40"
      />
      <ChatInput
        onSubmit={onChatSubmit}
        isPending={mutation.isPending}
        isDisabledInput={!isEnableTextInput}
        // replyUsername={replyUsername}
        // hasFocus={hasFocus}
        // setHasFocus={setHasFocus}
        // resetRely={resetReply}
        wrapperClassName={twMerge("md:bottom-0 inset-x-1")}
      />
    </div>
  )
}

export default UserConversation
