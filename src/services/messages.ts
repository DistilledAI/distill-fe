import { ReactionTypes } from "types/reactions"
import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"
import { envConfig } from "@configs/env"

interface ReactionMsg {
  msgId: number | string
  groupId: number | string
  reactionType: ReactionTypes
}

export const postReactionMsg = async ({
  msgId,
  groupId,
  reactionType,
}: ReactionMsg) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.POST_REACTION_MESSAGE,
    data: {
      msgId,
      groupId,
      reactionType,
    },
  })
}

export const getLikedAgentMessage = async (groupId: number) => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_LIKED_AGENT_MESSAGE(groupId),
    params: {
      filter: JSON.stringify({
        userId: envConfig.ownerPinMessageGroupId,
      }),
    },
  })
  return res?.data
}
