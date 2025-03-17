import { ORCHESTRATION_LIST } from "@pages/ChatPageOld/ChatContainer/LeftBar/OrchestrationSlider"
import { useParams } from "react-router-dom"
import AgentsConversation from "./AgentsConversation"
import HostsBox from "./HostsBox"
import TopicTitle from "./TopicTitle"
import UserConversation from "./UserConversation"
import DynamicTitleMeta from "@components/DynamicTitleMeta"

const Orchestration = () => {
  const { chatId: conversationId } = useParams()
  const conversationInfo = ORCHESTRATION_LIST.find(
    (item: any) => item.conversationId.toString() === conversationId,
  )

  const pageTitleMeta = `${conversationInfo?.agent1.name} & ${conversationInfo?.agent2.name} - Multi-agent Chatrooms`

  return (
    <>
      <DynamicTitleMeta title={pageTitleMeta} />
      <div className="relative grid h-[calc(100dvh-52px)] grid-cols-1 overflow-hidden p-2 pb-0 max-sm:flex md:max-h-[calc(100dvh-68px)] md:grid-cols-[2fr_1.3fr] md:gap-4 md:p-4 md:pl-9 md:pt-1">
        <div>
          <TopicTitle conversationInfo={conversationInfo} />
          <HostsBox conversationInfo={conversationInfo} />
          <AgentsConversation />
        </div>
        <UserConversation />
      </div>
    </>
  )
}

export default Orchestration
