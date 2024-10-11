import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { RoleUser } from "@constants/index"
import { Button, Textarea } from "@nextui-org/react"
import { makeId } from "@utils/index"
import { useChatMessage } from "providers/MessageProvider"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { postChatToGroup } from "services/chat"
import { twMerge } from "tailwind-merge"
import { RoleChat } from "../ChatMessages/helpers"
import { useStyleBoxChat } from "../StyleProvider"
import VoiceChat from "./Voice"

const ChatInput: React.FC<{ isDisabledInput: boolean }> = ({
  isDisabledInput,
}) => {
  const { setMessages: setMessageContext } = useChatMessage()
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const { chatId, privateChatId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [messages, setMessages] = useState("")
  const boxRef = useRef<HTMLDivElement>(null)
  const heightBoxRef = useRef(0)
  const { setStyle } = useStyleBoxChat()

  const groupId = chatId ?? privateChatId

  const onSubmit = async () => {
    if (!messages) return
    setMessageContext((prev) => [
      ...prev,
      {
        content: messages,
        role: RoleChat.OWNER,
        id: makeId(),
        roleOwner: RoleUser.USER,
        createdAt: new Date().toISOString(),
      },
    ])
    setMessages("")
    SpeechRecognition.stopListening()

    await postChatToGroup({
      groupId: Number(groupId),
      messages,
    })
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isSubmitting) {
        setIsSubmitting(true)
        onSubmit()

        setTimeout(() => {
          setIsSubmitting(false)
          setMessages("")
          SpeechRecognition.stopListening()
        }, 1)
      }
    }
  }

  const handleCheckHeight = () => {
    const height = boxRef.current?.clientHeight
    if (!height) return
    setStyle({
      paddingBottom:
        height === heightBoxRef.current ? 12 : height - heightBoxRef.current,
    })
  }

  useEffect(() => {
    const height = boxRef.current?.clientHeight
    if (height) heightBoxRef.current = height
  }, [])

  return (
    <div
      ref={boxRef}
      className={twMerge(
        "absolute -bottom-[79px] left-0 z-[11] flex w-full items-center gap-4 rounded-[35px] border-1 bg-mercury-200 p-3 py-[7.89px] duration-500",
        isFocus ? "border-mercury-300" : "border-mercury-200",
      )}
    >
      <Button
        isDisabled
        className="h-9 w-[52px] min-w-[52px] rounded-full border border-white bg-mercury-30 px-4 py-2"
      >
        <PaperClipFilledIcon />
      </Button>
      <Textarea
        placeholder="Type your message"
        classNames={{
          inputWrapper:
            "bg-mercury-200 border-none focus-within:!bg-mercury-200 hover:!bg-mercury-200 shadow-none px-0",
          input:
            "text-[18px] text-mercury-900 placeholder:text-mercury-700  font-barlow",
        }}
        onKeyDown={handleKeyDown}
        minRows={1}
        maxRows={4}
        onKeyUp={handleCheckHeight}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onValueChange={setMessages}
        value={messages}
        isDisabled={isDisabledInput}
      />
      <VoiceChat
        resetTranscript={resetTranscript}
        isListening={listening}
        SpeechRecognition={SpeechRecognition}
        transcript={transcript}
        setMessages={setMessages}
        isDisabled={isDisabledInput}
      />
      <Button
        onClick={onSubmit}
        isDisabled={!messages}
        type="submit"
        isIconOnly
        className="h-9 w-[52px] min-w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2"
      >
        <ArrowUpFilledIcon />
      </Button>
    </div>
  )
}

export default ChatInput
