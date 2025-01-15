import {
  gnrtAvatar,
  leeQuidAvatar,
  maxAvatar,
  racksAvatar,
} from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import ChatWindow from "@components/ChatWindow"
import MarkdownMessage from "@components/Markdown"
import useConversationSocket from "@pages/ChatPage/ChatBox/useConversationSocket"
import { twMerge } from "tailwind-merge"
import useFetchConversation from "./useFetchConversation"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"

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
          "p-4 pb-6 pt-0",
          index === 0 && "pt-6",
          index === messages.length - 1 && "pb-40",
        )}
      >
        <div className="group/item relative flex gap-3 md:gap-4">
          <AvatarCustom
            key={message.id}
            src={AVATAR[message?.agentName]}
            publicAddress={message?.publicAddress}
            className="relative"
            loading="lazy"
            badgeIcon={<FilledBrainAIIcon size={14} />}
            badgeClassName="bg-[#FC0] w-[18px] h-[18px]"
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
      className="pt-4 md:max-h-[96%]"
      scrollBottomClassName="md:!bottom-24 h-40"
    />
  )
}

export default AgentsConversation
