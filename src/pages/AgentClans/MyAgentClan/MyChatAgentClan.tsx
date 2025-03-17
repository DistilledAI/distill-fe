import { PATH_NAMES } from "@constants/index"
import { useNavigate } from "react-router-dom"
import MyAgentClanEmpty from "./MyAgentClanEmpty"
import ChatBoxLive from "@pages/AgentClans/ChatBoxLive"
import useWindowSize from "@hooks/useWindowSize"
import useMyAgentClan from "./useMyAgentClan"
import { useEffect } from "react"

const MyChatAgentClan = () => {
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
  const { labelAgentClan, isLoading, imageUrl, group } = useMyAgentClan()

  useEffect(() => {
    if (!isLoading && !labelAgentClan) {
      navigate(
        isMobile
          ? `${PATH_NAMES.MY_AGENT_CLAN}/empty`
          : PATH_NAMES.MY_AGENT_CLAN,
      )
    } else if (!isLoading && labelAgentClan) {
      navigate(`${PATH_NAMES.MY_AGENT_CLAN}/${labelAgentClan}`)
    }
  }, [labelAgentClan, isMobile, isLoading])

  if (isLoading) {
    return null
  }

  const renderContent = () => {
    return group?.status === 1 && labelAgentClan ? (
      <ChatBoxLive />
    ) : (
      <MyAgentClanEmpty imageUrl={imageUrl} />
    )
  }

  return renderContent()
}

export default MyChatAgentClan
