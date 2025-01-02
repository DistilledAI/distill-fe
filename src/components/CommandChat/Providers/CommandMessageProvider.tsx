import React, { createContext, useContext, useState } from "react"
import { InfoAction } from "../types"

const CommandMsgContext = createContext<{
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  infoAction: InfoAction
  setInfoAction: React.Dispatch<React.SetStateAction<InfoAction>>
  isOpenTool: boolean
  setIsOpenTool: React.Dispatch<React.SetStateAction<boolean>>
}>({
  message: "",
  setMessage: () => null,
  infoAction: null,
  setInfoAction: () => null,
  isOpenTool: false,
  setIsOpenTool: () => null,
})

export const CommandMsgProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState<string>("")
  const [infoAction, setInfoAction] = useState<InfoAction>(null)
  const [isOpenTool, setIsOpenTool] = useState<boolean>(false)

  return (
    <CommandMsgContext.Provider
      value={{
        setMessage,
        message,
        isOpenTool,
        setIsOpenTool,
        infoAction,
        setInfoAction,
      }}
    >
      {children}
    </CommandMsgContext.Provider>
  )
}

export const useCommandMsgChat = () => useContext(CommandMsgContext)
