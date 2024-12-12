import ChatWindow from "@components/ChatWindow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { CLEAR_CACHED_MESSAGE, RoleUser } from "@constants/index"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { getActiveColorRandomById } from "@utils/index"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { twMerge } from "tailwind-merge"
import ChatActions from "./ChatActions"
import {
  getBadgeColor,
  groupedMessages,
  IMessageBox,
  RoleChat,
} from "./helpers"
import useFetchMessages from "./useFetchMessages"
import AgentInfoCard from "./AgentInfoCard"
import ContextCleared from "@components/ContextCleared"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "@hooks/useAuthState"
import { useCallback, useMemo } from "react"

const ChatMessages = () => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
  } = useFetchMessages()
  const { chatId: groupId } = useGetChatId()
  const { bgColor, textColor } = getActiveColorRandomById(groupId)
  const { spacing } = useStyleSpacing()
  const { user, isLogin } = useAuthState()
  const { data: groupDetailData, isFetched: isGroupDetailFetched } =
    useQuery<any>({
      queryKey: [QueryDataKeys.GROUP_DETAIL, groupId?.toString()],
      enabled: !!groupId && isLogin,
    })

  const userBId = groupDetailData?.data?.group?.userBId
  const isOwner = useMemo(() => {
    return !isGroupDetailFetched && isLogin ? true : userBId === user?.id
  }, [isGroupDetailFetched, userBId, user?.id, isLogin])

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  const renderMessage = useCallback(
    (index: number, message: IMessageBox) => {
      const { paddingBottomStyle, borderRadiusStyle } = groupedMessages(
        index,
        message,
        messages,
      )

      if (message.content === CLEAR_CACHED_MESSAGE) {
        return (
          <ContextCleared
            wrapperClassName={twMerge(
              "max-w-[768px] mx-auto pb-4 px-3 md:px-0",
              messages.length - 1 === index && "pb-10",
            )}
            textClassName={textColor}
          />
        )
      }

      const isOwner = message.role === RoleChat.OWNER
      const isCustomer = message.role === RoleChat.CUSTOMER

      return (
        <div
          className={twMerge(
            "relative mx-auto w-full max-w-[768px] rounded-[22px] px-3 pb-4",
            isOwner && paddingBottomStyle,
          )}
          key={index}
        >
          {isCustomer && (
            <ReceiverMessage
              avatar={{
                src: message.avatar,
                badgeIcon: getBadgeIcon(message.roleOwner),
                badgeClassName: getBadgeColor(message.roleOwner),
                publicAddress: message.publicAddress,
              }}
              content={message.content}
              isTyping={message.isTyping}
            />
          )}
          {isOwner && (
            <SenderMessage
              content={message.content}
              baseClassName={twMerge(bgColor, borderRadiusStyle)}
            />
          )}
          {/* <div className="absolute -bottom-4 right-4 flex items-center gap-2">
            <button
              type="button"
              className="h-8 rounded-full border border-mercury-200 bg-white px-3 py-1 transition-all duration-300 ease-in-out hover:scale-105"
            >
              <ShareArrowIcon size={20} />
            </button>
            <button
              type="button"
              className="h-8 rounded-full border border-mercury-200 bg-white px-3 py-1 transition-all duration-300 ease-in-out hover:scale-105"
            >
              <LikeOutlineIcon size={20} />
            </button>
            <button
              type="button"
              className="h-8 rounded-full border border-mercury-200 bg-white px-3 py-1 transition-all duration-300 ease-in-out hover:scale-105"
            >
              <DislikeOutlineIcon size={20} />
            </button>
          </div> */}
        </div>
      )
    },
    [messages, textColor, bgColor],
  )

  return (
    <>
      <ChatWindow
        Header={<AgentInfoCard messages={messages} groupId={groupId} />}
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={groupId}
        msgBoxClassName="p-0 md:px-4"
        style={{
          paddingBottom: `${spacing}px`,
        }}
        isChatActions={true}
        increaseViewportBy={2000}
      />
      <ChatActions isClearContextBtn={!isOwner} isDelegateBtn={isOwner} />
    </>
  )
}

export default ChatMessages
