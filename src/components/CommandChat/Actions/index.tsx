import { CommandActionKey } from "../types"
import CmdSwapToken from "./SwapToken"
import CmdSendToken from "./SendToken"
import CmdLockToken from "./LockToken"
import { useCommandActionChat } from "../Providers/CommandActionProvider"

const CommandChatAction = () => {
  const { currentAction } = useCommandActionChat()

  const COMMAND_ACTION_RENDER = {
    [CommandActionKey.swap]: <CmdSwapToken />,
    [CommandActionKey.send]: <CmdSendToken />,
    [CommandActionKey.lock]: <CmdLockToken />,
  }

  if (!currentAction) return <div>HELLO</div>

  return COMMAND_ACTION_RENDER[currentAction]
}

export default CommandChatAction
