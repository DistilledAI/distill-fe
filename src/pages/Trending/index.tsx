import { useEffect, useState } from "react"
import AutonomousAgents from "./AutonomousAgents"
import ListTrending from "./ListTrending"
import TopActiveClans from "./TopActiveClans"
import { getTrendingAgentList } from "services/trending"

const Trending: React.FC = () => {
  const [trendingList, setTrendingList] = useState<any[]>([])
  console.log("🚀 ~ trendingList:", trendingList)

  useEffect(() => {
    ;(async () => {
      try {
        const payload = {
          size: 10,
          offset: 0,
        }
        const res = await getTrendingAgentList(payload)
        if (res) {
          setTrendingList(res.data?.items)
        }
      } catch (error) {
        console.log({ error })
      }
    })()
  }, [])

  return (
    <div className="relative mx-auto mb-[80px] max-w-[960px] items-center justify-between px-5 md:mb-6">
      <AutonomousAgents />
      <TopActiveClans />
      <ListTrending />
    </div>
  )
}
export default Trending
