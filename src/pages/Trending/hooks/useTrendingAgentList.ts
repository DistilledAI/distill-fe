import { useEffect, useState } from "react"
import { getTrendingAgentList } from "services/trending"

const useTrendingAgentList = () => {
  const [trendingAgentList, setTrendingAgentList] = useState<any[]>([])
  console.log("🚀 ~ trendingList:", trendingAgentList)

  useEffect(() => {
    ;(async () => {
      try {
        const payload = {
          size: 10,
          offset: 0,
        }
        const res = await getTrendingAgentList(payload)
        if (res) {
          setTrendingAgentList(res.data?.items)
        }
      } catch (error) {
        console.log({ error })
      }
    })()
  }, [])

  return {
    trendingAgentList,
  }
}

export default useTrendingAgentList
