import React from "react"
import AvatarCustom from "@components/AvatarCustom"
import EmojiReactions from "@components/EmojiReactions"
import { ImageIcon } from "@components/Icons"
import { ArrowsRelyIcon } from "@components/Icons/Arrow"
import MarkdownMessage from "@components/Markdown"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import {
  chatMessagesKey,
  ICachedMessageData,
  IReactionMsgStats,
} from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { isMarkdownImage } from "@utils/index"
import { postReactionMsg } from "services/messages"
import { twMerge } from "tailwind-merge"
import { emojiReactionsMap } from "./helpers"
import { EmojiReaction, ReactionTypes } from "types/reactions"
import { useQueryClient } from "@tanstack/react-query"

interface MessageLiveProps {
  message: IMessageBox
  onReply: () => void
  groupId: string
}

const MessageLive: React.FC<MessageLiveProps> = ({
  message,
  onReply,
  groupId,
}) => {
  const { user } = useAuthState()
  const queryClient = useQueryClient()
  const emojiReactions = message.reactionMsgStats || []

  const isBot = message?.roleOwner === RoleUser.BOT
  const isOwner = user.id === message?.userId

  const findExistingReaction = (
    reactionType: ReactionTypes,
    reactions: IReactionMsgStats[],
  ) => {
    return reactions.find((val) => val.reactionType === reactionType)
  }

  const isLikeOrDislike = (item: EmojiReaction | IReactionMsgStats) => {
    return (
      item.reactionType === ReactionTypes.LIKE ||
      item.reactionType === ReactionTypes.DISLIKE
    )
  }

  const handleOppositeReaction = (
    item: EmojiReaction | IReactionMsgStats,
    reactions: IReactionMsgStats[],
  ) => {
    const oppositeReactionType =
      item.reactionType === ReactionTypes.LIKE
        ? ReactionTypes.DISLIKE
        : ReactionTypes.LIKE

    const oppositeReaction = reactions.find(
      (reaction) => reaction.reactionType === oppositeReactionType,
    )

    if (oppositeReaction && oppositeReaction.isReacted) {
      return updateReaction(oppositeReactionType, false, -1, reactions)
    }

    return reactions
  }

  const toggleReaction = (
    item: EmojiReaction | IReactionMsgStats,
    existingReaction: IReactionMsgStats,
    reactions: IReactionMsgStats[],
  ) => {
    if (existingReaction.isReacted) {
      return updateReaction(item.reactionType, false, -1, reactions)
    } else {
      return updateReaction(item.reactionType, true, 1, reactions)
    }
  }

  const addNewReaction = (
    item: EmojiReaction | IReactionMsgStats,
    reactions: IReactionMsgStats[],
  ) => {
    return updateReaction(item.reactionType, true, 1, reactions)
  }

  const updateReaction = (
    type: ReactionTypes,
    isReacted: boolean,
    delta: number,
    reactions: IReactionMsgStats[],
  ) => {
    const existingIndex = reactions.findIndex(
      (val) => val.reactionType === type,
    )
    if (existingIndex > -1) {
      reactions[existingIndex] = {
        ...reactions[existingIndex],
        total: reactions[existingIndex].total + delta,
        isReacted,
      }
    } else if (delta > 0) {
      reactions.push({
        msgId: message.id,
        reactionType: type,
        total: delta,
        isReacted,
        emoji: emojiReactionsMap[type],
      })
    }
    return reactions
  }

  const updateQueryData = (updatedReactions: IReactionMsgStats[]) => {
    queryClient.setQueryData(
      chatMessagesKey(groupId),
      (oldData: ICachedMessageData | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((msg) => {
              if (msg.id === message.id) {
                return {
                  ...msg,
                  reactionMsgStats: updatedReactions,
                }
              }
              return msg
            }),
          })),
        }
      },
    )
  }

  const handleEmojiReaction = async (
    item: EmojiReaction | IReactionMsgStats,
  ) => {
    let updatedReactions = [...emojiReactions]
    const existingReaction = findExistingReaction(
      item.reactionType,
      updatedReactions,
    )

    if (isLikeOrDislike(item)) {
      updatedReactions = handleOppositeReaction(item, updatedReactions)
    }

    if (existingReaction) {
      updatedReactions = toggleReaction(
        item,
        existingReaction,
        updatedReactions,
      )
    } else {
      updatedReactions = addNewReaction(item, updatedReactions)
    }

    updatedReactions = updatedReactions.filter((val) => val.total > 0)

    updateQueryData(updatedReactions)

    await postReactionMsg({
      msgId: message.id,
      groupId,
      reactionType: item.reactionType,
    })
  }

  return (
    <div className="group/item relative flex gap-3 md:gap-4">
      <div className="absolute -bottom-2 -left-4 -top-2 right-0 hidden rounded-[8px] bg-mercury-70 transition-all duration-100 ease-linear group-hover/item:block">
        <div className="absolute -top-4 right-3 flex items-center gap-2">
          <EmojiReactions onEmojiReaction={handleEmojiReaction} />
          {!isOwner && (
            <button
              type="button"
              onClick={onReply}
              className="flex h-8 items-center gap-1 rounded-full border border-mercury-200 bg-white px-3 py-1 !opacity-100 duration-100 hover:scale-105"
            >
              <ArrowsRelyIcon />
              <span>Reply</span>
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <AvatarCustom
          src={message?.avatar}
          publicAddress={message?.publicAddress}
        />
      </div>
      <div className="relative flex flex-col">
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "line-clamp-1 max-w-[220px]",
              isBot
                ? "bg-lgd-code-hot-ramp bg-clip-text text-base font-bold text-transparent"
                : "text-base-b",
            )}
          >
            {message?.username}
          </p>
          {message.reply && (
            <div className="flex items-center gap-2">
              <p className="line-clamp-1 max-w-[120px] text-15 font-semibold text-brown-500">
                {message.reply.username}
              </p>
              <p className="line-clamp-1 max-w-[200px] text-15 text-mercury-400">
                {isMarkdownImage(message.reply.message) ? (
                  <ImageIcon color="#ADADAD" />
                ) : (
                  message.reply.message
                )}
              </p>
            </div>
          )}
        </div>
        <div
          className="text-base text-mercury-900 aria-selected:italic"
          aria-selected={isBot}
        >
          <MarkdownMessage msg={message?.content} />
          <div className="flex items-center gap-2">
            {emojiReactions.map((item, index) => {
              const emoji = emojiReactionsMap[item.reactionType]

              return (
                <div
                  className={twMerge(
                    "flex h-6 min-w-6 cursor-pointer items-center gap-1 rounded-full border border-mercury-200 bg-white px-3 py-1 !not-italic transition-all duration-300 ease-in-out",
                    item?.isReacted && "border-brown-500 bg-brown-50",
                  )}
                  key={`${item.msgId}-${index}`}
                  onClick={() => handleEmojiReaction(item)}
                >
                  <span className="text-13">{emoji}</span>
                  <span
                    className={twMerge(
                      "text-[13px] font-medium text-mercury-500",
                      item?.isReacted && "text-mercury-800",
                    )}
                  >
                    {item.total}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageLive
