import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  UIEvent,
  useLayoutEffect,
} from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { twMerge } from "tailwind-merge"
import MessagesSkeleton from "./MessagesSkeleton"
import DotLoading from "@components/DotLoading"
import ScrollBottomChat from "./ScrollBottomChat"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"

interface ChatWindowProps {
  messages: IMessageBox[]
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  isLoading?: boolean
  onLoadPrevMessages: () => Promise<number | undefined>
  chatId: string | undefined
  msgBoxClassName?: string
  isFetched?: boolean
  hasPreviousMore?: boolean
  isFetchingPreviousPage?: boolean
  isChatActions?: boolean
  style?: React.CSSProperties
  scrollBottomClassName?: string
}

const DEFAULT_LIMIT = 20
const DEFAULT_AT_BOTTOM_THRESHOLD = 200

const ChatWindowV2: React.FC<ChatWindowProps> = ({
  messages,
  itemContent,
  className,
  isLoading,
  chatId,
  onLoadPrevMessages,
  msgBoxClassName,
  isFetched = false,
  hasPreviousMore,
  isFetchingPreviousPage,
  isChatActions = false,
  style,
  scrollBottomClassName,
}) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [isScrollBottom, setIsScrollBottom] = useState(true)
  const lastMessageLength = messages?.[messages.length - 1]?.content?.length
  const previousMessagesLength = useRef(messages.length)

  const showHeader = isFetchingPreviousPage && messages.length >= DEFAULT_LIMIT
  const itemCount = showHeader ? messages.length + 1 : messages.length

  const virtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
    getItemKey: useCallback(
      (index: number) => {
        if (showHeader && index === 0) return "header"
        const adjIndex = showHeader ? index - 1 : index
        return messages[adjIndex]?.id || index
      },
      [messages, showHeader],
    ),
  })

  const virtualItems = virtualizer.getVirtualItems()

  const handleScroll = useCallback(
    async (e: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      const isNearBottom =
        scrollHeight - clientHeight - scrollTop <= DEFAULT_AT_BOTTOM_THRESHOLD
      setIsScrollBottom(!isNearBottom)

      if (scrollTop === 0 && hasPreviousMore) {
        const newMessagesIndex = await onLoadPrevMessages()
        if (newMessagesIndex) {
          virtualizer.scrollToIndex(newMessagesIndex, {
            align: "end",
            behavior: "auto",
          })
        }
      }
    },
    [hasPreviousMore, onLoadPrevMessages, virtualizer],
  )

  useEffect(() => {
    if (!isScrollBottom && lastMessageLength && virtualizer) {
      virtualizer.scrollToIndex(messages.length - 1, {
        align: "end",
        behavior: "auto",
      })
    }
  }, [lastMessageLength, isScrollBottom, messages.length, virtualizer])

  useLayoutEffect(() => {
    if (chatId) {
      setIsScrollBottom(false)
    }
  }, [chatId])

  useEffect(() => {
    if (previousMessagesLength.current < messages.length) {
      const newItemsCount = messages.length - previousMessagesLength.current
      const newItemsHeight = virtualItems
        .slice(0, newItemsCount)
        .reduce((sum, item) => sum + item.size, 0)

      if (parentRef.current) {
        parentRef.current.scrollTop += newItemsHeight
      }
    }
    previousMessagesLength.current = messages.length
  }, [messages.length, virtualItems])

  const renderItem = useCallback(
    (virtualItem: any) => {
      if (showHeader && virtualItem.index === 0) {
        return (
          <div
            key="header"
            ref={virtualizer.measureElement}
            data-index={virtualItem.index}
            className="absolute left-0 top-0 flex h-fit w-full items-center justify-center pt-1"
          >
            <DotLoading />
          </div>
        )
      }

      const messageIndex = showHeader
        ? virtualItem.index - 1
        : virtualItem.index
      const message = messages[messageIndex]

      return (
        <div
          key={message.id}
          ref={virtualizer.measureElement}
          data-index={virtualItem.index}
          className={twMerge("p-3 md:px-4", msgBoxClassName)}
          style={{
            position: "absolute",
            top: virtualItem.start,
            left: 0,
            width: "100%",
            minHeight: 72,
          }}
        >
          {itemContent(messageIndex, message)}
        </div>
      )
    },
    [showHeader, messages, msgBoxClassName, virtualizer],
  )

  const emptyState = useMemo(
    () =>
      isFetched && !messages.length ? (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      ) : null,
    [isFetched, messages.length],
  )

  return (
    <div
      className={twMerge(
        "relative h-full overflow-y-auto md:max-h-[calc(100%-100px)]",
        isChatActions && "max-h-[calc(100%-56px)] md:max-h-[calc(100%-152px)]",
        className,
        !isScrollBottom && "md:scroll-smooth",
      )}
      style={style}
      ref={parentRef}
      onScroll={messages.length >= DEFAULT_LIMIT ? handleScroll : undefined}
    >
      {!isFetched && <MessagesSkeleton />}

      {!isLoading && messages.length > 0 && (
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualItems.map(renderItem)}
        </div>
      )}

      {emptyState}

      <ScrollBottomChat
        scrollBottomClassName={scrollBottomClassName}
        isScrollBottom={isScrollBottom}
        onClick={() => {
          virtualizer.scrollToIndex(messages.length - 1, {
            align: "end",
            behavior: "auto",
          })

          if (parentRef.current) {
            parentRef.current.scrollTop = parentRef.current.scrollHeight
          }
          setIsScrollBottom(false)
        }}
      />
    </div>
  )
}

export default ChatWindowV2
