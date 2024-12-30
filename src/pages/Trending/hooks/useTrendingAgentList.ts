import { useEffect, useState } from "react"
import { getTrendingAgentList } from "services/trending"

const useTrendingAgentList = () => {
  const [trendingAgentList, setTrendingAgentList] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState(0)

  const fetchTrendingAgentList = async ({
    size,
    offset,
  }: {
    size: number
    offset: number
  }) => {
    try {
      const res = await getTrendingAgentList({ size, offset })
      if (res) {
        setTrendingAgentList(res.data?.items)
        setTotalItems(res?.data?.total)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    fetchTrendingAgentList({ size: 10, offset: 0 })
  }, [])

  return {
    trendingAgentList,
    fetchTrendingAgentList,
    totalItems,
  }
}

export default useTrendingAgentList
