import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import { PATH_NAMES } from "@constants/index"
import ChatMyAgentBox from "./ChatMyAgent/ChatMyAgentBox"
import ChatMyAgentEmpty from "./ChatMyAgent/ChatMyAgentEmpty"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import useWindowSize from "@hooks/useWindowSize"

const PrivateChatBox = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { isMobile } = useWindowSize()

  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && !!myAgent?.id

  useEffect(() => {
    if (!myAgent?.id && !isChatAgentOther) {
      if (isMobile) {
        navigate(PATH_NAMES.PRIVATE_AGENT_EMPTY)
      } else {
        navigate(PATH_NAMES.PRIVATE_AGENT)
      }
    } else if (isChatMyAgent) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${myAgent?.id}`)
    }
  }, [myAgent?.id, isChatAgentOther, isChatMyAgent, isMobile])

  const renderChatBox = () => {
    if (isChatAgentOther) return <ChatAgentOthersBox />
    return myAgent?.id ? <ChatMyAgentBox /> : <ChatMyAgentEmpty />
  }

  return renderChatBox()
}

export default PrivateChatBox
