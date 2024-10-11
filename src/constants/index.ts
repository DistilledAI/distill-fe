export const PATH_NAMES = {
  HOME: "/",
  LLM: "/chatbot",
  CHAT: "/chat",
  CHAT_DETAIL: "/chat/:chatId",
  INVITE: "/invite",
  PRIVATE_AGENT: "/private-agent",
}

export const MIX_PANEL_TRACK_EVENT = {
  OPEN_WIDGET: "Open_Widget",
  CLOSE_WIDGET: "Close_Widget",
  SEND_MESSAGE_WIDGET: "Send_Message_Widget",
}

export const SITE_LLM_SUPPORTED = {
  LAYER: "layer",
  ORAI: "orai",
  ORAIDEX: "oraidex",
}

export const DISTILLED_AI_URL = "https://distilled.ai/"

export enum RoleUser {
  ADMIN = 1,
  USER = 2,
  BANNED = 3,
  BOT = 4,
  ANONYMOUS = 5,
  SUPER_ADMIN = 10,
}

export const STATUS_AGENT = {
  ACTIVE: 1,
  SUSPENDED: 2,
  DELETED: 3,
  PENDING: 4,
}
