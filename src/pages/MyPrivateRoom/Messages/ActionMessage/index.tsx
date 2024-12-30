import React from "react"
import SwapToken from "./SwapToken"
import SendToken from "./SendToken"
import LockToken from "./LockToken"

export enum CmdActionKey {
  swap = "swap",
  send = "send",
  lock = "lock",
}

const CmdActionMessage: React.FC<{
  actionKey: CmdActionKey
}> = ({ actionKey }) => {
  const COMMAND_ACTION_RENDER = {
    [CmdActionKey.swap]: <SwapToken />,
    [CmdActionKey.send]: <SendToken />,
    [CmdActionKey.lock]: <LockToken />,
  }

  if (!actionKey) return null

  return COMMAND_ACTION_RENDER[actionKey]
}

export default CmdActionMessage
