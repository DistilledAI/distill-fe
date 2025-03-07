import { PinIcon, PinnedIcon } from "@components/Icons/Pin"
import { usePinAgentClanMutation, usePinAgentClans } from "./useAgentPinClans"
import { Tooltip } from "@nextui-org/react"

interface Props {
  groupId: number
}

const MAX_PINNED_CLANS = 5

const PinClanButton = ({ groupId }: Props) => {
  const { data: pinnedClans = [], isPending: isLoadingPins } =
    usePinAgentClans()
  const { mutateAsync, isPending: isMutating } = usePinAgentClanMutation()

  const isPinned = pinnedClans.some((clan) => clan.group.id === groupId)
  const pinnedCount = pinnedClans.length
  const isMaxPinned = pinnedCount >= MAX_PINNED_CLANS
  const isDisabled = isMutating || isLoadingPins || (!isPinned && isMaxPinned)

  const handlePinAgentClan = async () => {
    if (isDisabled) return

    try {
      await mutateAsync({
        groupIds: [groupId.toString()],
        status: !isPinned,
      })
    } catch (error) {
      console.error("Failed to pin/unpin clan:", error)
    }
  }

  return (
    <Tooltip
      content="Only 5 agent clans can be pinned"
      isDisabled={isPinned || !isMaxPinned}
      placement="top"
    >
      <button
        type="button"
        className={`flex-shrink-0 ${isDisabled && !isPinned ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={handlePinAgentClan}
        disabled={isDisabled}
      >
        {isPinned ? <PinnedIcon /> : <PinIcon />}
      </button>
    </Tooltip>
  )
}

export default PinClanButton
