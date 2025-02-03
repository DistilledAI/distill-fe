import { useEffect, useState } from "react"
import { getListGroupAgentPublic } from "services/group"
import { IGroupDetail } from "types/group"

const useFetchClan = ({
  isFetchNow = true,
  userId,
  limit,
  offset,
}: {
  isFetchNow?: boolean
  userId?: number
  limit?: number
  offset?: number
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IGroupDetail[]>([])

  const getList = async ({
    hasLoading = true,
    limit = 10,
    offset = 0,
  }: {
    hasLoading?: boolean
    limit?: number
    offset?: number
  }) => {
    try {
      if (hasLoading) setLoading(true)
      const filter = userId
        ? JSON.stringify({ userId: userId.toString() })
        : undefined
      const res = await getListGroupAgentPublic(filter, limit, offset)
      if (res.data.items) setData(res.data.items)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFetchNow) getList({ limit, offset })
  }, [userId, isFetchNow, limit, offset])

  return { data, loading, getList }
}

export default useFetchClan
