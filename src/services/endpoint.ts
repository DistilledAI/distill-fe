import { envConfig } from "@configs/env"

const withBaseURL = (path: string) => `${envConfig.baseApiUrl}${path}`
const PREDICTION_API_URL =
  envConfig.predictionApiUrl || "https://backend-prediction.agents.land"

const endpoint = {
  //user
  LOGIN: withBaseURL("/user/login"),
  GET_USER: withBaseURL("/user/detail"),
  SEARCH_USER: withBaseURL("/user/search"),
  UPDATE_USER: withBaseURL("/user/update"),
  UPDATE_AVATAR_USER: withBaseURL("/user/update-avatar"),
  CREATE_ANONYMOUS: withBaseURL("/user/create-anonymous"),
  GET_USER_PUBLIC_DETAIL: withBaseURL("/user/public/detail"),
  GET_REFERRAL_CODE: withBaseURL("/user/referral/total-referral"),
  POST_REFERRAL_CODE: withBaseURL("/user/referral/add-referral"),
  KYC: withBaseURL("/user/kyc"),
  GET_USER_TOP_CHAT: withBaseURL("/info/user/top-chat"),

  //bot
  CREATE_BOT: withBaseURL("/bot/create-bot"),
  GET_BOT_LIST: withBaseURL("/bot/list"),
  CHANGE_STATUS_BOT_IN_GROUP: withBaseURL("/group/change-status-bot-in-group"),
  CHECK_STATUS_BOT_IN_GROUP: (groupId: string | undefined) =>
    withBaseURL(`/group/check-status-bot-in-group/${groupId}`),
  PUBLISH_MARKETPLACE: (botId: number) =>
    withBaseURL(`/bot/publish-marketplace/${botId}`),
  GET_AGENT_DETAIL: (botId: number) => withBaseURL(`/bot/detail/${botId}`),
  GET_BOT_PUBLIC_BY_OWNER: (ownerId: number) =>
    withBaseURL(`/bot/public/info/get-by-owner/${ownerId}`),
  GET_AGENT_CONFIG: (botId: number) => withBaseURL(`/bot/config/${botId}`),
  UPDATE_AGENT: withBaseURL("/bot/update"),
  UPDATE_CONFIG_AGENT: withBaseURL("/bot/config"),
  CONNECT_X: withBaseURL("/point/xDstl/connect-x"),
  GET_TASK_SUCCESS: withBaseURL("/point/xDstl/user/task-success"),
  GET_USER_CLAIM_TASK_SUCCESS: withBaseURL(
    "/point/xDstl/user/claim-task-success",
  ),
  REPOST_X: withBaseURL("/point/xDstl/retweet-x"),

  //chat
  GET_MY_CHAT_GROUP_LIST: withBaseURL("/chat/group/list"),
  CHAT_SEND_TO_USER: withBaseURL("/chat/send-to-user"),
  CREATE_GROUP_CHAT: withBaseURL("/group/create-group"),
  CHAT_TO_GROUP: withBaseURL("/group/chat-to-group"),
  CHAT_GROUP_DIRECT: withBaseURL("/group/check-group-direct"),
  INVITE_USER_JOIN_GROUP: withBaseURL("/group/invite-user"),
  LEAVE_GROUP: withBaseURL(`/group/out-group`),
  DELETE_GROUP: (groupId: number) => withBaseURL(`/group/delete/${groupId}`),
  GET_GROUP_CHAT_DETAIL: () => withBaseURL("/group/detail"),
  GET_HISTORY_CHAT: (id: number) => withBaseURL(`/chat/group/${id}/message`),
  CHECK_CONVERSATION_CHAT: (userToId: number) =>
    withBaseURL(`/chat/check-conversation/${userToId}`),
  GET_USER_PROFILE: (type: string, userName: string) =>
    withBaseURL(`/user/${type}-crawl/${userName}`),
  GET_GROUP_DETAIL_FROM_LABEL: (label: string) =>
    withBaseURL(`/group/detail/label/${label}`),

  // group
  GET_LIST_GROUP_PUBLIC: withBaseURL("/group/public"),
  CLEAR_CACHED_BY_GROUP_ID: (groupId: number) =>
    withBaseURL(`/group/clear-cached/${groupId}`),
  GET_TOTAL_MEMBER_GROUP: (groupId: number) =>
    withBaseURL(`/group/total-member/${groupId}`),
  GET_AGENT_CONVERSATION: (groupId: number) =>
    withBaseURL(`/agent-conversation/message/${groupId}`),

  // my data
  UPLOAD_MY_DATA: withBaseURL("/my-data/upload"),
  MAP_MY_DATA_TO_BOT: withBaseURL("/my-data/map-bot"),
  GET_MY_BOT_DATA: (botId: number) => withBaseURL(`/my-data/list/${botId}`),
  DELETE_MY_BOT_DATA: withBaseURL("/my-data/delete"),
  TRAIN_DATA_MY_DATA: withBaseURL("/my-data/train-data"),
  TELEGRAM_MAP_AGENT: withBaseURL("/telegram/map-bot"),

  // point
  GET_EXP_LEADERBOARD_BY_GROUP_ID: (groupId: number) =>
    withBaseURL(`/point/exp/leaderboard/${groupId}`),
  GET_EXP_TOTAL_POINT_GROUP: (groupId: number) =>
    withBaseURL(`/point/exp/total-point/group/${groupId}`),
  GET_EXP_TOTAL_POINT_USER: (groupId: number) =>
    withBaseURL(`/point/exp/total-point/user/${groupId}`),

  // messages
  POST_REACTION_MESSAGE: withBaseURL("/messages/reaction-msg"),

  //game
  // TODO: update later
  // GET_PREDICT_HISTORY: withBaseURL("/game/predict/history"),
  GET_PREDICT_HISTORY:
    "https://api-dev.distilled.ai/distill/game/predict/history", // only on product
  GET_CURRENT_PREDICT_ROUND:
    "https://api-dev.distilled.ai/distill/game/predict/history-event", // only on product
  GET_HISTORY_AGENT_LAND_URL: (userId: string) =>
    `${PREDICTION_API_URL}/users/${userId}/orders`,
  GET_EVENT_INFO_AGENT_LAND_URL: `${PREDICTION_API_URL}/events`,

  //trending
  GET_TRENDING_AGENT: withBaseURL("/trending"),
  GET_TRENDING_AGENT_LIST: withBaseURL("/trending/list"),
}

export default endpoint
