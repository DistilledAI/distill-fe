import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getAgentDetail = async (botId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_AGENT_DETAIL(botId),
  })
}

export const getPublicAgentsByOwner = async (ownerId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_BOT_PUBLIC_BY_OWNER(ownerId),
    params: {
      filter: JSON.stringify({
        publish: 1,
      }),
    },
  })
}

interface UploadAgentPayload {
  botId: number
  avatar?: string
  username?: string
  description?: string
  email?: string
  firstMsg?: string
}

export const updateAgent = async (data: UploadAgentPayload) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPDATE_AGENT,
    data,
  })
}
interface TelegramMapAgentPayload {
  token: string
  botId: number
}

export const telegramMapAgent = async (data: TelegramMapAgentPayload) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.TELEGRAM_MAP_AGENT,
    data,
  })
}

export const updateAgentConfig = async (data: {
  botId: number
  data: {
    key: string
    value: string
  }[]
}) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPDATE_CONFIG_AGENT,
    data,
  })
}

export const getAgentConfig = async (botId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_AGENT_CONFIG(botId),
    params: {
      size: 50,
      offset: 0,
    },
  })
}

export const checkConnectDistilledX = async (data: {
  code: string
  redirectUri: string
}) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.CONNECT_X,
    data,
  })
}

export const getTaskSuccess = async () => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_TASK_SUCCESS,
  })
}

export const getUserClaimTaskSuccess = async () => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_USER_CLAIM_TASK_SUCCESS,
  })
}

export const checkRePostDistilledX = async (data: {
  code: string
  redirectUri: string
  targetId: string
}) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.REPOST_X,
    data,
  })
}
