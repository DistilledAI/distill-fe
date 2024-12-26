import AutonomousAgents from "./AutonomousAgents"
import TopActiveClans from "./TopActiveClans"
import TrendingAgentList from "./TrendingAgentList"

const Trending: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1103px] p-20 pt-4">
      <AutonomousAgents />
      <TopActiveClans />
      <TrendingAgentList />
    </div>
  )
}
export default Trending
