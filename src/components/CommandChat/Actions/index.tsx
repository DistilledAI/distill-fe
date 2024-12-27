import { CommandActionKey } from "../types"
import { useCommandActionChat } from "@pages/MyPrivateRoom/CommandActionProvider"
import CmdSwapToken from "./SwapToken"

const CommandChatAction = () => {
  const { currentAction } = useCommandActionChat()

  const COMMAND_ACTION_RENDER = {
    [CommandActionKey.swap]: <CmdSwapToken />,
    [CommandActionKey.send]: <div>SEND</div>,
    [CommandActionKey.lock]: <div>LOCK</div>,
  }

  if (!currentAction) return <div>HELLO</div>

  return COMMAND_ACTION_RENDER[currentAction]
}

export default CommandChatAction
