import React from "react"
import { useCommandActionChat } from "@pages/MyPrivateRoom/CommandActionProvider"
import { CloseIconCircle } from "@components/Icons"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"

const ButtonCommand: React.FC<{
  title: string
}> = ({ title }) => {
  const { setCurrentAction } = useCommandActionChat()
  const { setMessage } = useCommandMsgChat()

  return (
    <div
      className="inline-flex h-9 items-center gap-1 rounded-full border-2 border-[#A2845E] bg-brown-100 px-2"
      onClick={() => {
        setCurrentAction(null)
        setMessage("")
      }}
    >
      <span className="font-semibold text-[#83664B]">{title}</span>
      <div className="cursor-pointer hover:opacity-90">
        <CloseIconCircle color="#83664B" />
      </div>
    </div>
  )
}

export default ButtonCommand
