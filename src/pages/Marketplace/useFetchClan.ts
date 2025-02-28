import { IGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useEffect, useState, useCallback, useMemo } from "react"
import { getListGroupAgentPublic } from "services/group"

// Types
interface Filter {
  [key: string]: any
}

interface UseFetchClanParams {
  isFetchNow?: boolean
  limit?: number
  offset?: number
  filter?: Filter
}

interface GetListParams {
  hasLoading?: boolean
  isFetchMore?: boolean
  fetchLimit?: number
  fetchOffset?: number
  sort?: Record<string, any>
  filter?: Filter
}

const useFetchClan = ({
  isFetchNow = true,
  limit = 10,
  offset = 0,
  filter: externalFilter,
}: UseFetchClanParams = {}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IGroup[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [currentOffset, setCurrentOffset] = useState(offset)
  const [total, setTotal] = useState<number>(0)

  // Memoize the filter to prevent unnecessary re-renders
  const memoizedFilter = useMemo(
    () => externalFilter,
    [JSON.stringify(externalFilter)],
  )

  const getList = useCallback(
    async ({
      hasLoading = true,
      isFetchMore = false,
      fetchLimit = limit,
      fetchOffset = currentOffset,
      sort,
      filter: overrideFilter,
    }: GetListParams = {}) => {
      try {
        if (hasLoading) setLoading(true)

        const combinedFilter = {
          ...memoizedFilter,
          ...overrideFilter,
        }

        const filter = Object.keys(combinedFilter).length
          ? combinedFilter
          : undefined

        const res = await getListGroupAgentPublic({
          filter,
          sort,
          limit: fetchLimit,
          offset: fetchOffset,
        })

        const newData = res.data.items || []

        if (isFetchMore) {
          setData((prev) => [...prev, ...newData])
        } else {
          setData(newData)
        }
        setTotal(res?.data?.total || 0)
        setHasMore(newData.length === fetchLimit)
      } catch (error: any) {
        console.error("Error fetching clan data:", error)
      } finally {
        setLoading(false)
      }
    },
    [limit, currentOffset, memoizedFilter],
  )

  useEffect(() => {
    if (isFetchNow) {
      getList({
        hasLoading: true,
        isFetchMore: false,
        fetchLimit: limit,
        fetchOffset: offset,
      })
    }
  }, [isFetchNow, limit, offset, getList])

  const fetchMore = useCallback(() => {
    if (!hasMore || loading) return
    const newOffset = currentOffset + limit
    setCurrentOffset(newOffset)
    getList({
      hasLoading: true,
      isFetchMore: true,
      fetchLimit: limit,
      fetchOffset: newOffset,
    })
  }, [hasMore, loading, currentOffset, limit, getList])

  return { data, loading, hasMore, fetchMore, getList, total }
}

export default useFetchClan
