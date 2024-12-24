import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  Mention,
  MentionProps,
  MentionsInput,
  MentionsInputProps,
} from "react-mentions"
import { useLocation, useParams } from "react-router-dom"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import { BOT_STATUS } from "../ChatMessages/ChatActions/DelegatePrivateAgent"
import VoiceChat from "./Voice"
import CloudImages from "./CloudImages"
import { ArrowUpFilledIcon } from "@components/Icons/Arrow"

const MentionsInputAny =
  MentionsInput as React.ComponentType<MentionsInputProps>
const MentionAny = Mention as React.ComponentType<MentionProps>

interface ChatInputProps {
  isDisabledInput: boolean
  onSubmit: (value: string) => void
  wrapperClassName?: string
  isDarkTheme?: boolean
  replyUsername?: string
  resetRely?: () => void
  hasFocus?: boolean
  setHasFocus?: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatInput = ({
  isDisabledInput,
  onSubmit,
  wrapperClassName,
  isDarkTheme,
  replyUsername,
  hasFocus,
  setHasFocus,
  resetRely,
}: ChatInputProps) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const [isFocus, setIsFocus] = useState(false)
  const [message, setMessage] = useState("")
  const { pathname } = useLocation()
  const { isMobile } = useWindowSize()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const heightBoxRef = useRef(0)
  const { setSpacing, spacing } = useStyleSpacing()
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const inputRef = useRef<any>(null)
  const queryClient = useQueryClient()
  const groupId = chatId || privateChatId

  const { data: isChatting } = useQuery({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })
  const { data: botInfo } = useQuery<any>({
    queryKey: [QueryDataKeys.DELEGATE_PRIVATE_AGENT, groupId],
    enabled: !!groupId,
  })

  const isBotEnabled = botInfo?.status === BOT_STATUS.ENABLE

  useEffect(() => {
    if (replyUsername) {
      setMessage(replyUsername)
    }
  }, [replyUsername])

  useEffect(() => {
    if (!isMobile) {
      inputRef.current.focus()
    }
  }, [pathname, isMobile, isChatting])

  useEffect(() => {
    if (!isMobile && hasFocus) {
      inputRef.current.focus()
      if (setHasFocus) setHasFocus(false)
    }
  }, [hasFocus])

  const handleSubmit = async () => {
    if (!message) return
    setMessage("")
    queryClient.setQueryData([QueryDataKeys.IS_CHATTING, groupId], () =>
      botInfo?.myBot && pathname !== PATH_NAMES.PRIVATE_AGENT
        ? isBotEnabled
        : true,
    )

    await onSubmit(message)
  }

  const handleKeyDown = (e: any) => {
    const isSubmit = e.key === "Enter" && !e.shiftKey
    if (isSubmit) {
      e.preventDefault()
      //handle vi key double submit
      if (!isSubmitting) {
        setIsSubmitting(true)
        handleSubmit()

        setTimeout(() => {
          setIsSubmitting(false)
          setMessage("")
          SpeechRecognition.stopListening()
        }, 1)
      }
    }
  }

  useLayoutEffect(() => {
    if (groupId) {
      setSpacing(0)
      setMessage("")
    }
  }, [groupId])

  useEffect(() => {
    const height = boxRef.current?.clientHeight
    if (height) heightBoxRef.current = height
  }, [])

  const handleCheckHeight = () => {
    const height = boxRef.current?.clientHeight
    if (!height) return
    setSpacing(
      height === heightBoxRef.current ? 0 : height - heightBoxRef.current,
    )
  }

  const handleOnChange = (e: any) => {
    const value = e.target.value
    if (replyUsername && !value.includes(replyUsername)) {
      setMessage(value.replace(replyUsername.trim(), ""))
      if (resetRely) resetRely()
    } else setMessage(value)
  }

  return (
    <div
      ref={boxRef}
      className={twMerge(
        "absolute bottom-4 z-[11] flex max-w-[768px] items-center gap-3 rounded-[35px] border-1 bg-mercury-200 p-2 py-1 transition-all duration-300 ease-linear max-md:static max-md:gap-2 max-md:pl-3 md:bottom-8 md:min-h-[60px] md:p-3 md:py-[7.89px]",
        isFocus ? "border-mercury-300" : "border-mercury-200",
        spacing && "items-end",
        isDarkTheme && "bg-mercury-950",
        wrapperClassName,
      )}
    >
      <button
        type="button"
        disabled
        className={twMerge(
          "h-9 w-[52px] min-w-[52px] rounded-full border border-white bg-mercury-30 px-4 py-2",
          isDarkTheme && "bg-mercury-30",
          //disabled
          "border-transparent disabled:bg-mercury-30/50 max-md:hidden",
        )}
      >
        <PaperClipFilledIcon
          color={isDarkTheme ? "rgba(84, 84, 84, 1)" : "#545454"}
        />
      </button>
      <CloudImages />
      <MentionsInputAny
        inputRef={inputRef}
        value={message}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleCheckHeight}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          fontFamily: "Barlow",
          maxHeight: isMobile ? "40px" : "200px",
          color: isDarkTheme ? "#FAFAFA" : "#11181c",
          control: {
            maxHeight: isMobile ? "40px" : "200px",
          },
          highlighter: {
            maxHeight: isMobile ? "40px" : "200px",
            border: "0px",
          },
          input: {
            overflowY: "auto",
            maxHeight: isMobile ? "40px" : "200px",
            border: "none",
            outline: "none",
          },
        }}
        className={twMerge(
          "text-[14px] md:text-[18px]",
          isDarkTheme && "text-mercury-30",
        )}
        placeholder="Enter chat.."
        rows={4}
        disabled={isDisabledInput}
      >
        <MentionAny
          trigger="@"
          markup="@[__display__]"
          displayTransform={(username: string) => `@${username}`}
          data={null}
          appendSpaceOnAdd={true}
          style={{
            color: "#A2845E",
            position: "relative",
            zIndex: "1",
            left: "0px",
            top: "0px",
          }}
        />
      </MentionsInputAny>
      <VoiceChat
        resetTranscript={resetTranscript}
        isListening={listening}
        SpeechRecognition={SpeechRecognition}
        transcript={transcript}
        setMessages={setMessage}
        isDisabled={isDisabledInput}
        isDarkTheme={isDarkTheme}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isDisabledInput || !message}
        className={twMerge(
          "h-9 w-[52px] min-w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2 disabled:border-transparent disabled:bg-mercury-950/60",
          isDarkTheme && "bg-white disabled:bg-white/60",
        )}
      >
        <ArrowUpFilledIcon bgColor={isDarkTheme ? "#363636" : "#FAFAFA"} />
      </button>
    </div>
  )
}

export default ChatInput
