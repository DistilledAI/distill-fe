import React, { useCallback, useRef, useState, useMemo } from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import DotLoading from "@components/DotLoading"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import MessagesSkeleton from "@components/ChatWindow/MessagesSkeleton"

interface CmdChatWindowProps {
  messages: any
  itemContent: (index: number, message: any) => JSX.Element
  className?: string
  isLoading?: boolean
  onLoadPrevMessages: () => Promise<number | undefined>
  msgBoxClassName?: string
  isFetched?: boolean
  hasPreviousMore?: boolean
  isFetchingPreviousPage?: boolean
  isChatActions?: boolean
  style?: React.CSSProperties
  increaseViewportBy?: number
}

const LIMIT = 20
const AT_BOTTOM_THRESHOLD = 200

const CmdChatWindow: React.FC<CmdChatWindowProps> = ({
  messages,
  itemContent,
  className,
  isLoading,
  onLoadPrevMessages,
  msgBoxClassName,
  isFetched = false,
  hasPreviousMore,
  isFetchingPreviousPage,
  isChatActions = false,
  style,
  increaseViewportBy = 0,
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)

  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      if (scrollTop === 0 && hasPreviousMore) {
        const messagesIndex = await onLoadPrevMessages()
        if (messagesIndex) {
          virtuosoRef.current?.scrollToIndex({
            index: messagesIndex,
            behavior: "auto",
            align: "end",
          })
        }
      }

      const scrollPosition = scrollHeight - clientHeight - scrollTop
      setIsScrollBottom(scrollPosition > AT_BOTTOM_THRESHOLD)
    },
    [hasPreviousMore, onLoadPrevMessages],
  )

  const renderHeader = useMemo(() => {
    if (isFetchingPreviousPage && messages.length >= LIMIT) {
      return () => (
        <div className="flex h-full items-center justify-center pt-1">
          <DotLoading />
        </div>
      )
    }
    return undefined
  }, [isFetchingPreviousPage, messages.length])

  const renderEmptyPlaceholder = useMemo(() => {
    if (isFetched && !messages.length) {
      return () => (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      )
    }
    return undefined
  }, [isFetched, messages.length])

  const renderRow = useCallback(
    (index: number, message: IMessageBox) => (
      <article
        className={twMerge("px-3 pb-3", msgBoxClassName)}
        key={message?.id || index}
      >
        {itemContent(index, message)}
      </article>
    ),
    [msgBoxClassName, itemContent],
  )

  return (
    <div
      className={twMerge(
        "relative h-full overflow-hidden",
        isChatActions && "max-h-[calc(100%-56px)] md:max-h-[calc(100%-152px)]",
        className,
      )}
      style={style}
    >
      {isLoading && <MessagesSkeleton />}
      {!isLoading && messages.length ? (
        <Virtuoso
          ref={virtuosoRef}
          data={messages}
          totalCount={messages.length}
          initialTopMostItemIndex={messages.length - 1}
          increaseViewportBy={increaseViewportBy}
          onScroll={messages.length >= LIMIT ? onScroll : undefined}
          components={{
            Header: renderHeader,
            EmptyPlaceholder: renderEmptyPlaceholder,
          }}
          followOutput={!isScrollBottom ? "auto" : false}
          atBottomThreshold={AT_BOTTOM_THRESHOLD}
          itemContent={renderRow}
          style={{ height: "100%" }}
        />
      ) : null}
    </div>
  )
}

export default React.memo(CmdChatWindow)
