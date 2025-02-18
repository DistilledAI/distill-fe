import { useParams } from "react-router-dom"
import ChatMessages from "../../ChatPage/ChatContainer/ChatMessages"
import SendMessage from "../../ChatPage/ChatContainer/SendMessage"

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
