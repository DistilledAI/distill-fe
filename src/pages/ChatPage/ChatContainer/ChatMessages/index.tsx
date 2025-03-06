import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { CLEAR_CACHED_MESSAGE, PATH_NAMES, RoleUser } from "@constants/index"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"
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
import { useCallback, useEffect, useMemo } from "react"
import ChatWindowV2 from "@components/ChatWindowV2"
import { useNavigate } from "react-router-dom"
// import MessageActions from "./MessageActions"

const ChatMessages = () => {
  const navigate = useNavigate()
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
    error: errorMessages,
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

  useEffect(() => {
    if (errorMessages) {
      navigate(PATH_NAMES.PRIVATE_AGENT)
    }
  }, [errorMessages])

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
            "relative mx-auto w-full max-w-[768px] rounded-[22px] p-3",
            isOwner && `${paddingBottomStyle} relative`,
            isCustomer && "group/item pb-6",
          )}
        >
          {isCustomer && (
            <>
              {/* <MessageActions
                groupId={groupId}
                messageId={message.id}
                reactionMsgStats={message.reactionMsgStats || []}
              /> */}
              <ReceiverMessage
                avatar={{
                  src: message.avatar,
                  badgeIcon: getBadgeIcon(message.roleOwner),
                  badgeClassName: getBadgeColor(message.roleOwner),
                  publicAddress: message.publicAddress,
                }}
                content={message.content}
                isTyping={message.isTyping}
                baseClassName="relative"
              />
            </>
          )}
          {isOwner && (
            <SenderMessage
              content={message.content}
              baseClassName={twMerge(bgColor, borderRadiusStyle)}
            />
          )}
        </div>
      )
    },
    [messages, textColor, bgColor],
  )

  return (
    <>
      <AgentInfoCard messages={messages} groupId={groupId} />

      <ChatWindowV2
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={groupId}
        className="h-[calc(100dvh-262px)] max-h-full md:h-dvh md:max-h-[calc(100%-260px)]"
        msgBoxClassName="p-0 md:px-4 "
        style={{
          paddingBottom: `${spacing}px`,
        }}
        isChatActions={true}
      />
      <ChatActions
        isClearContextBtn={!isOwner}
        isDelegateBtn={false}
        className="fixed bottom-0 justify-end md:absolute md:bottom-3"
      />
    </>
  )
}

export default ChatMessages
