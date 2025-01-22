import { STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getMyBotData } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import { IAgentData } from "types/user"

interface UseActiveAgentReturn {
  isAgentActive: boolean
  currentAgent: IAgentData | null
  agentDataList: IAgentData[]
  agentList: IAgentData[]
  isAgentDataFetched: boolean
}

const useActiveAgent = (): UseActiveAgentReturn => {
  const { botId } = useParams<{ botId: string }>()
  const agentList = useAppSelector((state) => state.agents.myAgents)

  const [agentDataQuery] = useQueries<
    [{ data: { data: { items: IAgentData[] } } }]
  >({
    queries: [
      {
        queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`],
        queryFn: () => getMyBotData(Number(botId), { limit: 1, offset: 0 }),
        enabled: !!botId,
      },
    ],
  })

  const { data: agentData, isFetched: isAgentDataFetched } = agentDataQuery

  const agentDataList = agentData?.data?.items || []

  const currentAgent =
    agentList.find((agent) => agent?.id?.toString() === botId) ||
    agentList[0] ||
    null

  console.log("🚀 ~ useActiveAgent ~ currentAgent:", currentAgent)

  const isAgentActive = currentAgent?.status === STATUS_AGENT.ACTIVE

  return {
    isAgentActive,
    currentAgent,
    agentDataList,
    agentList,
    isAgentDataFetched,
  }
}

export default useActiveAgent
