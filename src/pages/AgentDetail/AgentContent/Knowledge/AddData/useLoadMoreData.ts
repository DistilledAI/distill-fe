import { useEffect, useRef } from "react"

interface UseInfiniteScrollProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  threshold?: number
}

const useLoadDataInfinite = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 50,
}: UseInfiniteScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer || !hasNextPage || isFetchingNextPage) return

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        fetchNextPage()
      }
    }

    const scrollElement = scrollContainerRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, threshold])

  return scrollContainerRef
}

export default useLoadDataInfinite
