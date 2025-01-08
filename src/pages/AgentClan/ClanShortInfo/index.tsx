import { xDSTL, xpIcon } from "@assets/images"
import { BoltIcon, TrophyIcon } from "@components/Icons"
// import useTimerProgress from "@hooks/useTimerProgress"
import { Image } from "@nextui-org/react"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { formatNumberWithComma } from "@utils/index"
import { useRef } from "react"
import { QueryDataKeys } from "types/queryDataKeys"
import LeaderboardClan from "../LeaderboardClan"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"
import useAuthState from "@hooks/useAuthState"

const ClanShortInfo = () => {
  const queryClient = useQueryClient()
  const rewardRef = useRef<any>()
  const { chatId: groupId } = useGetChatId()
  const { isLogin } = useAuthState()

  const queries = useQueries<[{ data: any }, { data: any }, { data: any }]>({
    queries: [
      {
        queryKey: [QueryDataKeys.TOTAL_EXP_POINT_USER, groupId],
        enabled: !!groupId && isLogin,
        staleTime: 0,
      },
      {
        queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${groupId}`],
        enabled: !!groupId && isLogin,
        staleTime: 0,
      },
      {
        queryKey: [QueryDataKeys.EARN_EXP_REMAINING_DAYS],
        enabled: isLogin,
        staleTime: 0,
      },
    ],
  })
  const expPointUser = queries[0]?.data
  const xDSTLTotalPoint = queries[1]?.data?.data?.group?.event?.totalPoint
  const remainingDays = queries[2]?.data

  const handleOpenLeaderboard = () => {
    queryClient.setQueryData<boolean>(
      [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
      () => true,
    )
  }

  // const handleRefetchXpPoint = useCallback(
  //   (e?: any) => {
  //     e?.preventDefault()
  //     e?.stopPropagation()
  //     queryClient.invalidateQueries({
  //       queryKey: [QueryDataKeys.TOTAL_EXP_POINT_USER, groupId],
  //     })
  //     setTimerProgress(0)
  //   },
  //   [groupId],
  // )

  // const { timerProgress, setTimerProgress } = useTimerProgress(
  //   60000,
  //   true,
  //   handleRefetchXpPoint,
  // )

  return (
    <>
      <div className="w-full pb-1 max-md:my-1 max-md:px-4">
        <div
          ref={rewardRef}
          onClick={handleOpenLeaderboard}
          className="flex w-full items-center rounded-full bg-mercury-30 px-4 py-2 max-md:bg-white max-md:px-2"
        >
          <div className="relative flex w-full items-center justify-between">
            <div className="absolute left-1/2 h-[26px] w-[1px] -translate-x-1/2 bg-mercury-200 max-md:hidden" />
            <div className="flex w-[calc(50%-15px)] items-center justify-between gap-3 max-md:w-auto max-md:flex-row-reverse">
              <div className="flex items-center gap-1 md:gap-2">
                <p className="text-12 text-mercury-900 md:text-14">Rewards</p>
                <div className="flex cursor-pointer items-center gap-1">
                  <img
                    src={xDSTL}
                    alt="xdstl"
                    className="h-5 w-5 md:h-6 md:w-6"
                  />
                  <span className="text-12 font-bold text-mercury-950 md:text-14">
                    {formatNumberWithComma(xDSTLTotalPoint) || "-"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <BoltIcon />
                <span className="whitespace-nowrap text-12 text-mercury-950 md:text-14">
                  {remainingDays || 0} days left
                </span>
              </div>
            </div>
            <div className="flex w-[calc(50%-15px)] items-center justify-between max-md:w-auto">
              <span className="text-14 text-mercury-900 max-md:hidden">
                Your EXP
              </span>
              <div className="flex items-center gap-2">
                {/* <button
                  type="button"
                  className="max-md:hidden"
                  onClick={handleRefetchXpPoint}
                >
                  <CircularProgress
                    aria-label="Loading..."
                    value={timerProgress}
                    minValue={0}
                    maxValue={100}
                    classNames={{
                      svg: "w-5 h-5 drop-shadow-md",
                      indicator: "stroke-[#7B5FC5]",
                    }}
                    strokeWidth={4}
                  />
                </button> */}
                <div className="flex cursor-pointer items-center gap-3">
                  <div className="flex items-center gap-1 max-md:hidden">
                    <div>
                      <TrophyIcon />
                    </div>
                    <span className="text-14 font-bold text-mercury-950">
                      {expPointUser?.rank || "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 max-md:mr-1">
                    <div>
                      <Image
                        src={xpIcon}
                        alt="xp"
                        className="h-5 w-5 md:h-6 md:w-6"
                      />
                    </div>
                    <span className="text-12 font-bold text-mercury-950 md:text-14">
                      {expPointUser?.totalPoint || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeaderboardClan refIgnoreOutsideArr={[rewardRef]} />
    </>
  )
}

export default ClanShortInfo
