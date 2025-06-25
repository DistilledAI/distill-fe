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
        totalPoint: "DESC",
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

export const convertXDSTLToUSDI = async (walletLfg: string) => {
  const res = await fetchApiAuth({
    method: "POST",
    url: endpoint.CONVERT_XDSTL_TO_USDAI,
    data: {
      walletLfg,
    },
  })
  return res?.data
}

export const checkConvertXDSTLToUSDIStatus = async () => {
  const res = await fetchApiAuth({
    method: "GET",
    url: endpoint.CONVERT_XDSTL_TO_USDAI,
  })
  return res?.data
}
