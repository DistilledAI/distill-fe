import React from "react"
import SwapToken from "./SwapToken"
import SendToken from "./SendToken"
import LockToken from "./LockToken"
import { ICmdMessage } from "@pages/MyPrivateRoom/CmdMessageProvider"

export enum CmdActionKey {
  swap = "swap",
  send = "send",
  lock = "lock",
}

const CmdActionMessage: React.FC<{
  actionKey: CmdActionKey
  data: ICmdMessage
}> = ({ actionKey, data }) => {
  const COMMAND_ACTION_RENDER = {
    [CmdActionKey.swap]: <SwapToken />,
    [CmdActionKey.send]: <SendToken />,
    [CmdActionKey.lock]: <LockToken data={data} />,
  }

  if (!actionKey) return null

  return COMMAND_ACTION_RENDER[actionKey]
}

export default CmdActionMessage
