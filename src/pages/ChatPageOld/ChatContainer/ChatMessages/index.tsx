import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { CLEAR_CACHED_MESSAGE, PATH_NAMES, RoleUser } from "@constants/index"
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
import useAuthState from "@hooks/useAuthState"
import { useEffect } from "react"
import ChatWindowV2 from "@components/ChatWindowV2"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import useGroupDetail from "@pages/ChatPageOld/hooks/useGroupDetail"
import DynamicTitleMeta from "@components/DynamicTitleMeta"

interface MessageItemProps {
  message: IMessageBox
  index: number
  messages: IMessageBox[]
  textColor: string
  bgColor: string
}

const MessageItem = ({
  message,
  index,
  messages,
  textColor,
  bgColor,
}: MessageItemProps) => {
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
  const badgeIcon =
    message.roleOwner === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  return (
    <div
      className={twMerge(
        "relative mx-auto w-full max-w-[768px] rounded-[22px] p-3",
        isOwner && `${paddingBottomStyle} relative`,
        isCustomer && "group/item pb-6",
      )}
    >
      {isCustomer && (
        <ReceiverMessage
          avatar={{
            src: message.avatar,
            badgeIcon,
            badgeClassName: getBadgeColor(message.roleOwner),
            publicAddress: message.publicAddress,
          }}
          content={message.content}
          isTyping={message.isTyping}
          baseClassName="relative"
        />
      )}
      {isOwner && (
        <SenderMessage
          content={message.content}
          baseClassName={twMerge(bgColor, borderRadiusStyle)}
        />
      )}
    </div>
  )
}

const ChatMessages = () => {
  const navigate = useNavigate()
  const { chatId: groupId = "" } = useParams()
  const { bgColor, textColor } = getActiveColorRandomById(groupId)
  const { spacing } = useStyleSpacing()
  const { user, isLogin } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
    error,
  } = useFetchMessages(groupId)

  const { groupDetail, isFetched: isGroupDetailFetched } =
    useGroupDetail(groupId)

  const userB = groupDetail?.group?.userB
  const userBId = userB?.id
  const isOwner = !isGroupDetailFetched && isLogin ? true : userBId === user?.id
  const isMyAgent = myAgent?.id === userBId

  useEffect(() => {
    if (error) navigate(PATH_NAMES.PRIVATE_AGENT)
  }, [error, navigate])

  const adjustedMessages: IMessageBox[] = [
    { id: "agent-info" } as IMessageBox,
    ...messages,
  ]

  const renderMessage = (index: number) => {
    if (index === 0) {
      return (
        <div className="mx-auto h-fit w-full max-w-[768px] md:px-3">
          <AgentInfoCard
            messages={messages}
            groupId={groupId}
            isLoading={isLoading}
          />
        </div>
      )
    }
    const message = messages[index - 1]
    return (
      <MessageItem
        message={message}
        index={index - 1}
        messages={messages}
        textColor={textColor}
        bgColor={bgColor}
      />
    )
  }

  const pageTitleMeta =
    userB?.role === RoleUser.BOT && userB?.username
      ? `Agent ${userB?.username} - Private Chat`
      : ""

  return (
    <>
      <DynamicTitleMeta title={pageTitleMeta} />
      <ChatWindowV2
        messages={adjustedMessages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={groupId}
        className="h-[calc(100dvh-146px)] max-h-full md:h-full md:max-h-[calc(100%-136px)]"
        msgBoxClassName="p-0 md:px-4"
        style={{ paddingBottom: `${spacing}px` }}
        isChatActions
        scrollBottomClassName="bottom-0"
      />
      <ChatActions
        isClearContextBtn={!isOwner}
        isDelegateBtn={isMyAgent}
        className="fixed bottom-1 md:absolute md:bottom-3"
      />
    </>
  )
}

export default ChatMessages
