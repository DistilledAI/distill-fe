import ReCaptchaWraper from "@components/ReCaptchaWraper"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import ChatInput from "@pages/ChatPageOld/ChatContainer/ChatInput"
import React, { useRef } from "react"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import TradeTokenButton from "../TradeTokenButton"

const SendMessage: React.FC<{
  sidebarCollapsed: boolean
  tradeLink: string
  resetReply: () => void
  chatId: string
  replyId: number
  replyTxt: string
  replyUsername: string
  isClan: boolean
  hasFocus: boolean
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  sidebarCollapsed,
  tradeLink,
  resetReply,
  chatId,
  replyId,
  replyTxt,
  replyUsername,
  isClan,
  hasFocus,
  setHasFocus,
}) => {
  const reCaptchaRef = useRef<any>()
  const { isLogin } = useAuthState()
  const isEnableTextInput = isLogin && chatId
  const { mutation } = useSubmitChat({
    callbackDone: () => {
      SpeechRecognition.stopListening()
      resetReply()
    },
    groupId: chatId,
    reply: replyId
      ? {
          messageId: replyId,
          message: replyTxt,
          username: replyUsername || "",
        }
      : undefined,
    isClan,
  })

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  return (
    <>
      <div
        className={twMerge(
          "fixed pt-3 duration-300 md:relative",
          "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-fading-white max-md:px-3 md:bg-white",
          "max-lg:fixed max-lg:bottom-0 max-lg:left-[344px] max-lg:right-4 max-lg:pb-3",
          sidebarCollapsed && "max-lg:left-[121px]",
        )}
      >
        <div className="absolute inset-x-0 bottom-[calc(100%-5px)] hidden h-6 w-full bg-fading-white md:block" />
        <div className={twMerge("flex items-center", !!tradeLink && "gap-1")}>
          <div className="md:hidden">
            <TradeTokenButton tradeLink={tradeLink} />
          </div>
          <ChatInput
            onSubmit={onChatSubmit}
            isDisabledInput={!isEnableTextInput}
            replyUsername={replyUsername}
            hasFocus={hasFocus}
            setHasFocus={setHasFocus}
            resetRely={resetReply}
            wrapperClassName={twMerge(
              "w-full max-w-full max-md:pl-3 md:bottom-[calc(100%-72px)] max-md:max-w-[calc(100%-77px)]",
              !tradeLink && "max-md:max-w-full",
            )}
          />
        </div>
      </div>
      <ReCaptchaWraper reCaptchaRef={reCaptchaRef} />
    </>
  )
}

export default SendMessage
