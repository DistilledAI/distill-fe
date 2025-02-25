import AgentType from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import AgentBasicInfo from "@pages/CreateAgent/Content/Basic"
import ClanUtilities from "@pages/CreateAgent/Content/ClanUtilities"
import { TabKeyAgent } from "@pages/CreateAgent/NavTab"
import { defineElement } from "@utils/index"
import { useSearchParams } from "react-router-dom"
import { IAgentData } from "types/user"
import AutonomousTG from "../AutonomousTG"
import AutonomousX from "../AutonomousX"
import { AgentConfig } from "../useFetchAgentConfig"
import Knowledge from "./Knowledge"

const AgentContent: React.FC<{
  agentData: IAgentData
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentData, agentConfigs, refetch }) => {
  const [searchParams] = useSearchParams()
  const tabKey = searchParams.get("tab")
  // const isActive = (key: TabKeyAgent) => tab === key

  const mapAgnetContentToTabKey = {
    [TabKeyAgent.AgentType]: <AgentType />,
    [TabKeyAgent.Basic]: <AgentBasicInfo />,
    [TabKeyAgent.ClanUtilities]: <ClanUtilities />,
    [TabKeyAgent.AutonomousX]: (
      <AutonomousX
        agentConfigs={agentConfigs}
        refetch={refetch}
        agentData={agentData}
      />
    ),
    [TabKeyAgent.AutonomousTG]: (
      <AutonomousTG
        agentConfigs={agentConfigs}
        refetch={refetch}
        agentData={agentData}
      />
    ),
    [TabKeyAgent.Knowledge]: <Knowledge />,
  }

  const component = mapAgnetContentToTabKey[tabKey]

  return <>{defineElement(component)}</>
}

export default AgentContent
