import DotLoading from "@components/DotLoading"
import { TrophyFilledIcon } from "@components/Icons"
import useAuthState from "@hooks/useAuthState"
import { useQueries, useQuery } from "@tanstack/react-query"
import { Virtuoso } from "react-virtuoso"
import { getTotalExpPointGroup, getTotalExpPointUser } from "services/point"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import RankExpCard from "./RankExpCard"
import useRankExpList from "./useRankExpList"
import useGetChatId from "@pages/ChatPageOld/hooks/useGetChatId"

const RankExpList = () => {
  const { user, isAnonymous } = useAuthState()
  const { data: isToggleLeaderboard } = useQuery<boolean>({
    queryKey: [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
    staleTime: 0,
  })
  const { isLogin } = useAuthState()
  const { chatId: groupId } = useGetChatId()
  const { rankList, isLoading } = useRankExpList({
    groupId,
    isToggleLeaderboard,
  })
  const queries = useQueries<[{ data: any }, { data: any }, { data: any }]>({
    queries: [
      {
        queryKey: [QueryDataKeys.TOTAL_EXP_POINT_GROUP, groupId],
        queryFn: async () => await getTotalExpPointGroup(Number(groupId)),
        enabled: !!groupId && isLogin,
        staleTime: 0,
      },
      {
        queryKey: [QueryDataKeys.TOTAL_EXP_POINT_USER, groupId],
        queryFn: async () => await getTotalExpPointUser(Number(groupId)),
        enabled: !!groupId && isLogin,
        staleTime: 0,
      },
      {
        queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${groupId}`],
        enabled: !!groupId && isLogin,
        staleTime: 0,
      },
    ],
  })
  const expPointGroup = queries[0]?.data
  const expPointUser = queries[1]?.data
  const xDSTLTotalPoint = queries[2]?.data?.data?.group?.event?.totalPoint

  const getXDSTL = (totalExpPointUser: number) => {
    if (totalExpPointUser && expPointGroup?.totalPoint && xDSTLTotalPoint) {
      return (
        (totalExpPointUser / Number(expPointGroup?.totalPoint)) *
        xDSTLTotalPoint
      ).toFixed(0)
    }
    return "0"
  }

  return (
    <div className="h-full space-y-2 py-4">
      <div className="px-6">
        <div className="flex items-center gap-2">
          <TrophyFilledIcon />
          <h4 className="text-16 font-medium text-mercury-800">Leaderboard</h4>
        </div>
        <p className="text-14 text-mercury-500">
          All EXP converts to xDSTL after the competition ends.
        </p>
      </div>
      <div className="h-[calc(100dvh-300px)] space-y-2 md:h-[calc(100dvh-444px)]">
        {!isAnonymous && (
          <RankExpCard
            classNames={{
              wrapper: "border border-brown-500 bg-brown-50 mx-6 pt-2",
            }}
            rank={expPointUser?.rank}
            avatarUrl={user?.avatar}
            publicAddress={user?.publicAddress}
            username={user?.username}
            exp={expPointUser?.totalPoint}
            xDSTL={getXDSTL(expPointUser?.totalPoint)}
          />
        )}

        <Virtuoso
          style={{ height: "100%" }}
          data={rankList}
          components={{
            Footer: () =>
              isLoading && rankList.length > 0 ? (
                <div className="flex items-center justify-center">
                  <DotLoading />
                </div>
              ) : null,
          }}
          itemContent={(index, rankItem) => {
            return (
              <RankExpCard
                key={index}
                rank={index + 1}
                avatarUrl={rankItem?.avatar}
                publicAddress={rankItem?.publicAddress}
                username={rankItem?.username}
                exp={rankItem?.totalPointExp}
                xDSTL={getXDSTL(rankItem?.totalPointExp)}
                classNames={{
                  wrapper: twMerge(
                    "mx-6",
                    index === rankList.length - 1 && "pb-24",
                  ),
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export default RankExpList
