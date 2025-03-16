import ReCaptchaWraper from "@components/ReCaptchaWraper"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import { QueryDataKeys } from "types/queryDataKeys"
import ChatInput from "../ChatInput"

const SendMessage = () => {
  const reCaptchaRef = useRef<any>()
  const { privateChatId, chatId } = useParams()
  const groupId = privateChatId || chatId
  const { isLogin } = useAuthState()
  const { mutation } = useSubmitChat({
    groupId,
    callbackDone: SpeechRecognition.stopListening,
  })

  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })

  const isEnableTextInput = isLogin && (chatId || privateChatId)

  const onChatSubmit = async (value: string) => {
    const captchaRes = await reCaptchaRef.current.execute()
    mutation.mutate({ message: value, captchaValue: captchaRes })
  }

  return (
    <>
      <ChatInput
        onSubmit={onChatSubmit}
        isDisabledInput={isChatting || !isEnableTextInput}
        wrapperClassName="max-md:fixed bottom-8 md:bottom-12 flex-col items-end md:py-3 rounded-2xl md:rounded-3xl justify-end left-1/2 -translate-x-1/2 w-[calc(100%-16px)] md:w-[calc(100%-32px)]"
      />
      <ReCaptchaWraper reCaptchaRef={reCaptchaRef} />
    </>
  )
}

export default SendMessage
