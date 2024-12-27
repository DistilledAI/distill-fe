import { useEffect, useState } from "react"
import { getTrendingAgentList } from "services/trending"

const useTrendingAgentList = () => {
  const [trendingAgentList, setTrendingAgentList] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState(0)

  const fetchTrendingAgentList = async ({
    limit,
    offset,
  }: {
    limit: number
    offset: number
  }) => {
    try {
      const res = await getTrendingAgentList({ limit, offset })
      if (res) {
        setTrendingAgentList(res.data?.items)
        setTotalItems(res?.data?.total)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    fetchTrendingAgentList({ limit: 10, offset: 0 })
  }, [])

  return {
    trendingAgentList,
    fetchTrendingAgentList,
    totalItems,
  }
}

export default useTrendingAgentList
