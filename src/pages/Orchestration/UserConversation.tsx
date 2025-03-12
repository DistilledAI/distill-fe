import ChatWindowV2 from "@components/ChatWindowV2"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import ReCaptchaWraper from "@components/ReCaptchaWraper"
import useAuthState from "@hooks/useAuthState"
import useJoinGroupLive from "@hooks/useJoinGroupLive"
import useSubmitChat from "@hooks/useSubmitChat"
import { useDisclosure } from "@nextui-org/react"
import MessageLive from "@pages/AgentClans/ChatBoxLive/MessageLive"
import ChatInput from "@pages/ChatPageOld/ChatContainer/ChatInput"
import { IMessageBox } from "@pages/ChatPageOld/ChatContainer/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPageOld/ChatContainer/ChatMessages/useFetchMessages"
import { useRef, useState } from "react"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"

const UserConversation = () => {
  useJoinGroupLive()
  const [replyUsername, setReplyUsername] = useState<string>("")
  const [replyId, setReplyId] = useState<number>(NaN)
  const [replyTxt, setReplyTxt] = useState<string>("")
  const [hasFocus, setHasFocus] = useState(false)
  const { isOpen, onOpenChange } = useDisclosure()

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
          index === messages.length - 1 && "pb-20",
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
    <div className="absolute inset-x-0 bottom-0 z-10 h-fit w-full overflow-hidden rounded-[14px] bg-white transition-all duration-300 ease-in-out md:relative md:rounded-[32px] md:border md:border-mercury-100">
      {/* header mobile */}
      <div className="flex items-center justify-between border-b border-b-mercury-100 px-4 py-2 md:hidden">
        <h4 className="text-16 font-bold text-mercury-950">Live Discussion</h4>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className={twMerge(
              "rotate-180 rounded-full p-[5.5px] hover:bg-mercury-30",
              isOpen && "block rotate-0",
            )}
            onClick={onOpenChange}
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>
      <ChatWindowV2
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
        className={twMerge(
          "max-h-full px-3 max-md:hidden md:h-dvh md:max-h-[calc(100dvh-92px)]",
          isOpen && "max-md:block max-md:h-[calc(100dvh-290px)]",
        )}
        scrollBottomClassName="md:bottom-[64px] md:h-14"
      />
      <div
        className={twMerge(
          "p-2 md:absolute md:bottom-0 md:h-16 md:w-full md:bg-white md:p-0",
          isOpen && "pb-[56px]",
        )}
      >
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
