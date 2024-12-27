import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

interface TrendingAgentPayload {
  limit: number
  offset: number
  sort?: string
  keyword?: string
  filter?: string
}

export const getTrendingAgent = async () => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_TRENDING_AGENT,
  })
}

export const getTrendingAgentList = async (params: TrendingAgentPayload) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_TRENDING_AGENT_LIST,
    params,
  })
}
