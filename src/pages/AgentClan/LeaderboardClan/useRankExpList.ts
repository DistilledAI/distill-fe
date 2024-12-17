import useAuthState from "@hooks/useAuthState"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { getLeaderboardExpByGroupId } from "services/point"
import { QueryDataKeys } from "types/queryDataKeys"

interface LeaderboardEntry {
  userId: number
  publicAddress: string
  username: string
  avatar: string
  totalPointExp: number
  xDSTL: number
}

const useRankExpList = ({
  groupId,
  isToggleLeaderboard = false,
}: {
  groupId: string
  isToggleLeaderboard?: boolean
}) => {
  const { isLogin } = useAuthState()

  const fetchRankList = async ({ pageParam = 0 }) => {
    if (!groupId) return

    const res = await getLeaderboardExpByGroupId({
      groupId: Number(groupId),
      offset: pageParam,
    })
    return {
      rankList:
        res?.items.map((item: any) => ({
          userId: item?.user?.id,
          publicAddress: item?.user?.publicAddress,
          username: item?.user?.username,
          avatar: item?.user?.avatar,
          totalPointExp: item.totalPoint,
        })) || [],
      nextOffset:
        res?.items.length > 0 ? pageParam + res?.items.length : undefined,
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetched,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QueryDataKeys.EXP_RANK_LIST_BY_GROUP, groupId],
    queryFn: fetchRankList,
    enabled: isLogin && !!groupId && isToggleLeaderboard,
    getNextPageParam: (lastPage) => lastPage?.nextOffset,
    getPreviousPageParam: (firstPage) => firstPage?.nextOffset,
    initialPageParam: 0,
  })

  const rankList =
    (
      data as InfiniteData<{ rankList: LeaderboardEntry[] }> | undefined
    )?.pages?.flatMap((page) => page?.rankList) || []

  return {
    rankList,
    error,
    hasNextPage,
    isFetched,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    groupId,
    refetch,
  }
}

export default useRankExpList
