import {
  gnrtAvatar,
  leeQuidAvatar,
  maxAvatar,
  racksAvatar,
} from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import useConversationSocket from "@pages/ChatPage/ChatContainer/useConversationSocket"
import { twMerge } from "tailwind-merge"
import useFetchConversation from "./useFetchConversation"
import ReceiverMessage from "@components/ReceiverMessage"
import ChatWindowV2 from "@components/ChatWindowV2"

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
          index === messages.length - 1 && "pb-32 md:pb-40",
        )}
      >
        <ReceiverMessage
          key={message.id}
          avatar={{
            src: AVATAR[message?.agentName],
            badgeIcon: <FilledBrainAIIcon size={14} />,
            className: "relative max-md:h-6 max-md:w-6",
            badgeClassName:
              "bg-[#FC0] min-w-4 min-h-4 max-md:w-4 max-md:h-4 md:min-w-[18px] md:min-h-[18px]",
            loading: "lazy",
          }}
          content={message.messages}
          isTyping={message.isTyping}
          baseClassName="relative flex gap-3 md:gap-4"
        />
      </div>
    )
  }

  return (
    <ChatWindowV2
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
      className="max-h-[calc(100dvh-250px)] pt-1 md:max-h-[calc(100dvh-135px)]"
      scrollBottomClassName="max-md:fixed !bottom-[11%] h-32 md:h-32 md:!bottom-14"
    />
  )
}

export default AgentsConversation
