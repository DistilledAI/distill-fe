import { PATH_NAMES } from "@constants/index"
import { useNavigate } from "react-router-dom"
import MyAgentClanEmpty from "./MyAgentClanEmpty"
import ChatBoxLive from "@pages/ChatBoxLive"
import useWindowSize from "@hooks/useWindowSize"
import useAgentClanData from "./useAgentClanData"
import { useEffect } from "react"

const ChatClanBox = () => {
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
  const { nameAgentClan, isLoading, imageUrl, group } = useAgentClanData()

  useEffect(() => {
    if (!isLoading && !nameAgentClan) {
      navigate(isMobile ? PATH_NAMES.CLAN_AGENT_EMPTY : PATH_NAMES.CLAN)
    } else if (!isLoading && nameAgentClan) {
      navigate(`${PATH_NAMES.CLAN}/${nameAgentClan}`)
    }
  }, [nameAgentClan, isMobile, isLoading])

  if (isLoading) {
    return null
  }

  return group?.status === 1 && nameAgentClan ? (
    <ChatBoxLive />
  ) : (
    <MyAgentClanEmpty imageUrl={imageUrl} />
  )
}

export default ChatClanBox
