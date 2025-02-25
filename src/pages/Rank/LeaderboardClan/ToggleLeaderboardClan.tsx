import { toggleSidebarBg } from "@assets/images"
import { TrophyFilledIcon } from "@components/Icons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

const ToggleLeaderboardClan = () => {
  const queryClient = useQueryClient()
  const { data: isToggleLeaderboard } = useQuery<boolean>({
    queryKey: [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
    staleTime: 0,
  })

  const toggleLeaderboardClan = () => {
    queryClient.setQueryData(
      [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
      () => !isToggleLeaderboard,
    )
  }

  return (
    <button
      type="button"
      className={twMerge(
        "fixed inset-y-1/2 right-0 z-[49] flex h-[148px] w-8 -translate-y-1/2 items-center justify-center bg-cover bg-center bg-no-repeat text-white transition-all duration-300 ease-in-out",
        isToggleLeaderboard && "right-[380px]",
      )}
      style={{
        backgroundImage: `url(${toggleSidebarBg})`,
      }}
      onClick={toggleLeaderboardClan}
    >
      <div className="flex -rotate-90 flex-row-reverse items-center gap-1">
        <span className="text-14 font-bold text-brown-100">LEADERBOARD</span>
        <div>
          <TrophyFilledIcon color="#A88E67" size={14} />
        </div>
      </div>
    </button>
  )
}

export default ToggleLeaderboardClan
