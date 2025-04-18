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
  filter?: {
    [key: string]: any
  }
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
      filter: JSON.stringify(filter),
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

export const editAgentClan = async ({
  groupId,
  data,
}: {
  groupId: number
  data: {
    type: "clan"
    key: string
    value: any
  }[]
}) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.EDIT_AGENT_CLAN,
    data: {
      groupId,
      data,
    },
  })
}

export const uploadImageAgentClan = async (data: FormData) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPLOAD_IMAGE_AGENT_CLAN,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const getFeaturedAgentClans = async () => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_FEATURED_AGENT_CLANS(),
  })
  return res?.data
}

export const postPinAgentClan = async ({
  groupIds,
  status,
}: {
  groupIds: string[]
  status: boolean
}) => {
  const res = await fetchApiAuth({
    method: "POST",
    url: endpoint.PIN_AGENT_CLAN,
    data: {
      groupIds,
      status,
    },
  })
  return res?.data
}

export const getPinAgentClans = async () => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_PIN_AGENT_CLANS,
  })
  return res?.data?.items
}

export const getMyAgentClan = async () => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_MY_AGENT_CLAN,
  })
  return res?.data
}
