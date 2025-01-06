import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

interface CloseButtonProps {
  onClose?: () => void
  className?: string
}

const CloseButton = ({ onClose, className }: CloseButtonProps) => {
  return (
    <Button
      isIconOnly
      onPress={onClose}
      className={twMerge(
        "rounded-full bg-transparent hover:bg-mercury-70",
        className,
      )}
    >
      <CloseFilledIcon />
    </Button>
  )
}

export default CloseButton
