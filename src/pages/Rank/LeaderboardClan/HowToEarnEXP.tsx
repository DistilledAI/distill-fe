import { distilledAIPurpleBg } from "@assets/images"
import CloseButton from "@components/CloseButton"
import { ArrowsTargetIcon } from "@components/Icons/Arrow"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import XPBadge from "@components/XPBadge"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import ProgressDays from "./ProgressDays"

const HowToEarnEXP = () => {
  const queryClient = useQueryClient()

  const onCloseLeaderboard = () => {
    queryClient.setQueryData(
      [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
      () => false,
    )
  }

  return (
    <div
      className="h-[356px] border-b border-b-mercury-200 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${distilledAIPurpleBg})`,
      }}
    >
      <div className="relative space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ArrowsTargetIcon />
            <h4 className="text-16 font-medium text-mercury-800">
              How to earn EXP
            </h4>
          </div>
          <CloseButton className="-mr-2" onClose={onCloseLeaderboard} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="max-w-[96px] text-14 text-mercury-950">
              Chat a message
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <RefreshIcon />
                <span className="text-14 text-mercury-950">Repeatable:</span>
                <span className="text-14 font-bold text-mercury-950">100</span>
              </div>
              <XPBadge xpValue={1} operation="plus" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="max-w-[96px] text-14 text-mercury-950">
              Agent Replied
            </span>
            <XPBadge xpValue={2} operation="plus" />
          </div>
          <div className="flex items-center justify-between">
            <span className="max-w-[96px] text-14 text-mercury-950">
              Others Replied
            </span>
            <XPBadge xpValue={0.5} operation="plus" />
          </div>
        </div>
        <p className="text-14 text-mercury-600">
          Note: To complete the missions, your account needs to be activated.
        </p>
      </div>
      <ProgressDays />
    </div>
  )
}

export default HowToEarnEXP
