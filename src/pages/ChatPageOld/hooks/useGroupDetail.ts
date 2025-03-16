import { useQuery } from "@tanstack/react-query"
import { getGroupChatDetail } from "services/chat"
import useAuthState from "@hooks/useAuthState"
import { QueryDataKeys } from "types/queryDataKeys"

const useGroupDetail = (groupId: string = "") => {
  const { isLogin } = useAuthState()

  const { data, isLoading, refetch, isFetched } = useQuery({
    queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${groupId}`],
    queryFn: () =>
      getGroupChatDetail({
        filter: groupId?.includes("@")
          ? `{"label":"${groupId}"}`
          : `{"groupId":${groupId}}`,
      }),
    enabled: !!groupId && isLogin,
  })

  return {
    groupDetail: data?.data || undefined,
    isLoading,
    refetch,
    isFetched,
    groupId,
  }
}

export default useGroupDetail
