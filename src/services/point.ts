import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getLeaderboardExpByGroupId = async ({
  groupId,
  offset = 0,
  limit = 10,
}: {
  groupId: number
  offset?: number
  limit?: number
}) => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_EXP_LEADERBOARD_BY_GROUP_ID(groupId),
    params: {
      offset,
      limit,
      sort: JSON.stringify({
        totalPointExp: "desc",
      }),
    },
  })
  return res?.data
}

export const getTotalExpPointGroup = async (groupId: number) => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_EXP_TOTAL_POINT_GROUP(groupId),
  })
  return res?.data
}

export const getTotalExpPointUser = async (groupId: number) => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.GET_EXP_TOTAL_POINT_USER(groupId),
  })
  return res?.data
}
