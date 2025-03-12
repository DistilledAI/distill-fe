import { useParams } from "react-router-dom"
import ChatMessages from "../../ChatPageOld/ChatContainer/ChatMessages"
import SendMessage from "../../ChatPageOld/ChatContainer/SendMessage"

const ChatAgentOthersBox = () => {
  const { chatId } = useParams()

  return (
    <>
      <ChatMessages />
      <SendMessage groupId={chatId} />
    </>
  )
}

export default ChatAgentOthersBox
