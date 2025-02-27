import { useMemo, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchAgentDetail from "@pages/AgentDetail/useFetchAgentDetail"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import { IGroupDetail } from "types/group"

interface AgentConfig {
  key: string
  value: string | undefined
}

interface UseAgentClanDataReturn {
  imageUrl: string | undefined
  nameAgentClan: string
  isSelected: boolean
  isLoading: boolean
  group: IGroupDetail
}

const useAgentClanData = (): UseAgentClanDataReturn => {
  const { chatId } = useParams<{ chatId?: string }>()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { agentData, isLoading: agentLoading } = useFetchAgentDetail(
    myAgent?.id,
  )
  const clanIdOfAgent = useMemo(
    () =>
      agentData?.botConfigs?.find(
        (val: AgentConfig) => val?.key === "clanOfAgent",
      )?.value,
    [agentData?.botConfigs],
  )
  const { groupDetail, isLoading: groupLoading } = useGroupDetail(clanIdOfAgent)
  const group = groupDetail?.group

  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  useEffect(() => {
    if (!initialDataLoaded && !agentLoading && !groupLoading) {
      setInitialDataLoaded(true)
    }
  }, [agentLoading, groupLoading, initialDataLoaded])

  const imageUrl = useMemo(
    () => getConfigClanValue(group, "imageLive"),
    [group],
  )
  const nameAgentClan = useMemo(
    () => group?.label?.split(" ")?.join("") || "",
    [group?.label],
  )
  const isSelected = useMemo(
    () => chatId === nameAgentClan || !chatId,
    [chatId, nameAgentClan],
  )
  const isLoading = useMemo(
    () => !initialDataLoaded || agentLoading || groupLoading,
    [initialDataLoaded, agentLoading, groupLoading],
  )

  return { imageUrl, nameAgentClan, isSelected, isLoading, group }
}

export default useAgentClanData
