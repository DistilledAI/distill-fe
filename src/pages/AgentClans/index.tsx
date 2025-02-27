import AllClans from "./AllClans"
import MyAgentClan from "./MyAgentClan"
import ChatClanBox from "./ChatClanBox"

const AgentClans = () => {
  return (
    <div className="flex h-full">
      <aside className="w-[250px] border-r border-mercury-200">
        <div className="fixed -mt-[68px] h-full w-[250px] px-3 pt-2">
          <h2 className="text-32 font-bold text-mercury-950">Clans</h2>
          <div className="mt-4 space-y-3">
            <h3 className="text-14 font-medium text-mercury-800">
              My Agent Clan
            </h3>
            <MyAgentClan />
            <AllClans />
          </div>
        </div>
      </aside>
      <main className="flex-1">
        <ChatClanBox />
      </main>
    </div>
  )
}

export default AgentClans
