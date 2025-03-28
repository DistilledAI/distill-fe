import MyAgentClanButton from "./MyAgentClan/MyAgentClanButton"
import ChatAgentClanBox from "./ChatAgentClanBox"
import AllClans from "./OtherAgentClans/AllClans"
import DynamicTitleMeta from "@components/DynamicTitleMeta"

const AgentClans = () => {
  return (
    <>
      <DynamicTitleMeta title="Agent Clans" />
      <div className="flex h-full">
        <aside className="w-[250px]">
          <div className="fixed -mt-[68px] h-full w-[250px] border-r border-r-mercury-200 px-3 pt-2">
            <h2 className="text-32 font-bold text-mercury-950">Clans</h2>
            <div className="mt-4 space-y-3">
              <h3 className="text-14 font-medium text-mercury-800">
                My Agent Clan
              </h3>
              <MyAgentClanButton />
              <AllClans />
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <ChatAgentClanBox />
        </main>
      </div>
    </>
  )
}

export default AgentClans
