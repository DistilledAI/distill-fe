import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import useWindowSize from "@hooks/useWindowSize"
import VoiceChat from "@pages/ChatPage/ChatBox/ChatInput/Voice"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import {
  Mention,
  MentionProps,
  MentionsInput,
  MentionsInputProps,
} from "react-mentions"
import { twMerge } from "tailwind-merge"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import { chatIconDraw, chatIconMagic, chatIconRightArrow } from "@assets/svg"
import { ArrowUpCapLockIcon } from "@components/Icons"
const ChatTools = lazy(() => import("./ChatTools"))

const MentionsInputAny =
  MentionsInput as React.ComponentType<MentionsInputProps>
const MentionAny = Mention as React.ComponentType<MentionProps>

const CommandChat = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const inputRef = useRef<any>(null)
  const [message, setMessage] = useState("")
  const [isOpenTool, setIsOpenTool] = useState(false)
  const { isMobile } = useWindowSize()

  const handleOpenTool = (val: string) => {
    if (val.startsWith("/")) setIsOpenTool(true)
    else setIsOpenTool(false)
  }

  const handleOnChange = (e: any) => {
    const value = e.target.value
    setMessage(value)
    handleOpenTool(value)
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className="relative flex flex-col">
      {isOpenTool && (
        <div
          style={{
            boxShadow:
              "0px 16px 40px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(24, 24, 25, 0.05)",
          }}
          className="absolute bottom-[calc(100%+10px)] left-0 w-full rounded-[22px] border-mercury-100 bg-white p-4"
        >
          <div className="max-h-[300px] w-full overflow-y-auto rounded scrollbar-hide">
            <Suspense>
              <ChatTools />
            </Suspense>
          </div>
        </div>
      )}
      <div className="flex h-[48px] items-center justify-between rounded-t-[22px] bg-mercury-70 px-3">
        <div className="relative flex items-center">
          <div className="flex items-center">
            <img className="-ml-2" src={chatIconRightArrow} />
            <span className="text-15 text-mercury-900">Chat focus</span>
          </div>
          <span className="mx-4 h-[22px] w-[1px] bg-mercury-200"></span>
          <div className="flex items-center gap-1">
            <img src={chatIconDraw} />
            <span className="text-15 text-mercury-900">Add Reference</span>
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex items-center gap-1">
            <img src={chatIconMagic} />
            <span className="text-15 text-mercury-900">Tools</span>
          </div>
          <div
            style={{
              boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.05)",
            }}
            className="flex h-[26px] w-[45px] items-center justify-center gap-1 rounded border-1 border-white bg-mercury-30"
          >
            <ArrowUpCapLockIcon size={16} />
            <span>T</span>
          </div>
        </div>
      </div>
      <div className="rounded-b-[22px] bg-mercury-200 p-3">
        <MentionsInputAny
          inputRef={inputRef}
          value={message}
          onChange={handleOnChange}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            fontFamily: "Barlow",
            maxHeight: isMobile ? "40px" : "100px",
            control: {
              maxHeight: isMobile ? "40px" : "100px",
            },
            highlighter: {
              maxHeight: isMobile ? "40px" : "100px",
              border: "0px",
            },
            input: {
              overflowY: "auto",
              maxHeight: isMobile ? "40px" : "100px",
              border: "none",
              outline: "none",
            },
          }}
          className={twMerge("text-[14px] leading-5 md:text-[16px]")}
          placeholder="Enter chat or type ‘/’ to use tools"
          rows={4}
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
        <div className="mt-1 flex items-center justify-end gap-4">
          <VoiceChat
            resetTranscript={resetTranscript}
            isListening={listening}
            SpeechRecognition={SpeechRecognition}
            transcript={transcript}
            setMessages={setMessage}
            isDisabled={false}
          />
          <button
            type="button"
            disabled={!message}
            className={twMerge(
              "h-9 w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2 disabled:border-transparent disabled:bg-mercury-950/60",
            )}
          >
            <ArrowUpFilledIcon bgColor={"#FAFAFA"} />
          </button>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1">
        <div className="flex cursor-pointer items-center gap-1">
          <div>
            <RefreshIcon size={18} color="#676767" />
          </div>
          <span className="text-13 text-mercury-500 underline">
            Clear Context
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommandChat
