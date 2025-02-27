import { IGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useEffect, useState } from "react"
import { getListGroupAgentPublic } from "services/group"

const useFetchClan = ({
  isFetchNow = true,
  userId,
  limit = 10,
  offset = 0,
}: {
  isFetchNow?: boolean
  userId?: number
  limit?: number
  offset?: number
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IGroup[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [currentOffset, setCurrentOffset] = useState(offset)
  const [total, setTotal] = useState<number>(0)

  const getList = async ({
    hasLoading = true,
    isFetchMore = false,
    fetchLimit = limit,
    fetchOffset = currentOffset,
    sort,
  }: {
    hasLoading?: boolean
    isFetchMore?: boolean
    fetchLimit?: number
    fetchOffset?: number
    sort?: {
      [key: string]: any
    }
  }) => {
    try {
      if (hasLoading) setLoading(true)
      const filter = userId
        ? JSON.stringify({ userId: userId.toString() })
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
      setTotal(res?.data?.total)
      setHasMore(newData.length === fetchLimit)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFetchNow) {
      getList({
        hasLoading: true,
        isFetchMore: false,
        fetchLimit: limit,
        fetchOffset: offset,
      })
    }
  }, [isFetchNow, userId, limit, offset])

  const fetchMore = () => {
    if (!hasMore || loading) return
    const newOffset = currentOffset + limit
    setCurrentOffset(newOffset)
    getList({
      hasLoading: true,
      isFetchMore: true,
      fetchLimit: limit,
      fetchOffset: newOffset,
    })
  }

  return { data, loading, hasMore, fetchMore, getList, total }
}

export default useFetchClan
