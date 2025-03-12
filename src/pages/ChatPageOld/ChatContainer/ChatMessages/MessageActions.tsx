import {
  DislikeFillIcon,
  DislikeOutlineIcon,
  LikeFillIcon,
  LikeOutlineIcon,
} from "@components/Icons"
// import { ShareArrowIcon } from "@components/Icons/Share"
import { IReactionMsgStats } from "./useFetchMessages"
import { useEffect, useState } from "react"
import { ReactionTypes } from "types/reactions"
import { postReactionMsg } from "services/messages"

interface Props {
  groupId: string
  messageId: string | number
  reactionMsgStats: IReactionMsgStats[]
}

interface ReactionsState {
  [ReactionTypes.LIKE]: boolean
  [ReactionTypes.DISLIKE]: boolean
}

const btnClassName =
  "h-8 rounded-full border border-mercury-200 bg-white px-3 py-1 transition-all duration-300 ease-in-out hover:scale-105"

const MessageActions: React.FC<Props> = ({
  reactionMsgStats,
  messageId,
  groupId,
}) => {
  const [reactions, setReactions] = useState<ReactionsState>({
    [ReactionTypes.LIKE]: false,
    [ReactionTypes.DISLIKE]: false,
  })

  const isLiked = reactions[ReactionTypes.LIKE]
  const isDisliked = reactions[ReactionTypes.DISLIKE]

  useEffect(() => {
    if (reactionMsgStats.length) {
      const reactionItem = reactionMsgStats.find(
        (item) => item.msgId === messageId,
      )

      if (reactionItem) {
        setReactions((prev) => ({
          ...prev,
          [reactionItem.reactionType]: reactionItem.isReacted,
        }))
      }
    }
  }, [reactionMsgStats, messageId])

  const handleReaction = async (reactionType: ReactionTypes) => {
    const updatedReactions: ReactionsState = {
      [ReactionTypes.LIKE]:
        reactionType === ReactionTypes.LIKE ? !isLiked : false,
      [ReactionTypes.DISLIKE]:
        reactionType === ReactionTypes.DISLIKE ? !isDisliked : false,
    }

    setReactions(updatedReactions)

    await postReactionMsg({
      msgId: messageId,
      groupId,
      reactionType,
    })
  }

  return (
    <div className="absolute inset-0 bottom-3 hidden rounded-[22px] bg-mercury-70 transition-all duration-300 ease-in-out group-hover/item:block">
      <div className="absolute -bottom-4 right-4 flex items-center gap-2">
        {/* <button type="button" className={btnClassName}>
        <ShareArrowIcon size={20} />
      </button> */}
        <button
          type="button"
          className={btnClassName}
          onClick={() => handleReaction(ReactionTypes.LIKE)}
        >
          {!isLiked ? (
            <LikeOutlineIcon size={20} />
          ) : (
            <LikeFillIcon size={20} color="#363636" />
          )}
        </button>
        <button
          type="button"
          className={btnClassName}
          onClick={() => handleReaction(ReactionTypes.DISLIKE)}
        >
          {!isDisliked ? (
            <DislikeOutlineIcon size={20} />
          ) : (
            <DislikeFillIcon size={20} color="#363636" />
          )}
        </button>
      </div>
    </div>
  )
}

export default MessageActions
