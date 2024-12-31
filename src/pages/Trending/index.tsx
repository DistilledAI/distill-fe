import TopActiveClans from "./TopActiveClans"
import TrendingAgent from "./TrendingAgent"
import TrendingAgentList from "./TrendingAgentList"

const Trending = () => {
  return (
    <div className="mx-auto max-w-[1103px] px-4 pb-20 pt-10 md:p-10 md:pt-6">
      <TrendingAgent />
      <TopActiveClans />
      <TrendingAgentList />
    </div>
  )
}
export default Trending
