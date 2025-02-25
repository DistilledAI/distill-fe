import { useLocation, useNavigate } from "react-router-dom"
import MyPrivateAgent from "./ChatMyAgent/MyAgentButton"
import ChatMyAgentBox from "@pages/PrivateChat/ChatMyAgent/ChatMyAgentBox"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import ChatMyAgentEmpty from "./ChatMyAgent/ChatMyAgentEmpty"
import ChatAgentOthers from "./ChatAgentOthers"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import { useEffect } from "react"

const PrivateChat = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && myAgent?.id

  useEffect(() => {
    if (isChatMyAgent) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${myAgent?.id}`)
    }
  }, [isChatMyAgent])

  const renderChatBox = () => {
    if (!isChatAgentOther) {
      return isChatMyAgent ? <ChatMyAgentBox /> : <ChatMyAgentEmpty />
    }
    return <ChatAgentOthersBox />
  }

  return (
    <div className="flex">
      <div className="w-[250px]">
        <div className="fixed -mt-[68px] h-full w-[250px] border-x border-x-mercury-200 px-3 pt-2">
          <h2 className="text-32 font-bold text-mercury-950">Private Chat</h2>
          <div className="mt-4 h-full">
            <h3 className="tex-14 mb-3 font-medium text-mercury-800">
              Chat with My Agent
            </h3>
            <MyPrivateAgent />
            <ChatAgentOthers />
          </div>
        </div>
      </div>
      <div className="relative h-[calc(100dvh-68px)] flex-1 pt-1">
        {renderChatBox()}
      </div>
    </div>
  )
}

export default PrivateChat
