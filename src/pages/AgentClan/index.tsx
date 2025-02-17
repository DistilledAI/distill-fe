import ChatBoxLive from "@pages/ChatBoxLive"
import AllClans from "./AllClans"
import MyAgentClan from "./MyAgentClan"

const AgentClan = () => {
  return (
    <div className="flex">
      <div className="h-full w-[250px]">
        <div className="fixed -mt-[68px] h-full w-[250px] border-x border-x-mercury-200 px-3 pt-2">
          <h2 className="text-32 font-bold text-mercury-950">Clans</h2>
          <div className="mt-4 space-y-3">
            <h3 className="tex-14 font-medium text-mercury-800">
              My Agent Clan
            </h3>
            <MyAgentClan />
            <AllClans />
          </div>
        </div>
      </div>
      <ChatBoxLive />
    </div>
  )
}

export default AgentClan
