import { PATH_NAMES } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentDetail } from "services/agent"
import { QueryDataKeys } from "types/queryDataKeys"

const useFetchAgentDetail = (agentIdExternal: number = 0) => {
  const { agentId: agentIdParams } = useParams()
  const navigate = useNavigate()
  const agentId = agentIdExternal || agentIdParams

  const fetchAgentDetail = async () => {
    try {
      const agentIdNumber = Number(agentId)
      const response = await getAgentDetail(agentIdNumber)
      if (response?.data) return response.data
      else navigate(PATH_NAMES.HOME)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      navigate(PATH_NAMES.HOME)
    }
  }

  const {
    data: agentData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`${QueryDataKeys.AGENT_DETAIL}-${agentId}`],
    queryFn: fetchAgentDetail,
    refetchOnWindowFocus: false,
    enabled: !!agentId,
  })

  return { agentData, refetch, isLoading }
}

export default useFetchAgentDetail
