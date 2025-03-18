import DynamicTitleMeta from "@components/DynamicTitleMeta"
import MyAgentClan from "../MyAgentClan/MyAgentClanButton"
import AllClans from "../OtherAgentClans/AllClans"

const AgentClansMobile = () => {
  return (
    <>
      <DynamicTitleMeta title="Agent Clans" />
      <div className="h-full w-full space-y-2 px-3">
        <h3 className="text-14 font-medium text-mercury-800">My Agent Clan</h3>
        <MyAgentClan />
        <AllClans />
      </div>
    </>
  )
}

export default AgentClansMobile
