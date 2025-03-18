import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { IGroupDetail } from "types/group"
import { getConfigClanValue } from "@utils/clanConfig"
import { getMyAgentClan } from "services/group"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "@hooks/useAuthState"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { PRIVATE_AGENT_STATUS } from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/usePrivateAgent"

interface UseMyAgentClanReturn {
  imageUrl: string | undefined
  labelAgentClan: string
  isSelected: boolean
  isLoading: boolean
  group: IGroupDetail | undefined
}

const useMyAgentClan = (): UseMyAgentClanReturn => {
  const { chatId } = useParams<{ chatId?: string }>()
  const { isLogin, isAnonymous } = useAuthState()
  const { pathname } = useLocation()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const { data: group, isLoading } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_AGENT_CLAN],
    queryFn: getMyAgentClan,
    enabled:
      isLogin &&
      !isAnonymous &&
      pathname.startsWith(PATH_NAMES.MY_AGENT_CLAN) &&
      myAgent?.status === PRIVATE_AGENT_STATUS.ACTIVE,
  })

  const imageUrl = useMemo(
    () => (group ? getConfigClanValue(group, "imageLive") : undefined),
    [group],
  )

  const labelAgentClan = useMemo(
    () => (group?.label ? group.label.split(" ").join("") : ""),
    [group?.label],
  )

  const isSelected = useMemo(
    () => chatId === labelAgentClan || !chatId,
    [chatId, labelAgentClan],
  )

  return {
    imageUrl,
    labelAgentClan,
    isSelected,
    isLoading,
    group,
  }
}

export default useMyAgentClan
