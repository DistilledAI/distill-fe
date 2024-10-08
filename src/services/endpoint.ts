import { envConfig } from "@configs/env"

const withBaseURL = (path: string) => `${envConfig.baseApiUrl}${path}`

const endpoint = {
  //user
  LOGIN: withBaseURL("/user/login"),
  GET_USER: withBaseURL("/user/detail"),
  SEARCH_USER: withBaseURL("/user/search"),
  UPDATE_USER: withBaseURL("/user/update"),
  CREATE_ANONYMOUS: withBaseURL("/user/create-anonymous"),

  //bot
  CREATE_BOT: withBaseURL("/bot/create-bot"),
  //chat
  GET_MY_CHAT_GROUP_LIST: withBaseURL("/chat/group/list"),
  CHAT_SEND_TO_USER: withBaseURL("/chat/send-to-user"),
  CREATE_GROUP_CHAT: withBaseURL("/group/create-group"),
  CHAT_TO_GROUP: withBaseURL("/group/chat-to-group"),
  CHAT_GROUP_DIRECT: withBaseURL("/group/check-group-direct"),
  LEAVE_GROUP: (groupId: number) => withBaseURL(`/group/delete/${groupId}`),
  GET_HISTORY_CHAT: (id: number) => withBaseURL(`/chat/group/${id}/message`),
  CHECK_CONVERSATION_CHAT: (userToId: number) =>
    withBaseURL(`/chat/check-conversation/${userToId}`),
  GET_USER_PROFILE: (type: string, userName: string) =>
    withBaseURL(`/user/${type}-crawl/${userName}`),
}

export default endpoint
