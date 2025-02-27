import useWindowSize from "@hooks/useWindowSize"
import React from "react"
import { IAgentData } from "types/user"
import ListAgent from "./List"
import ListAgentMobile from "./ListMobile"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "@components/Icons/Plus"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

const MyAgents: React.FC<{
  agents: IAgentData[]
}> = ({ agents }) => {
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilledBrainAIIcon size={22} color="#A2845E" />
          <span className="text-16 font-semibold md:text-20">My Agents</span>
        </div>
        {agents.length === 0 && (
          <Button
            onPress={() => navigate(PATH_NAMES.CREATE_AGENT)}
            className="min-w-0 rounded-full bg-mercury-950 text-white max-md:h-8"
          >
            <PlusIcon color="white" />
            <span className="hidden md:block">Create New Agent</span>
          </Button>
        )}
      </div>
      {isMobile ? (
        <ListAgentMobile data={agents} hasMore={false} loadMore={() => {}} />
      ) : (
        <ListAgent agents={agents} />
      )}
    </div>
  )
}

export default MyAgents
