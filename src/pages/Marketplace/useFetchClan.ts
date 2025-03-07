import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { getListGroupAgentPublic } from "services/group"
import { useMemo } from "react"
import { QueryDataKeys } from "types/queryDataKeys"

interface Filter {
  [key: string]: any
}

interface UseFetchClanParams {
  limit?: number
  page?: number
  filter?: Filter
  sort?: Filter
  mode?: "infinite" | "pagination"
}

const fetchClans = async ({ pageParam = 0, queryKey }: any) => {
  const [, limit, filter, sort, mode, page] = queryKey
  const offset = mode === "pagination" ? (page - 1) * limit : pageParam
  const res = await getListGroupAgentPublic({
    filter,
    sort,
    limit,
    offset,
  })
  return {
    items: res.data.items || [],
    total: res.data.total || 0,
  }
}

const useFetchClan = ({
  limit = 10,
  page = 1,
  filter: externalFilter,
  sort: externalSort,
  mode = "infinite",
}: UseFetchClanParams = {}) => {
  const memoizedFilter = useMemo(
    () => externalFilter || {},
    [JSON.stringify(externalFilter)],
  )

  const memoizedSort = useMemo(
    () => externalSort || {},
    [JSON.stringify(externalSort)],
  )

  const infiniteResult = useInfiniteQuery({
    queryKey: [
      QueryDataKeys.CLANS,
      limit,
      memoizedFilter,
      memoizedSort,
      "infinite",
    ],
    queryFn: fetchClans,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.items.length,
        0,
      )
      return totalFetched < lastPage.total ? totalFetched : undefined
    },
    initialPageParam: 0,
    enabled: mode === "infinite",
  })

  const paginationResult = useQuery({
    queryKey: [
      "clans",
      limit,
      memoizedFilter,
      memoizedSort,
      "pagination",
      page,
    ],
    queryFn: fetchClans,
    enabled: mode === "pagination",
  })

  if (mode === "infinite") {
    const flatData =
      infiniteResult.data?.pages.flatMap((page) => page.items) || []
    return {
      data: flatData,
      loading: infiniteResult.isLoading,
      isFetching: infiniteResult.isFetching,
      hasMore: infiniteResult.hasNextPage,
      fetchMore: infiniteResult.fetchNextPage,
      total: infiniteResult.data?.pages[0]?.total || 0,
      refetch: infiniteResult.refetch,
    }
  } else {
    return {
      data: paginationResult.data?.items || [],
      total: paginationResult.data?.total || 0,
      loading: paginationResult.isLoading,
      isFetching: paginationResult.isFetching,
      hasMore: false,
      fetchMore: () => {},
      refetch: paginationResult.refetch,
    }
  }
}

export default useFetchClan
