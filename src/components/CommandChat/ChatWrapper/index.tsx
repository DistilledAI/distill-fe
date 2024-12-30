import CommandChatInput from "./CommandChatInput"
import CommandChatAction from "../Actions"
import { useCommandActionChat } from "../Providers/CommandActionProvider"

const ChatWrapper = () => {
  const { currentAction } = useCommandActionChat()

  return (
    <div className="min-h-9">
      {currentAction ? <CommandChatAction /> : <CommandChatInput />}
    </div>
  )
}

export default ChatWrapper
