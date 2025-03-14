import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { IGroupDetail } from "types/group"
import { getConfigClanValue } from "@utils/clanConfig"
import { getMyAgentClan } from "services/group"
import { QueryDataKeys } from "types/queryDataKeys"

interface UseMyAgentClanReturn {
  imageUrl: string | undefined
  nameAgentClan: string
  isSelected: boolean
  isLoading: boolean
  group: IGroupDetail | undefined
}

const useMyAgentClan = (): UseMyAgentClanReturn => {
  const { chatId } = useParams<{ chatId?: string }>()

  const { data: group, isLoading } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_AGENT_CLAN],
    queryFn: getMyAgentClan,
    staleTime: 5 * 60 * 1000,
  })

  const imageUrl = useMemo(
    () => (group ? getConfigClanValue(group, "imageLive") : undefined),
    [group],
  )

  const nameAgentClan = useMemo(
    () => (group?.label ? group.label.split(" ").join("") : ""),
    [group?.label],
  )

  const isSelected = useMemo(
    () => chatId === nameAgentClan || !chatId,
    [chatId, nameAgentClan],
  )

  return {
    imageUrl,
    nameAgentClan,
    isSelected,
    isLoading,
    group,
  }
}

export default useMyAgentClan
