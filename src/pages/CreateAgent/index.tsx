import { useLocation } from "react-router-dom"
import AgentHeader from "./Header"
import AgentNavTab from "./NavTab"
import TestAgent from "./TestAgent"
import AgentContent from "./Content"
import CreateAgentModal from "@components/CreateAgentModal"

const CreateAgent = () => {
  const { state } = useLocation()
  const isShowModalCreate =
    !state || state?.typeAgent === null || state?.llmModel === null

  return (
    <div className="pt-[70px]">
      <AgentHeader />
      <div className="relative mx-auto flex max-w-[1536px] items-start gap-[40px] px-6 py-6">
        <div className="w-[260px]">
          <AgentNavTab />
        </div>
        <div className="flex-1">
          <AgentContent />
        </div>
        <div className="w-[330px]">
          <TestAgent />
        </div>
      </div>
      {isShowModalCreate && (
        <CreateAgentModal isCanClose={false} isOpen={true} onClose={() => {}} />
      )}
    </div>
  )
}

export default CreateAgent
