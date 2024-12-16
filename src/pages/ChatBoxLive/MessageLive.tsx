import React, { useEffect } from "react"
import AvatarCustom from "@components/AvatarCustom"
import EmojiReactions from "@components/EmojiReactions"
import { ImageIcon } from "@components/Icons"
import { ArrowsRelyIcon } from "@components/Icons/Arrow"
import MarkdownMessage from "@components/Markdown"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { IReactionMsgStats } from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { isMarkdownImage } from "@utils/index"
import { postReactionMsg } from "services/messages"
import { twMerge } from "tailwind-merge"
import { emojiReactionsMap } from "./helpers"
import { EmojiReaction, ReactionTypes } from "types/reactions"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

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
  const { data: emojiReactions = [] } = useQuery<IReactionMsgStats[]>({
    queryKey: [QueryDataKeys.MESSAGE_EMOJI_REACTIONS, message.id],
    initialData: [],
    enabled: !!message.id,
  })

  const isBot = message?.roleOwner === RoleUser.BOT
  const isOwner = user.id === message?.userId

  useEffect(() => {
    if (message.reactionMsgStats?.length) {
      queryClient.setQueryData(
        [QueryDataKeys.MESSAGE_EMOJI_REACTIONS, message.id],
        (oldData: IReactionMsgStats[] | undefined) => {
          const newReactions: IReactionMsgStats[] =
            message.reactionMsgStats || []

          const mergedReactions = newReactions.map((newReaction) => {
            const existingReaction = oldData?.find(
              (old) => old.reactionType === newReaction.reactionType,
            )
            return {
              ...newReaction,
              total: existingReaction?.total || newReaction.total,
              isReacted: existingReaction?.isReacted || newReaction.isReacted,
            }
          })

          return mergedReactions
        },
      )
    }
  }, [message.reactionMsgStats, message.id, queryClient])

  const handleEmojiReaction = async (
    item: EmojiReaction | IReactionMsgStats,
  ) => {
    const existingReaction = emojiReactions.find(
      (val) => val.reactionType === item.reactionType,
    )

    let updatedReactions = [...emojiReactions]
    const emoji = emojiReactionsMap[item.reactionType]

    const updateReaction = (
      type: ReactionTypes,
      isReacted: boolean,
      delta: number,
    ) => {
      const existingIndex = updatedReactions.findIndex(
        (val) => val.reactionType === type,
      )
      if (existingIndex > -1) {
        updatedReactions[existingIndex] = {
          ...updatedReactions[existingIndex],
          total: updatedReactions[existingIndex].total + delta,
          isReacted,
        }
      } else if (delta > 0) {
        updatedReactions.push({
          msgId: message.id,
          reactionType: type,
          total: delta,
          isReacted,
          emoji,
        })
      }
      updatedReactions = updatedReactions.filter((val) => val.total > 0)
    }

    if (existingReaction) {
      // Toggle reaction
      if (existingReaction.isReacted) {
        updateReaction(item.reactionType, false, -1)
      } else {
        if (item.reactionType === ReactionTypes.LIKE) {
          const isDisliked = updatedReactions.some(
            (val) =>
              val.reactionType === ReactionTypes.DISLIKE && val.isReacted,
          )
          if (isDisliked) {
            updateReaction(ReactionTypes.DISLIKE, false, -1)
          }
          updateReaction(ReactionTypes.LIKE, true, 1)
        } else if (item.reactionType === ReactionTypes.DISLIKE) {
          const isLiked = updatedReactions.some(
            (val) => val.reactionType === ReactionTypes.LIKE && val.isReacted,
          )
          if (isLiked) {
            updateReaction(ReactionTypes.LIKE, false, -1)
          }
          updateReaction(ReactionTypes.DISLIKE, true, 1)
        } else {
          updateReaction(item.reactionType, true, 1)
        }
      }
    } else {
      // Add new reaction
      updateReaction(item.reactionType, true, 1)
    }

    queryClient.setQueryData(
      [QueryDataKeys.MESSAGE_EMOJI_REACTIONS, message.id],
      () => updatedReactions,
    )

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
