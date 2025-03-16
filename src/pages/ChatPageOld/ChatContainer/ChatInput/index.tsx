import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
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
import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import useGroupDetailByLabel from "@pages/ChatPageOld/hooks/useGroupDetailByLabel"
import "./index.css"

const MentionsInputAny =
  MentionsInput as React.ComponentType<MentionsInputProps>
const MentionAny = Mention as React.ComponentType<MentionProps>

interface ChatInputProps {
  isDisabledInput: boolean
  onSubmit: (value: string) => void
  wrapperClassName?: string
  replyUsername?: string
  resetRely?: () => void
  hasFocus?: boolean
  setHasFocus?: React.Dispatch<React.SetStateAction<boolean>>
  actionsWrapperClassName?: string
}

const ChatInput = ({
  isDisabledInput,
  onSubmit,
  wrapperClassName,
  replyUsername,
  hasFocus,
  setHasFocus,
  resetRely,
  actionsWrapperClassName,
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
  const { chatId = "", privateChatId } = useParams()
  const { groupId: groupIdByLabel } = useGroupDetailByLabel(chatId)
  const inputRef = useRef<any>(null)
  const queryClient = useQueryClient()
  const groupId = groupIdByLabel || privateChatId

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
        "absolute bottom-4 z-[11] flex max-w-[768px] items-center gap-1 rounded-[35px] border-1 bg-mercury-200 p-2 py-1 transition-all duration-300 ease-linear max-md:static max-md:pl-3 md:bottom-8 md:min-h-[60px] md:p-3 md:py-[7.89px]",
        isFocus ? "border-mercury-300" : "border-mercury-200",
        spacing && "items-end",
        wrapperClassName,
      )}
    >
      {/* <button
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
      </button> */}
      <MentionsInputAny
        inputRef={inputRef}
        value={message}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleCheckHeight}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={{
          overflowX: "hidden",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          fontFamily: "Barlow",
          maxHeight: isMobile ? "40px" : "200px",
          color: "#11181c",
          control: {
            maxHeight: isMobile ? "40px" : "200px",
          },
          highlighter: {
            maxHeight: isMobile ? "40px" : "200px",
            border: "0px",
            fontSize: isMobile ? "14px" : "18px",
            lineHeight: "normal",
          },
          input: {
            overflowY: "auto",
            maxHeight: isMobile ? "40px" : "200px",
            border: "none",
            outline: "none",
            fontSize: isMobile ? "14px" : "18px",
            lineHeight: "normal",
            color: "#11181c",
          },
        }}
        className="mention-margin"
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
            width: "100%",
          }}
        />
      </MentionsInputAny>
      <div
        className={twMerge("flex items-center gap-2", actionsWrapperClassName)}
      >
        <VoiceChat
          resetTranscript={resetTranscript}
          isListening={listening}
          SpeechRecognition={SpeechRecognition}
          transcript={transcript}
          setMessages={setMessage}
          isDisabled={isDisabledInput}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabledInput || !message}
          className={twMerge(
            "flex h-8 w-12 items-center justify-center rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2 disabled:border-transparent disabled:bg-mercury-950/60 md:h-9 md:w-[52px] md:min-w-[52px]",
          )}
        >
          <div>
            <ArrowUpFilledIcon bgColor={"#FAFAFA"} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default ChatInput
