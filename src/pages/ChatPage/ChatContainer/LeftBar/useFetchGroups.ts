import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getGroupList } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

export enum TypeGroup {
  DIRECT = "DIRECT",
  PRIVATE_GROUP = "PRIVATE_GROUP",
  PUBLIC_GROUP = "PUBLIC_GROUP",
  PUBLIC_GROUP_CONVERSATION = "PUBLIC_GROUP_CONVERSATION",
}

export interface IGroup {
  id: number
  name: string
  image?: string
  userAId: number
  userBId: number
  userA: IUser
  userB: IUser
  createBy: number
  status: number
  createdAt: string
  typeGroup: TypeGroup
  live?: number
  label?: string
  description?: string
  groupConfig?: any[]
  groupMemberStats?: {
    id: number
    groupId: number
    total: number
    createdAt: string
  }
  groupUser?: Array<any>
}

export interface GroupConfig {
  x: string
  telegram: string
  contractAddress: string
  tradeLink: string
  description: string
  imageLive: string
  videoLive: string
  audioLive: string
  isPrediction: boolean
  website?: string
}

export interface UserGroup {
  id: number
  userId: number
  groupId: number
  joinedAt: string
  createdAt: string
  group: IGroup
}

interface FetchConfig {
  offset?: number
  limit?: number
  isLoadMore?: boolean
  filter?: {
    [key: string]: any
  }
}

export const LIMIT = 10

interface UseFetchGroupsOptions {
  initialLimit?: number
  initialOffset?: number
  initialFilter?: { [key: string]: any }
}

const useFetchGroups = (options: UseFetchGroupsOptions = {}) => {
  const { initialLimit = 10, initialOffset = 0, initialFilter } = options
  const { isLogin } = useAuthState()
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(initialOffset)
  const [isFetched, setIsFetched] = useState(false)
  const queryClient = useQueryClient()

  const fetchGroups = async ({
    offset = 0,
    limit = initialLimit,
    isLoadMore = false,
    filter = initialFilter,
  }: FetchConfig = {}) => {
    try {
      setIsFetched(true)
      const res = await getGroupList(offset, limit, filter)
      if (res.data.items && !isLoadMore) {
        return res.data.items
      }

      if (res.data.items.length && isLoadMore) {
        queryClient.setQueryData(
          [QueryDataKeys.MY_LIST_CHAT],
          (oldData: UserGroup[]) => [...oldData, ...res.data.items],
        )
      }

      return res.data.items ? res.data.items : []
    } catch (error) {
      console.error(error)
    }
  }

  const { data, refetch, isFetching } = useQuery({
    queryKey: [QueryDataKeys.MY_LIST_CHAT],
    queryFn: () =>
      fetchGroups({
        offset: 0,
        limit: initialLimit,
        filter: initialFilter,
      }),
    enabled: isLogin,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const handleLoadMore = async () => {
    if (hasMore) {
      const newGroups = await fetchGroups({
        offset,
        limit: initialLimit,
        filter: initialFilter,
        isLoadMore: true,
      })
      if (!newGroups?.length) return setHasMore(false)
      setOffset((prev) => prev + initialLimit)
    }
  }

  const dataByPrivateMsg = data?.filter(
    (item: any) =>
      ![TypeGroup.PUBLIC_GROUP_CONVERSATION].includes(item?.group?.typeGroup),
  )

  return {
    isLoading: isFetching,
    groups: dataByPrivateMsg || [],
    fetchGroups: refetch,
    handleLoadMore,
    isFetched,
  }
}

export default useFetchGroups
