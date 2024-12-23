import ChatWindow from "@components/ChatWindow"
import MessageLive from "@pages/ChatBoxLive/MessageLive"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { twMerge } from "tailwind-merge"

const AgentsConversation = () => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
    groupId,
  } = useFetchMessages()

  const renderMessage = (index: number, message: IMessageBox) => {
    return (
      <div
        className={twMerge(
          "p-4 pt-0",
          index === 0 && "pt-4",
          index === messages.length - 1 && "pb-40",
        )}
      >
        <MessageLive
          key={index}
          message={message}
          // onReply={() => onReply(message)}
          groupId={groupId}
        />
      </div>
    )
  }

  return (
    <ChatWindow
      messages={messages}
      itemContent={renderMessage}
      isLoading={isLoading}
      isFetched={isFetched}
      hasPreviousMore={hasPreviousMore}
      isFetchingPreviousPage={isFetchingPreviousPage}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={groupId}
      isChatActions={false}
      msgBoxClassName="p-0"
      className="md:max-h-full"
      scrollBottomClassName="md:!bottom-10 h-40"
    />
  )
}

export default AgentsConversation
