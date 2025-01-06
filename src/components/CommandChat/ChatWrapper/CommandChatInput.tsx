import useWindowSize from "@hooks/useWindowSize"
import { useEffect, useRef } from "react"
import {
  Mention,
  MentionProps,
  MentionsInput,
  MentionsInputProps,
} from "react-mentions"
import { twMerge } from "tailwind-merge"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"

const MentionsInputAny =
  MentionsInput as React.ComponentType<MentionsInputProps>
const MentionAny = Mention as React.ComponentType<MentionProps>

const CommandChatInput = () => {
  const inputRef = useRef<any>(null)
  const { message, setIsOpenTool, setMessage } = useCommandMsgChat()
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
      placeholder="Type ‘/’ to use tools"
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
  )
}

export default CommandChatInput
