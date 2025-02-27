import { PATH_NAMES } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentConfig } from "services/agent"
import { QueryDataKeys } from "types/queryDataKeys"

export interface AgentConfig {
  botId: number
  createdAt: string
  id: number
  key: string
  status: number
  value: string
}

const useFetchAgentConfig = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()

  const fetchAgentDetailConfig = async () => {
    try {
      const agentIdNumber = Number(agentId)
      const response = await getAgentConfig(agentIdNumber)
      if (response?.data) return response.data.items as AgentConfig[]
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      navigate(PATH_NAMES.HOME)
    }
  }

  const { data, refetch } = useQuery({
    queryKey: [QueryDataKeys.AGENT_DETAIL_CONFIG],
    queryFn: fetchAgentDetailConfig,
    refetchOnWindowFocus: false,
  })

  return { agentConfigs: data || [], refetch }
}

export default useFetchAgentConfig
