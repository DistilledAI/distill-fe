import { CheckFilledIcon, CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button } from "@nextui-org/react"
import React from "react"
import { twMerge } from "tailwind-merge"

const VoteOption = ({
  label,
  icon,
  selected = false,
}: {
  label: string
  icon: React.ReactNode
  selected?: boolean
}) => (
  <div
    className={twMerge(
      "flex items-center justify-between rounded-full px-4 py-2",
      selected
        ? "border border-mercury-100 bg-mercury-200 font-semibold"
        : "bg-mercury-70",
    )}
  >
    <span className="text-16 text-mercury-950">{label}</span>
    {icon}
  </div>
)

const VotingWidget = () => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col gap-1">
        <VoteOption label="Yes" icon={<CheckFilledIcon />} selected />
        <VoteOption label="No" icon={<CloseFilledIcon />} />
      </div>
      <Button
        isDisabled
        className="btn-primary w-full !bg-mercury-950 !text-white"
      >
        Cast your vote
      </Button>
    </div>
  )
}

export default VotingWidget
