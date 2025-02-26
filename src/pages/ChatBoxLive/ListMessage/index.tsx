import React, { useCallback } from "react"
import { twMerge } from "tailwind-merge"
import { IMessageBox } from "@pages/ChatPage/ChatContainer/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatContainer/ChatMessages/useFetchMessages"
import MessageLive from "../MessageLive"
import ChatWindowV2 from "@components/ChatWindowV2"

interface ListMessageProps {
  chatId: string
  onReply: (message: IMessageBox) => void
  isCloseLiveChat: boolean
  isClan: boolean
}

const ListMessage: React.FC<ListMessageProps> = ({
  chatId,
  onReply,
  isCloseLiveChat,
  isClan,
}) => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
  } = useFetchMessages()

  const renderMessage = useCallback(
    (index: number, message: IMessageBox) => {
      const isLastMessage = index === messages.length - 1
      return (
        <div className={twMerge(isLastMessage && "pb-[112px] md:pb-0")}>
          <MessageLive
            message={message}
            onReply={() => onReply(message)}
            groupId={chatId}
          />
        </div>
      )
    },
    [messages, chatId, onReply],
  )

  if (isCloseLiveChat) return null

  return (
    <ChatWindowV2
      messages={messages}
      itemContent={renderMessage}
      isLoading={isLoading}
      isFetched={isFetched}
      hasPreviousMore={hasPreviousMore}
      isFetchingPreviousPage={isFetchingPreviousPage}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={chatId}
      isChatActions={false}
      className={twMerge(
        "md:max-h-[calc(100%-80px)]",
        isClan && "md:max-h-[calc(100%-130px)]",
      )}
      scrollBottomClassName="max-md:!bottom-[98px] max-md:bg-none"
    />
  )
}

export default ListMessage
