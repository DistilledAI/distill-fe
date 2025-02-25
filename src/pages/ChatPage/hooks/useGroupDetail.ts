import { useQuery } from "@tanstack/react-query"
import { getGroupChatDetail } from "services/chat"
import useGetChatId from "./useGetChatId"
import useAuthState from "@hooks/useAuthState"
import { QueryDataKeys } from "types/queryDataKeys"

const useGroupDetail = (groupIdExternal: string = "") => {
  const { chatId, originalChatId } = useGetChatId()
  const { isLogin } = useAuthState()
  const { data: hasJoinedGroup } = useQuery<boolean>({
    queryKey: [QueryDataKeys.HAS_JOINED_GROUP],
  })
  const groupId = groupIdExternal || chatId

  const { data, isLoading, refetch, isFetched } = useQuery({
    queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${originalChatId}`],
    queryFn: () =>
      getGroupChatDetail({
        filter: groupId?.includes("@")
          ? `{"label":"${groupId}"}`
          : `{"groupId":${groupId}}`,
      }),
    enabled: !!groupId && isLogin && hasJoinedGroup,
  })

  return { groupDetail: data?.data, isLoading, refetch, isFetched, groupId }
}

export default useGroupDetail
