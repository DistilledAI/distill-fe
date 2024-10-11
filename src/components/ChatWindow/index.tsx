import DotLoading from "@components/DotLoading"
import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { useChatMessage } from "providers/MessageProvider"
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"

interface ChatWindowProps {
  messages: Array<IMessageBox>
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  loading?: boolean
  onLoadPrevMessages: (params: {
    offset: number
    limit?: number
  }) => Promise<number> // return index message on loaded or undefined when no more messages
  chatId: string | undefined
  style?: CSSProperties
  msgBoxClassName?: string
  children?: React.ReactNode
  Footer?:
    | React.ComponentType<{
        context?: any
      }>
    | undefined
}

const LIMIT = 20
const AT_BOTTOM_THRESHOLD = 200

const ChatWindow = ({
  messages,
  itemContent,
  className,
  loading,
  chatId,
  onLoadPrevMessages,
  style,
  msgBoxClassName,
  children,
  Footer,
}: ChatWindowProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [offset, setOffset] = useState<number>(LIMIT)
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true)
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)
  const { isNewMsgOnCurrentWindow, setIsNewMsgOnCurrentWindow } =
    useChatMessage()
  const lastMsgIndex = messages.length - 1

  useLayoutEffect(() => {
    if (chatId) {
      setIsScrollBottom(false)
      setHasMoreMessages(true)
      setOffset(LIMIT)
    }
  }, [chatId])

  useEffect(() => {
    if (!isScrollBottom) {
      virtuosoRef.current?.scrollToIndex({
        index: lastMsgIndex,
        behavior: "smooth",
        align: "end",
      })
    }
  }, [lastMsgIndex, isScrollBottom])

  useEffect(() => {
    if (isAtBottom) {
      setIsNewMsgOnCurrentWindow(false)
    }
  }, [isAtBottom])

  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

      if (scrollTop === 0 && !loading && hasMoreMessages) {
        setIsLoadMore(true)
        setIsAtBottom(false)

        const prevMessageIndex = await onLoadPrevMessages({
          offset,
          limit: LIMIT,
        })

        setIsLoadMore(false)

        if (!prevMessageIndex) {
          setHasMoreMessages(false)
        } else {
          setOffset((prev) => prev + LIMIT)
          virtuosoRef.current?.scrollToIndex({
            index: prevMessageIndex,
            behavior: "auto",
          })
        }
      }

      const scrollPosition = scrollHeight - clientHeight - scrollTop
      setIsScrollBottom(scrollPosition > AT_BOTTOM_THRESHOLD)
    },
    [hasMoreMessages, loading, offset, onLoadPrevMessages],
  )

  const onScrollToBottom = () => {
    if (isNewMsgOnCurrentWindow) {
      setIsNewMsgOnCurrentWindow(false)
    }

    virtuosoRef.current?.scrollToIndex({
      index: lastMsgIndex,
      behavior: "smooth",
      align: "end",
    })
  }

  const renderDotLoading = useCallback(
    (className?: string) => (
      <div
        className={twMerge(
          "flex h-full items-center justify-center",
          className,
        )}
      >
        <DotLoading />
      </div>
    ),
    [],
  )

  const memoizedFooter = useMemo(() => Footer, [])

  return (
    <div
      style={style}
      className={twMerge(
        "relative h-full flex-1 overflow-hidden rounded-[22px] border-[2px] border-white bg-mercury-30 p-3 transition-all duration-500 ease-in-out",
        className,
      )}
    >
      {loading && renderDotLoading()}
      {!loading && !messages.length && (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      )}
      {!loading && messages.length ? (
        <Virtuoso
          style={{ height: "100%" }}
          ref={virtuosoRef}
          data={messages}
          initialTopMostItemIndex={{
            index: "LAST",
            align: "end",
          }}
          increaseViewportBy={500}
          onScroll={onScroll}
          components={{
            Header: () => (isLoadMore ? renderDotLoading("my-4") : <></>),
            Footer: memoizedFooter,
          }}
          followOutput={isAtBottom ? "smooth" : false}
          atBottomStateChange={setIsAtBottom}
          atBottomThreshold={AT_BOTTOM_THRESHOLD}
          itemContent={(index, message) => (
            <article
              className={twMerge(
                "px-3 pb-3",
                // lastMsgIndex === index && "mb-3",
                msgBoxClassName,
              )}
              key={index}
            >
              {itemContent(index, message)}
            </article>
          )}
        />
      ) : null}
      {isScrollBottom && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex h-20 w-full items-center justify-center bg-fading-white bg-cover bg-no-repeat">
          <Button
            onClick={onScrollToBottom}
            className={twMerge(
              "w-10 min-w-10 rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2",
              isNewMsgOnCurrentWindow && "w-fit",
            )}
          >
            <div className="rotate-180">
              <ArrowUpFilledIcon />
            </div>
            <span
              className={twMerge(
                "hidden",
                isNewMsgOnCurrentWindow && "block text-mercury-30",
              )}
            >
              New message
            </span>
          </Button>
        </div>
      )}
      {children}
    </div>
  )
}

export default ChatWindow
