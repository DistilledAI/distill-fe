import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { RefObject, useCallback } from "react"
import { VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"

interface Props {
  isScrollBottom: boolean
  virtuosoRef: RefObject<VirtuosoHandle>
  scrollBottomClassName?: string
}

const ScrollBottomChat = ({
  isScrollBottom,
  virtuosoRef,
  scrollBottomClassName,
}: Props) => {
  const { spacing } = useStyleSpacing()

  const onScrollToBottom = useCallback(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: "LAST",
        behavior: "auto",
        align: "end",
      })
    }
  }, [virtuosoRef.current])

  if (!isScrollBottom) return null

  return (
    <div
      className={twMerge(
        "absolute inset-x-0 bottom-0 z-10 flex h-20 w-full items-center justify-center bg-fading-white bg-cover bg-no-repeat",
        scrollBottomClassName,
      )}
      style={{
        bottom: `${spacing}px`,
      }}
    >
      <Button
        onPress={onScrollToBottom}
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
