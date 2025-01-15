import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatBox/LeftBar/OrchestrationSlider"
import { useParams } from "react-router-dom"
import AgentsConversation from "./AgentsConversation"
import HostsBox from "./HostsBox"
import TopicTitle from "./TopicTitle"
import UserConversation from "./UserConversation"

const Orchestration = () => {
  const { chatId: conversationId } = useParams()
  const conversationInfo = ORCHESTRATION_LIST.find(
    (item: any) => item.conversationId.toString() === conversationId,
  )

  return (
    <div className="grid h-full max-h-[calc(100dvh-68px)] grid-cols-[2fr_1fr] gap-6 overflow-hidden p-4 pl-6 max-sm:flex max-sm:h-[100dvh] max-sm:flex-col">
      <div className="max-sm:h-full">
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
