import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"
import MyAgentClanEmpty from "./MyAgentClanEmpty"
import ChatBoxLive from "@pages/ChatBoxLive"

const ChatClanBox = () => {
  const { pathname } = useLocation()
  const isClanEmpty = pathname === PATH_NAMES.CLAN

  return isClanEmpty ? <MyAgentClanEmpty /> : <ChatBoxLive />
}

export default ChatClanBox
