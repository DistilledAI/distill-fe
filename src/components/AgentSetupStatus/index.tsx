import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { DatabaseIcon } from "@components/Icons/DatabaseImportIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { borderGdImg } from "@assets/images"
import AgentStatus from "@components/AgentStatus"

interface AgentSetupStatusProps {
  isAgentActive: boolean
}

const AgentSetupStatus = ({ isAgentActive }: AgentSetupStatusProps) => {
  return (
    <div className="relative mx-auto mb-4 flex max-w-[684px] items-center justify-between md:mb-6">
      {/* Agent Status */}
      <AgentStatus isAgentActive={isAgentActive} />

      {/* Chevron Divider */}
      <div className="absolute left-1/2 top-4 w-full max-w-[150px] -translate-x-1/2 md:max-w-[280px]">
        <img src={borderGdImg} alt="border gradient" />
        <div className="absolute -top-[9px] left-1/2">
          <div className="rotate-90">
            <ChevronDownIcon color="#9D936E" size={22} />
          </div>
        </div>
      </div>

      {/* Database Connection Status */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-mercury-200 md:h-10 md:w-10">
          <DatabaseIcon color="#363636" size={24} />
          <div className="absolute -bottom-1 -right-1">
            <FilledShieldCheckedIcon color="#A2845E" />
          </div>
        </div>
        <p className="max-w-[227px] text-center text-14 font-semibold text-mercury-950 md:text-18">
          Add anything you want the agent to learn
        </p>
      </div>
    </div>
  )
}

export default AgentSetupStatus
