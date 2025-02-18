import { useQueryClient } from "@tanstack/react-query"
import { postReactionMsg } from "services/messages"
import { ReactionTypes, EmojiReaction } from "types/reactions"
import {
  chatMessagesKey,
  ICachedMessageData,
  IReactionMsgStats,
} from "@pages/ChatPage/ChatContainer/ChatMessages/useFetchMessages"
import { emojiReactionsMap } from "../helpers"

const useEmojiReactions = (
  groupId: string,
  messageId: number | string,
  initialReactions: IReactionMsgStats[],
) => {
  const queryClient = useQueryClient()

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
        msgId: messageId,
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
              if (msg.id === messageId) {
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
    let updatedReactions = [...initialReactions]
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
      msgId: messageId,
      groupId,
      reactionType: item.reactionType,
    })
  }

  return { handleEmojiReaction }
}

export default useEmojiReactions
