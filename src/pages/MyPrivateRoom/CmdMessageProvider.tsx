import React, { createContext, useContext, useState } from "react"

export interface ICmdMessage {
  id: string
  lock: {
    tokenAddress: string
    amount: string
    duration: number
  } | null
}

const CmdMessageContext = createContext<{
  messages: ICmdMessage[]
  setMessages: React.Dispatch<React.SetStateAction<ICmdMessage[]>>
}>({
  messages: [],
  setMessages: () => null,
})

export const CmdMessageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [messages, setMessages] = useState<ICmdMessage[]>([])

  return (
    <CmdMessageContext.Provider value={{ setMessages, messages }}>
      {children}
    </CmdMessageContext.Provider>
  )
}

export const useCmdMessageList = () => useContext(CmdMessageContext)
