import AgentSetupStatus from "@components/AgentSetupStatus"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"

const Knowledge = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isAgentActive = myAgent?.status === STATUS_AGENT.ACTIVE

  return (
    <div>
      <div className="flex items-center gap-1">
        <DatabaseImportIcon />
        <span className="text-[22px] font-semibold">Connected Sources</span>
      </div>
      <div className="mt-5">
        <AgentSetupStatus isAgentActive={isAgentActive} />
      </div>
    </div>
  )
}

export default Knowledge
