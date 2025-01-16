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
    <div className="relative grid h-[calc(100dvh-50px)] grid-cols-1 overflow-hidden p-2 pb-0 max-sm:flex md:h-full md:max-h-[calc(100dvh-68px)] md:grid-cols-[2fr_1.3fr] md:gap-4 md:p-4 md:pl-9 md:pt-1">
      <div className="h-full w-full">
        <TopicTitle conversationInfo={conversationInfo} />
        <HostsBox conversationInfo={conversationInfo} />
        <AgentsConversation />
      </div>
      <UserConversation />
    </div>
  )
}

export default Orchestration
