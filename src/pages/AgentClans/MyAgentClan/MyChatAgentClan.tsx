import { PATH_NAMES } from "@constants/index"
import { useNavigate } from "react-router-dom"
import MyAgentClanEmpty from "./MyAgentClanEmpty"
import ChatBoxLive from "@pages/AgentClans/ChatBoxLive"
import useWindowSize from "@hooks/useWindowSize"
import useAgentClanData from "./useAgentClanData"
import { useEffect } from "react"

const MyChatAgentClan = () => {
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
  const { nameAgentClan, isLoading, imageUrl, group } = useAgentClanData()

  useEffect(() => {
    if (!isLoading && !nameAgentClan) {
      navigate(
        isMobile
          ? `${PATH_NAMES.MY_AGENT_CLAN}/empty`
          : PATH_NAMES.MY_AGENT_CLAN,
      )
    } else if (!isLoading && nameAgentClan) {
      navigate(`${PATH_NAMES.MY_AGENT_CLAN}/${nameAgentClan}`)
    }
  }, [nameAgentClan, isMobile, isLoading])

  if (isLoading) {
    return null
  }

  const renderContent = () => {
    return group?.status === 1 && nameAgentClan ? (
      <ChatBoxLive />
    ) : (
      <MyAgentClanEmpty imageUrl={imageUrl} />
    )
  }

  return renderContent()
}

export default MyChatAgentClan
