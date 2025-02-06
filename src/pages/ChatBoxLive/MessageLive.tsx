import React, { useMemo, memo } from "react"
import AvatarCustom from "@components/AvatarCustom"
import EmojiReactions from "@components/EmojiReactions"
import { ImageIcon } from "@components/Icons"
import { ArrowsRelyIcon } from "@components/Icons/Arrow"
import MarkdownMessage from "@components/Markdown"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { isMarkdownImage } from "@utils/index"
import { twMerge } from "tailwind-merge"
import { emojiReactionsMap, replaceAtBrackets } from "./helpers"
import useEmojiReactions from "./hooks/useEmojiReactions"
import ReactedEmojisList from "./ReactedEmojisList"
import DotLoading from "@components/DotLoading"

interface MessageLiveProps {
  message: IMessageBox
  onReply?: () => void
  groupId: string
}

const MessageLive: React.FC<MessageLiveProps> = ({
  message,
  onReply,
  groupId,
}) => {
  const { user } = useAuthState()
  const { handleEmojiReaction } = useEmojiReactions(
    groupId,
    message?.id,
    message?.reactionMsgStats || [],
  )

  const emojiReactions = message?.reactionMsgStats || []
  const isBot = message?.roleOwner === RoleUser.BOT
  const isOwner = user.id === message?.userId

  const renderReplyButton = useMemo(() => {
    if (isOwner || !onReply) return null

    return (
      <button
        type="button"
        onClick={onReply}
        className="group/button relative flex h-8 items-center gap-[2px] rounded-full border border-mercury-200 bg-white px-2 py-1 !opacity-100 duration-100 hover:scale-105"
      >
        <ArrowsRelyIcon size={20} />
        <div className="absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded-xl bg-mercury-950 px-2 py-1 text-14 font-medium text-white group-hover/button:block">
          Reply
        </div>
        <div className="absolute -top-[11px] left-1/2 z-[-1] hidden h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-mercury-950 group-hover/button:block" />
      </button>
    )
  }, [isOwner, onReply])

  return (
    <div className="group/item relative flex gap-3 md:gap-4">
      <div className="absolute -bottom-2 -left-4 -top-2 right-0 hidden rounded-[8px] bg-mercury-70 group-hover/item:block">
        <div className="absolute -top-4 right-3 z-10 flex items-center gap-2">
          <EmojiReactions onEmojiReaction={handleEmojiReaction} />
          {renderReplyButton}
        </div>
      </div>
      <AvatarCustom
        key={message?.id}
        src={message?.avatar}
        publicAddress={message?.publicAddress}
        className="relative"
        loading="lazy"
      />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "line-clamp-1 max-w-[220px] text-[16px] font-bold",
              isBot && "bg-lgd-code-hot-ramp bg-clip-text text-transparent",
            )}
          >
            {message?.username}
          </p>
          {message?.reply && (
            <div className="flex items-center gap-2">
              <p className="line-clamp-1 max-w-[120px] text-15 font-semibold text-brown-500">
                {replaceAtBrackets(message?.reply?.username)}
              </p>
              <p className="line-clamp-1 max-w-[200px] text-15 text-mercury-400">
                {isMarkdownImage(message?.reply?.message) ? (
                  <ImageIcon color="#ADADAD" />
                ) : (
                  message?.reply?.message
                )}
              </p>
            </div>
          )}
        </div>
        <div
          className={twMerge("text-[16px] text-mercury-900", isBot && "italic")}
        >
          {message?.isTyping ? (
            <DotLoading className="mt-1" />
          ) : (
            <MarkdownMessage msg={message?.content} />
          )}
          <ReactedEmojisList
            emojiReactions={emojiReactions}
            emojiReactionsMap={emojiReactionsMap}
            handleEmojiReaction={handleEmojiReaction}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(MessageLive)
