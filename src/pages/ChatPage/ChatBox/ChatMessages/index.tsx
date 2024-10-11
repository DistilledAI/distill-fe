import ChatWindow from "@components/ChatWindow"
import MoreAction from "@components/ChatWindow/MoreAction"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { RoleUser } from "@constants/index"
import { useChatMessage } from "providers/MessageProvider"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useStyleBoxChat } from "../StyleProvider"
import { IMessageBox, RoleChat } from "./helpers"
import useFetchMessages from "./useFetchMessages"

const TIME_BREAK = 15

const ChatMessages = () => {
  const { messages } = useChatMessage()
  const { loading, onLoadPrevMessages } = useFetchMessages()
  const { chatId } = useParams()
  const { style } = useStyleBoxChat()

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  const getBadgeColor = (role: RoleUser) =>
    role === RoleUser.BOT ? "bg-[#FC0]" : "bg-[#0FE9A4]"

  const getTimeDiff = (date1: string, date2: string): number => {
    const time1 = new Date(date1).getTime()
    const time2 = new Date(date2).getTime()

    return (time1 - time2) / 1000
  }

  const groupedMessages = (
    index: number,
    message: IMessageBox,
    messages: IMessageBox[],
  ) => {
    let groupType = "none"
    const prevMsg = messages[index - 1]
    const nextMsg = messages[index + 1]

    const prevTimeDiff = getTimeDiff(message?.createdAt, prevMsg?.createdAt)
    const nextTimeDiff = getTimeDiff(nextMsg?.createdAt, message?.createdAt)

    if (message.role === RoleChat.OWNER) {
      if (prevMsg && prevMsg.role === RoleChat.OWNER) {
        if (prevTimeDiff < TIME_BREAK) {
          if (
            nextMsg &&
            nextMsg.role === RoleChat.OWNER &&
            nextTimeDiff < TIME_BREAK
          ) {
            groupType = "middle"
          } else {
            groupType = "bottom"
          }
        } else {
          groupType = "top"
          if (
            !nextMsg ||
            nextMsg.role !== message.role ||
            nextTimeDiff > TIME_BREAK
          ) {
            groupType = "none"
          }
        }
      } else {
        groupType =
          nextMsg &&
          nextMsg.role === RoleChat.OWNER &&
          nextTimeDiff < TIME_BREAK
            ? "top"
            : "none"
      }
    }

    const borderRadiusStyle = {
      none: "",
      top: "rounded-t-[20px] rounded-bl-[20px] rounded-br",
      middle: "rounded-tr rounded-br rounded-tl-[20px] rounded-bl-[20px]",
      bottom: "rounded-tr",
    }[groupType]

    const paddingBottomStyle = {
      none: "pb-4",
      top: "pb-[3px]",
      middle: "pb-[3px]",
      bottom: "pb-4",
    }[groupType]

    return {
      borderRadiusStyle,
      paddingBottomStyle,
    }
  }

  const renderMessage = (index: number, message: IMessageBox) => {
    const { paddingBottomStyle, borderRadiusStyle } = groupedMessages(
      index,
      message,
      messages,
    )
    return (
      <>
        <div
          className={twMerge(
            "px-3 pb-4",
            message.role === RoleChat.OWNER && paddingBottomStyle,
          )}
          key={index}
        >
          {message.role === RoleChat.CUSTOMER ? (
            <ReceiverMessage
              avatar={{
                src: message.avatar,
                badgeIcon: getBadgeIcon(message.roleOwner),
                badgeClassName: getBadgeColor(message.roleOwner),
              }}
              content={message.content}
              isTyping={message.isTyping}
            />
          ) : null}
          {message.role === RoleChat.OWNER ? (
            <SenderMessage
              content={message.content}
              baseClassName={twMerge("bg-lgd-code-agent-1", borderRadiusStyle)}
            />
          ) : null}
        </div>
      </>
    )
  }

  return (
    <ChatWindow
      className="border-code-agent-1"
      messages={messages}
      itemContent={renderMessage}
      loading={loading}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={chatId}
      style={style}
      msgBoxClassName="p-0"
      Footer={() => <MoreAction />}
    />
  )
}

export default ChatMessages
