import { UserGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPinAgentClans, postPinAgentClan } from "services/group"

interface PinAgentClanRequest {
  groupIds: string[]
  status: boolean
}

export const usePinAgentClans = () => {
  return useQuery<UserGroup[], Error>({
    queryKey: ["pinned-agent-clans"],
    queryFn: async () => {
      const data = await getPinAgentClans()
      return data
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export const usePinAgentClanMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: PinAgentClanRequest) => postPinAgentClan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinned-agent-clans"] })
    },
    onError: (error: Error) => {
      console.error("Error pinning agent clan:", error)
    },
  })
}
