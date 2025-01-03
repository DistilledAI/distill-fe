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

const LIMIT = 20
const AT_BOTTOM_THRESHOLD = 200

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
  increaseViewportBy = 0,
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)
  const lastMessageLength = messages?.[messages.length - 1]?.content.length

  const scrollToBottom = useCallback(() => {
    virtuosoRef.current?.scrollToIndex({
      index: messages.length - 1,
      behavior: "auto",
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
    if (Header) {
      return () => <div className="pb-4">{Header}</div>
    }
    return undefined
  }, [isFetchingPreviousPage, messages.length, Header])

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
        "relative h-full overflow-hidden md:max-h-[calc(100%-100px)]",
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
      <ScrollBottomChat
        scrollBottomClassName={scrollBottomClassName}
        isScrollBottom={isScrollBottom}
        virtuosoRef={virtuosoRef}
      />
    </div>
  )
}

export default React.memo(ChatWindow)
