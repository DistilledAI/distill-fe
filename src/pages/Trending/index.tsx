import AutonomousAgents from "./AutonomousAgents"
import TopActiveClans from "./TopActiveClans"
import TrendingAgentList from "./TrendingAgentList"

const Trending = () => {
  return (
    <div className="mx-auto max-w-[1103px] px-4 pb-20 pt-6 md:p-20">
      <AutonomousAgents />
      <TopActiveClans />
      <TrendingAgentList />
    </div>
  )
}
export default Trending
