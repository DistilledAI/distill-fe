import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { twMerge } from "tailwind-merge"

interface Props {
  isScrollBottom: boolean
  scrollBottomClassName?: string
  onClick?: () => void
}

const ScrollBottomChat = ({
  isScrollBottom,
  scrollBottomClassName,
  onClick,
}: Props) => {
  const { spacing } = useStyleSpacing()

  if (!isScrollBottom) return null

  return (
    <div
      className={twMerge(
        "sticky inset-x-0 bottom-0 z-10 flex h-10 w-full items-center justify-center bg-fading-white bg-cover bg-no-repeat",
        scrollBottomClassName,
      )}
      style={{
        bottom: `${spacing}px`,
      }}
    >
      <Button
        onPress={onClick}
        className="w-10 min-w-10 rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2"
      >
        <div className="rotate-180">
          <ArrowUpFilledIcon />
        </div>
      </Button>
    </div>
  )
}

export default ScrollBottomChat
