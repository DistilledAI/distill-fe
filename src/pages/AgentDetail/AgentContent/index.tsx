import AgentType from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import AgentBasicInfo from "@pages/CreateAgent/Content/Basic"
import ClanUtilities from "@pages/CreateAgent/Content/ClanUtilities"
import { TabKeyAgent } from "@pages/CreateAgent/NavTab"
import { defineElement } from "@utils/index"
import { useSearchParams } from "react-router-dom"
import { IAgentData } from "types/user"
import AutonomousTG from "../AutonomousTG"
import AutonomousX from "../AutonomousX"
import KnowledgeAgent from "../Knowledge"
import { AgentConfig } from "../useFetchAgentConfig"

export const BLACKLIST_BOT_VERSION = [
  "devorai/distilled-chat:0.0.6.4-cc",
  "devorai/distilled-chat:0.0.6.5-cc",
  "devorai/distilled-chat:0.0.6.6-cc",
  "distilled/distilled-agent:1.0.0-cc",
  "oraichain/distilled-agent:1.0.0",
  "harbor.orai.network/distill/distilled-agent:3.0.0",
  "harbor.orai.network/distill/distilled-agent:4.0.0",
  "harbor.orai.network/distill/distilled-agent:5.0.0",
]

const AgentContent: React.FC<{
  agentData: IAgentData
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentData, agentConfigs, refetch }) => {
  const [searchParams] = useSearchParams()
  const tabKey = searchParams.get("tab") as any
  const botVersionData = agentData?.botVersion || ""
  const isDisabledLLMModel = BLACKLIST_BOT_VERSION.includes(botVersionData)

  const mapAgnetContentToTabKey = {
    [TabKeyAgent.AgentType]: (
      <AgentType isDisabledTypeAgent isDisabledLLMModel={isDisabledLLMModel} />
    ),
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
    [TabKeyAgent.Knowledge]: <KnowledgeAgent />,
  } as any

  const component = mapAgnetContentToTabKey[tabKey]

  return <>{defineElement(component)}</>
}

export default AgentContent
