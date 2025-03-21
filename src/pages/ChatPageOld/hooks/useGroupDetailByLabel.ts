import { useQuery } from "@tanstack/react-query"
import { getGroupDetailFromLabel } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { IGroup } from "../ChatContainer/LeftBar/useFetchGroups"

const SPECIAL_LABEL = "@maxisbuyin"
const SPECIAL_LABEL_REPLACEMENT = "@maxisbuyin_"

const useGroupDetailByLabel = (label: string) => {
  const fetchGroupDetail = async (): Promise<IGroup | undefined> => {
    if (!label || !label.includes("@")) return undefined

    try {
      let normalizedLabel = label.split(" ").join("")
      if (normalizedLabel === SPECIAL_LABEL) {
        normalizedLabel = SPECIAL_LABEL_REPLACEMENT
      }

      const response = await getGroupDetailFromLabel(normalizedLabel)

      return response.data
    } catch (error) {
      console.error("Failed to fetch chat ID:", error)
      return undefined
    }
  }

  const { data, isFetched, isError } = useQuery<any>({
    queryKey: [`${QueryDataKeys.CHAT_ID_BY_USERNAME}-${label}`],
    queryFn: fetchGroupDetail,
    enabled: !!label && label.includes("@") && !label.includes(" "),
    staleTime: 5 * 60 * 1000,
  })

  return {
    groupId: data?.id?.toString(),
    groupDetailByLabel: data || undefined,
    isFetched,
    isError,
  }
}

export default useGroupDetailByLabel
