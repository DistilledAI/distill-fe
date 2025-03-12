import { EMOJI_REACTIONS } from "@pages/AgentDetail/AgentBehaviors/constants"
import { EmojiReactionsMap } from "types/reactions"

export const emojiReactionsMap: EmojiReactionsMap = EMOJI_REACTIONS.reduce(
  (acc, { reactionType, emoji }) => ({ ...acc, [reactionType]: emoji }),
  {} as EmojiReactionsMap,
)

export const replaceAtBrackets = (input: string) => {
  return input?.replace(/\[(.*?)\]/g, "$1")
}
