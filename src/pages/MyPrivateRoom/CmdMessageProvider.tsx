import React, { createContext, useContext, useState } from "react"

export interface ICmdLock {
  tokenAddress: string
  amount: string
  duration: number
}
export interface ICmdSwap {
  fromToken: string
  amount: string
  toToken: string
}
export interface ICmdSend {
  tokenAddress: string
  amount: string
  toAccountAddress: string
}
export interface ICmdMessage {
  id: string
  lock: ICmdLock | null
  swap: ICmdSwap | null
  send: ICmdSend | null
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
