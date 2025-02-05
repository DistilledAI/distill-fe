import React, { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
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
  Header?: React.ReactNode
  scrollBottomClassName?: string
  increaseViewportBy?: number
}

const DEFAULT_LIMIT = 20
const DEFAULT_AT_BOTTOM_THRESHOLD = 200

const ChatWindow: React.FC<ChatWindowProps> = ({
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
  Header,
  scrollBottomClassName,
  increaseViewportBy = 100,
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [isScrollBottom, setIsScrollBottom] = useState(false)
  const lastMessageLength = messages?.[messages.length - 1]?.content?.length

  const scrollToBottom = useCallback(() => {
    virtuosoRef.current?.scrollToIndex({
      index: messages.length,
      behavior: "smooth",
      align: style?.paddingBottom === "0px" ? "end" : "center",
    })
  }, [messages.length, style?.paddingBottom])

  useEffect(() => {
    if (chatId) {
      setIsScrollBottom(false)
    }
  }, [chatId])

  useEffect(() => {
    if (!isScrollBottom && lastMessageLength) {
      scrollToBottom()
    }
  }, [scrollToBottom, isScrollBottom, lastMessageLength])

  const handleScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      const shouldLoadMore = scrollTop === 0 && hasPreviousMore

      if (shouldLoadMore) {
        const newMessagesIndex = await onLoadPrevMessages()
        if (newMessagesIndex) {
          virtuosoRef.current?.scrollToIndex({
            index: newMessagesIndex,
            behavior: "auto",
            align: "end",
          })
        }
      }

      setIsScrollBottom(
        scrollHeight - clientHeight - scrollTop > DEFAULT_AT_BOTTOM_THRESHOLD,
      )
    },
    [hasPreviousMore, onLoadPrevMessages, DEFAULT_AT_BOTTOM_THRESHOLD],
  )

  const memoizedItemContent = useCallback(
    (index: number, message: IMessageBox) => (
      <article className={twMerge("px-3 pb-3", msgBoxClassName)}>
        {itemContent(index, message)}
      </article>
    ),
    [itemContent, msgBoxClassName],
  )

  const headerComponent = useMemo(() => {
    if (isFetchingPreviousPage && messages.length >= DEFAULT_LIMIT) {
      return () => (
        <div className="flex h-full items-center justify-center pt-1">
          <DotLoading />
        </div>
      )
    }
    return Header ? () => <div className="pb-4">{Header}</div> : undefined
  }, [isFetchingPreviousPage, messages.length, Header, DEFAULT_LIMIT])

  const emptyStateComponent = useMemo(
    () =>
      isFetched && !messages.length
        ? () => (
            <div className="flex h-full items-center justify-center">
              NO MESSAGE
            </div>
          )
        : undefined,
    [isFetched, messages.length],
  )

  return (
    <div
      className={twMerge(
        "relative h-full overflow-hidden md:max-h-[calc(100%-100px)]",
        isChatActions && "max-h-[calc(100%-56px)] md:max-h-[calc(100%-152px)]",
        className,
      )}
      style={style}
    >
      {!isFetched && <MessagesSkeleton />}

      {!isLoading && messages.length > 0 && (
        <Virtuoso
          ref={virtuosoRef}
          data={messages}
          totalCount={messages.length}
          initialTopMostItemIndex={messages.length - 1}
          increaseViewportBy={increaseViewportBy}
          onScroll={messages.length >= DEFAULT_LIMIT ? handleScroll : undefined}
          computeItemKey={(index) => messages[index]?.id || index}
          components={{
            Header: headerComponent,
            EmptyPlaceholder: emptyStateComponent,
          }}
          followOutput={!isScrollBottom ? "auto" : false}
          alignToBottom={true}
          atBottomThreshold={DEFAULT_AT_BOTTOM_THRESHOLD}
          itemContent={memoizedItemContent}
          style={{ height: "100%" }}
        />
      )}

      <ScrollBottomChat
        scrollBottomClassName={scrollBottomClassName}
        isScrollBottom={isScrollBottom}
        virtuosoRef={virtuosoRef}
      />
    </div>
  )
}

export default ChatWindow
