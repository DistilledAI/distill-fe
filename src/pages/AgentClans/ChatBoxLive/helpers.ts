import { EMOJI_REACTIONS } from "@pages/AgentDetail/AgentBehaviors/constants"
import { EmojiReactionsMap } from "types/reactions"

export const emojiReactionsMap: EmojiReactionsMap = EMOJI_REACTIONS.reduce(
  (acc, { reactionType, emoji }) => ({ ...acc, [reactionType]: emoji }),
  {} as EmojiReactionsMap,
)

export const replaceAtBrackets = (input: string) => {
  return input?.replace(/\[(.*?)\]/g, "$1")
}

export const getYouTubeId = (url: string) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

  if (youtubeRegex.test(url)) {
    const match = url.match(youtubeRegex)
    return match?.[5] ?? null
  }
  return null
}
