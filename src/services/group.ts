import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const clearContextByGroupId = async (groupId: number) => {
  return fetchApiAuth({
    method: "DELETE",
    url: endpoint.CLEAR_CACHED_BY_GROUP_ID(groupId),
  })
}

export const getTotalMemberGroup = async (groupId: number) => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_TOTAL_MEMBER_GROUP(groupId),
  })
  return res?.data
}

export const getListGroupAgentPublic = async ({
  filter,
  sort,
  limit = 10,
  offset = 0,
}: {
  filter?: string
  sort?: {
    [key: string]: any
  }
  limit?: number
  offset?: number
}) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_LIST_GROUP_PUBLIC,
    params: {
      filter,
      sort: JSON.stringify(sort),
      limit,
      offset,
    },
  })
}

export const getAgentConversation = async ({
  id,
  offset = 0,
  limit = 20,
}: {
  id: number
  offset?: number
  limit?: number
}) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_AGENT_CONVERSATION(id),
    params: {
      offset,
      limit,
    },
  })
}
