import { IReactionMsgStats } from "@pages/ChatPageOld/ChatContainer/ChatMessages/useFetchMessages"
import React from "react"
import { twMerge } from "tailwind-merge"
import { EmojiReaction } from "types/reactions"

interface ReactedEmojisListProps {
  emojiReactions: IReactionMsgStats[]
  emojiReactionsMap: Record<string, string>
  handleEmojiReaction: (item: EmojiReaction | IReactionMsgStats) => void
}

const ReactedEmojisList: React.FC<ReactedEmojisListProps> = ({
  emojiReactions,
  emojiReactionsMap,
  handleEmojiReaction,
}) => {
  if (!emojiReactions.length) return null

  return (
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
            <span className="text-[13px]">{emoji}</span>
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
  )
}

export default ReactedEmojisList
