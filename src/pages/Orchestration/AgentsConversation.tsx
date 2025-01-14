import AvatarCustom from "@components/AvatarCustom"
import ChatWindow from "@components/ChatWindow"
import MarkdownMessage from "@components/Markdown"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { twMerge } from "tailwind-merge"
import useFetchConversation from "./useFetchConversation"

const AgentsConversation = () => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
    groupId,
  } = useFetchConversation()

  // const conversationDetail = ORCHESTRATION_LIST.find(item => item.conversationId = )

  const renderMessage = (index: number, message: IMessageBox) => {
    return (
      <div
        className={twMerge(
          "p-4 pt-0",
          index === 0 && "pt-4",
          index === messages.length - 1 && "pb-40",
        )}
      >
        <div className="group/item relative flex gap-3 md:gap-4">
          <AvatarCustom
            key={message.id}
            src={message?.avatar}
            publicAddress={message?.publicAddress}
            className="relative"
            loading="lazy"
          />
          <div className="relative flex flex-1 flex-col">
            <MarkdownMessage msg={message?.messages} />
          </div>
        </div>
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
      msgBoxClassName="p-0 "
      className="pt-4 md:max-h-full"
      scrollBottomClassName="md:!bottom-10 h-40"
    />
  )
}

export default AgentsConversation
