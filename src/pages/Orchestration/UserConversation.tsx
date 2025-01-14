import ChatWindow from "@components/ChatWindow"
import ReCaptchaWraper from "@components/ReCaptchaWraper"
import useAuthState from "@hooks/useAuthState"
import useJoinGroupLive from "@hooks/useJoinGroupLive"
import useSubmitChat from "@hooks/useSubmitChat"
import MessageLive from "@pages/ChatBoxLive/MessageLive"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { useRef, useState } from "react"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"

const UserConversation = () => {
  useJoinGroupLive()
  const [replyUsername, setReplyUsername] = useState<string>("")
  const [replyId, setReplyId] = useState<number>(NaN)
  const [replyTxt, setReplyTxt] = useState<string>("")
  const [hasFocus, setHasFocus] = useState(false)

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
      resetReply()
    },
    groupId: groupId,
    reply: replyId
      ? {
          messageId: replyId,
          message: replyTxt,
          username: replyUsername || "",
        }
      : undefined,
    isClan: true,
  })

  const resetReply = () => {
    setReplyId(NaN)
    setReplyUsername("")
    setReplyTxt("")
  }

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  const renderMessage = (index: number, message: IMessageBox) => {
    return (
      <div
        className={twMerge(
          "px-0 py-3 pl-4",
          index === 0 && "pt-8",
          index === messages.length - 1 && "pb-8",
        )}
      >
        <MessageLive
          key={index}
          message={message}
          onReply={() => {
            setHasFocus(true)
            setReplyId(message.id as number)
            setReplyTxt(message.content)
            setReplyUsername(
              message.username ? `@[${message.username}] ` : "@[Unnamed] ",
            )
          }}
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
        className={"px-3 md:max-h-[calc(100%-60px)]"}
        // scrollBottomClassName="md:!bottom-10 h-40"
      />
      <div>
        <ChatInput
          onSubmit={onChatSubmit}
          isDisabledInput={!isEnableTextInput}
          replyUsername={replyUsername}
          hasFocus={hasFocus}
          setHasFocus={setHasFocus}
          resetRely={resetReply}
          wrapperClassName={twMerge("md:bottom-1 inset-x-1")}
        />
        <ReCaptchaWraper reCaptchaRef={reCaptchaRef} />
      </div>
    </div>
  )
}

export default UserConversation
