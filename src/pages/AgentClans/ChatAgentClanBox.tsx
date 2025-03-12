import { useLocation } from "react-router-dom"
import MyChatAgentClan from "./MyAgentClan/MyChatAgentClan"
import ChatBoxLive from "@pages/AgentClans/ChatBoxLive"
import { PATH_NAMES } from "@constants/index"

const ChatAgentClanBox = () => {
  const { pathname } = useLocation()

  return pathname.startsWith(PATH_NAMES.MY_AGENT_CLAN) ? (
    <MyChatAgentClan />
  ) : (
    <ChatBoxLive />
  )
}

export default ChatAgentClanBox
