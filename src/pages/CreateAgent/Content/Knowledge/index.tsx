import AgentSetupStatus from "@components/AgentSetupStatus"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"

const Knowledge = () => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <DatabaseImportIcon />
        <span className="text-[22px] font-semibold">Connected Sources</span>
      </div>
      <div className="mt-5">
        <AgentSetupStatus />
      </div>
    </div>
  )
}

export default Knowledge
