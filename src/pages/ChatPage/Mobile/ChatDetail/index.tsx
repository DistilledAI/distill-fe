import ReCaptchaWraper from "@components/ReCaptchaWraper"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import ChatMessages from "@pages/ChatPage/ChatBox/ChatMessages"
import PrivateAgentChatContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/PrivateAgentChatContent"
import { useQuery } from "@tanstack/react-query"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import { QueryDataKeys } from "types/queryDataKeys"
import ChatDetailHeader from "./Header"
import useGetChatId from "../../hooks/useGetChatId"

const ChatDetail = () => {
  const reCaptchaRef = useRef<any>()
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const { isLogin } = useAuthState()
  const groupId = chatId || privateChatId
  const { mutation } = useSubmitChat({
    groupId: groupId,
    callbackDone: SpeechRecognition.stopListening,
  })
  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })

  const isEnableTextInput = isLogin && (privateChatId || chatId)

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  return (
    <>
      <StyleSpacingProvider>
        <div className="h-[100dvh] pt-[60px]">
          <ChatDetailHeader />
          <div className="h-[calc(100dvh-130px)]">
            {privateChatId ? (
              <PrivateAgentChatContent hasInputChat={false} />
            ) : (
              <ChatMessages />
            )}
          </div>
          <div className="fixed bottom-0 left-0 z-[11] w-full bg-mercury-30 px-3 py-2">
            <ChatInput
              onSubmit={onChatSubmit}
              isDisabledInput={isChatting || !isEnableTextInput}
            />
          </div>
        </div>
      </StyleSpacingProvider>
      <ReCaptchaWraper reCaptchaRef={reCaptchaRef} />
    </>
  )
}

export default ChatDetail
