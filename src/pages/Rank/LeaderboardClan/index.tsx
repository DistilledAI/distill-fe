import HowToEarnEXP from "./HowToEarnEXP"
import { twMerge } from "tailwind-merge"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
// import RankExpList from "./RankExpList"
import ToggleLeaderboardClan from "./ToggleLeaderboardClan"
import useOutsideClick from "@hooks/useOutSideClick"
import { useRef } from "react"

const LeaderboardClan = ({
  refIgnoreOutsideArr,
}: {
  refIgnoreOutsideArr?: Array<any>
}) => {
  const queryClient = useQueryClient()
  const { data: isToggleLeaderboard } = useQuery<boolean>({
    queryKey: [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
    staleTime: 0,
  })
  const leaderboardRef = useRef<any>(null)
  useOutsideClick(
    leaderboardRef,
    () =>
      queryClient.setQueryData<boolean>(
        [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
        () => false,
      ),
    refIgnoreOutsideArr,
  )

  return (
    <div ref={leaderboardRef}>
      <ToggleLeaderboardClan />
      <div
        className={twMerge(
          "fixed inset-y-0 right-0 z-[51] w-full translate-x-[100%] overflow-hidden rounded-bl-[22px] rounded-tl-[22px] border border-mercury-100 bg-mercury-30 shadow-9 transition-all duration-300 ease-in-out md:bottom-6 md:top-[68px] md:max-w-[380px]",
          isToggleLeaderboard && "translate-x-0",
        )}
      >
        <HowToEarnEXP />
        {/* <RankExpList /> */}
      </div>
    </div>
  )
}

export default LeaderboardClan
