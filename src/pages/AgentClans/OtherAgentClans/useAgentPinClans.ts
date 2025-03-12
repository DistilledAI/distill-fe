import useAuthState from "@hooks/useAuthState"
import { UserGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPinAgentClans, postPinAgentClan } from "services/group"
import { QueryDataKeys } from "types/queryDataKeys"

interface PinAgentClanRequest {
  groupIds: string[]
  status: boolean
}

export const usePinAgentClans = () => {
  const { isLogin } = useAuthState()

  return useQuery<UserGroup[], Error>({
    queryKey: [QueryDataKeys.PINNED_AGENT_CLANS],
    queryFn: async () => {
      const data = await getPinAgentClans()
      return data
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: isLogin,
  })
}

export const usePinAgentClanMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: PinAgentClanRequest) => postPinAgentClan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryDataKeys.PINNED_AGENT_CLANS],
      })
    },
    onError: (error: Error) => {
      console.error("Error pinning agent clan:", error)
    },
  })
}
