import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatBox/LeftBar/OrchestrationSlider"
import { useParams } from "react-router-dom"
import AgentsConversation from "./AgentsConversation"
import HostsBox from "./HostsBox"
import TopicTitle from "./TopicTitle"
import UserConversation from "./UserConversation"

const Orchestration = () => {
  const { conversationId } = useParams()
  const conversationInfo = ORCHESTRATION_LIST.find(
    (item: any) => (item.conversationId = conversationId),
  )

  return (
    <div className="grid h-full max-h-[calc(100dvh-68px)] grid-cols-3 gap-12 overflow-hidden p-4 pl-12">
      <div className="col-span-2">
        <TopicTitle conversationInfo={conversationInfo} />
        <HostsBox conversationInfo={conversationInfo} />
        <AgentsConversation />
      </div>
      <div className="h-full rounded-[32px] border border-mercury-100">
        <UserConversation />
      </div>
    </div>
  )
}

export default Orchestration
