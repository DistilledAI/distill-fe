import useAuthState from "@hooks/useAuthState"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getMyBotData } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import { IBotData } from "types/user"

export const LIMIT_MY_DATA = 10

const useFetchData = (botId: number | undefined) => {
  const { isLogin } = useAuthState()

  const handleFetch = async ({ pageParam = 1 }) => {
    if (!botId) return
    const offset = (pageParam - 1) * LIMIT_MY_DATA
    const res = await getMyBotData(botId, {
      limit: LIMIT_MY_DATA,
      offset,
    })
    if (res.data) return res.data.items || []
    return []
  }

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isFetched,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`],
    queryFn: handleFetch,
    initialPageParam: 1,
    enabled: !!botId && isLogin,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })

  const list: IBotData[] = data ? data.pages.flat() : []

  return {
    list,
    isFetching,
    isFetched,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  }
}

export default useFetchData
