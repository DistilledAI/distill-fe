import React, { createContext, useContext, useState } from "react"

const CommandMsgContext = createContext<{
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  isOpenTool: boolean
  setIsOpenTool: React.Dispatch<React.SetStateAction<boolean>>
}>({
  message: "",
  setMessage: () => null,
  isOpenTool: false,
  setIsOpenTool: () => null,
})

export const CommandMsgProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState<string>("")
  const [isOpenTool, setIsOpenTool] = useState<boolean>(false)

  return (
    <CommandMsgContext.Provider
      value={{ setMessage, message, isOpenTool, setIsOpenTool }}
    >
      {children}
    </CommandMsgContext.Provider>
  )
}

export const useCommandMsgChat = () => useContext(CommandMsgContext)
