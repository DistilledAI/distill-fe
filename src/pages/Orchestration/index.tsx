// import useJoinGroupLive from "@hooks/useJoinGroupLive"
import AgentsConversation from "./AgentsConversation"
import HostsBox from "./HostsBox"
import TopicTitle from "./TopicTitle"
import UserConversation from "./UserConversation"

const Orchestration = () => {
  // useJoinGroupLive()

  return (
    <div className="grid h-full max-h-[calc(100dvh-68px)] grid-cols-3 gap-12 overflow-hidden p-4 pl-12">
      <div className="col-span-2">
        <TopicTitle />
        <HostsBox />
        <AgentsConversation />
      </div>
      <div className="h-full rounded-[32px] border border-mercury-100">
        <UserConversation />
      </div>
    </div>
  )
}

export default Orchestration
