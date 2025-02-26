import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ChatMyAgentBox from "./ChatMyAgent/ChatMyAgentBox"
import ChatMyAgentEmpty from "./ChatMyAgent/ChatMyAgentEmpty"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import useWindowSize from "@hooks/useWindowSize"

const PrivateChatBox = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && myAgent?.id
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (isChatMyAgent) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${myAgent?.id}`)
    }
  }, [isChatMyAgent, isMobile])

  const renderChatBox = () => {
    if (!isChatAgentOther) {
      return isChatMyAgent ? <ChatMyAgentBox /> : <ChatMyAgentEmpty />
    }
    return <ChatAgentOthersBox />
  }

  return renderChatBox()
}

export default PrivateChatBox
