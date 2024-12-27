import { useCommandActionChat } from "@pages/MyPrivateRoom/CommandActionProvider"
import CommandChatInput from "./CommnadChatInput"
import CommandChatAction from "../Actions"

const ChatWrapper = () => {
  const { currentAction } = useCommandActionChat()

  return (
    <div className="min-h-9">
      {currentAction ? <CommandChatAction /> : <CommandChatInput />}
    </div>
  )
}

export default ChatWrapper
