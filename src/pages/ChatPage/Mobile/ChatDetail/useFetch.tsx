import useAuthState from "@hooks/useAuthState"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQuery } from "@tanstack/react-query"
import { getGroupChatDetail } from "services/chat"
import useGetChatId from "../../hooks/useGetChatId"
import { QueryDataKeys } from "types/queryDataKeys"
import { useEffect } from "react"

const useFetchDetail = (isInvited = false) => {
  const { isLogin } = useAuthState()
  const { chatId } = useGetChatId()

  const params =
    chatId && chatId?.toString().includes("@")
      ? { filter: `{"label":"${chatId}"}` }
      : { filter: `{"groupId":${chatId}}` }

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: [QueryDataKeys.GROUP_DETAIL, chatId?.toString()],
    queryFn: () => getGroupChatDetail(params),
    staleTime: 60 * 60 * 1000,
    enabled: !!chatId && !!isLogin,
    retry: false,
  })

  useEffect(() => {
    let timeout = undefined
    if (isInvited && isLogin && !!chatId) {
      timeout = setTimeout(() => {
        refetch()
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [isInvited, isLogin, chatId])

  const result: UserGroup | null = data?.data || null

  return { groupDetail: result, chatId, isLoading, isFetched }
}

export default useFetchDetail
