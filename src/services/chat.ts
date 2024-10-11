import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getGroupList = async (offset: number = 0, limit: number = 10) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_MY_CHAT_GROUP_LIST,
    params: {
      offset,
      limit,
    },
  })
}

interface IDataChatSendToUser {
  toUserId: number
  messages: string
}
export const postChatSendToUser = async (data: IDataChatSendToUser) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_SEND_TO_USER,
    data,
  })
}

interface IDataChatToGroup {
  groupId: number
  messages: string
}
export const postChatToGroup = async (data: IDataChatToGroup) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_TO_GROUP,
    data,
  })
}

interface IDataCreateGroupChat {
  members: Array<number>
}
export const createGroupChat = async (data: IDataCreateGroupChat) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CREATE_GROUP_CHAT,
    data,
  })
}

export const checkGroupDirect = async (data: IDataCreateGroupChat) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_GROUP_DIRECT,
    data,
  })
}

export const leaveGroup = async (groupId: number) => {
  return fetchApiAuth({
    method: "delete",
    url: endpoint.LEAVE_GROUP(groupId),
  })
}

export const getChatHistoryById = async ({
  id,
  offset = 0,
  limit = 20,
}: {
  id: number
  offset?: number
  limit?: number
}) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_HISTORY_CHAT(id),
    params: {
      offset,
      limit,
    },
  })
}

export const searchUsers = async (payload: any) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.SEARCH_USER,
    params: {
      filter: payload,
    },
  })
}

export const checkConversation = async (userToId: number) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.CHECK_CONVERSATION_CHAT(userToId),
  })
}

export const getProfileInfo = async ({
  type,
  userName,
}: {
  type: string
  userName: string
}) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_USER_PROFILE(type, userName),
  })
}

interface CreateBot {
  name?: string
  publicAddress?: string
  linkedin?: string
  email: string
  webhook?: string
}
export const createBot = async (data: CreateBot) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CREATE_BOT,
    data,
  })
}

export const getMyPrivateAgent = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_BOT_LIST,
  })
}

export interface ChangeStatusBotInGroup {
  groupId: string | undefined | number
  botId: number
  status: number
}

export const changeStatusBotInGroup = async (data: ChangeStatusBotInGroup) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHANGE_STATUS_BOT_IN_GROUP,
    data,
  })
}

export const checkStatusBotInGroup = async (groupId: string | undefined) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.CHECK_STATUS_BOT_IN_GROUP(groupId),
  })
}
