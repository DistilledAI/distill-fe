import React, { useCallback } from "react"
import { twMerge } from "tailwind-merge"
import ChatWindow from "@components/ChatWindow"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import MessageLive from "../MessageLive"

const ListMessage: React.FC<{
  chatId: string
  onReply: (message: IMessageBox) => void
  isCloseLiveChat: boolean
  isClan: boolean
}> = ({ chatId, onReply, isCloseLiveChat, isClan }) => {
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
        <div
          className={twMerge(
            index === 0 && "pt-4",
            isLastMessage && "pb-56 md:pb-0",
          )}
        >
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
    <ChatWindow
      messages={messages}
      itemContent={renderMessage}
      isLoading={isLoading}
      isFetched={isFetched}
      hasPreviousMore={hasPreviousMore}
      isFetchingPreviousPage={isFetchingPreviousPage}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={chatId}
      isChatActions={false}
      msgBoxClassName="p-0 px-4 pb-4"
      className={twMerge(
        "md:max-h-[calc(100%-80px)]",
        isClan && "md:max-h-[calc(100%-130px)]",
      )}
      scrollBottomClassName="max-md:!bottom-[200px] max-md:bg-none"
      increaseViewportBy={800}
    />
  )
}

export default ListMessage
