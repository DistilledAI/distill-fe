import { MoodSmileIcon } from "@components/Icons/Emoji"
import useOutsideClick from "@hooks/useOutSideClick"
import { useDisclosure } from "@nextui-org/react"
import { EMOJI_REACTIONS } from "@pages/AgentDetail/AgentBehaviors/constants"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"
import { EmojiReaction } from "types/reactions"

interface EmojiReactionsProps {
  onEmojiReaction: (item: EmojiReaction) => void
}

const EmojiReactions = ({ onEmojiReaction }: EmojiReactionsProps) => {
  const reactionRef = useRef(null)
  const { isOpen, onOpenChange, onClose } = useDisclosure()
  useOutsideClick(reactionRef, onClose)

  return (
    <div className="flex items-center gap-2" ref={reactionRef}>
      <ul
        className={twMerge(
          "hidden h-8 items-center justify-center gap-2 rounded-full border border-mercury-200 bg-white px-2 py-1",
          isOpen && "flex",
        )}
      >
        {EMOJI_REACTIONS.map((item: EmojiReaction) => (
          <li
            key={item.reactionType}
            onClick={() => {
              onEmojiReaction(item)
              onClose()
            }}
            className="cursor-pointer text-14"
          >
            {item.emoji}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onOpenChange}
        className={twMerge(
          "flex h-8 items-center gap-1 rounded-full border border-mercury-200 bg-white px-2 py-1 !opacity-100 duration-300 hover:scale-105",
          isOpen && "border-mercury-300 bg-mercury-100",
        )}
      >
        <MoodSmileIcon />
      </button>
    </div>
  )
}

export default EmojiReactions
