import {
  gnrtAvatar,
  leeQuidAvatar,
  maxAvatar,
  racksAvatar,
} from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import ChatWindow from "@components/ChatWindow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import MarkdownMessage from "@components/Markdown"
import useConversationSocket from "@pages/ChatPage/ChatBox/useConversationSocket"
import { twMerge } from "tailwind-merge"
import useFetchConversation from "./useFetchConversation"

const AgentsConversation = () => {
  useConversationSocket()

  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
    groupId,
  } = useFetchConversation()

  const AVATAR = {
    [`Lee Quid`]: leeQuidAvatar,
    ["Max"]: maxAvatar,
    ["BlackRack"]: racksAvatar,
    ["GNRT"]: gnrtAvatar,
  } as any

  const renderMessage = (index: number, message: any) => {
    return (
      <div
        className={twMerge(
          "p-4 pb-5 pt-0",
          index === 0 && "pt-6",
          index === messages.length - 1 && "pb-40",
        )}
      >
        <div className="relative flex gap-3 md:gap-4">
          <AvatarCustom
            key={message.id}
            src={AVATAR[message?.agentName]}
            publicAddress={message?.publicAddress}
            loading="lazy"
            badgeIcon={<FilledBrainAIIcon size={14} />}
            className="relative max-md:h-6 max-md:w-6"
            badgeClassName="bg-[#FC0] min-w-4 min-h-4 max-md:w-4 max-md:h-4 md:min-w-[18px] md:min-h-[18px]"
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
      className="max-h-[calc(100dvh-280px)] pt-4 md:max-h-[96%]"
      scrollBottomClassName="max-md:fixed !bottom-[11.7%] h-32 md:h-40 md:!bottom-24"
      increaseViewportBy={1000}
    />
  )
}

export default AgentsConversation
