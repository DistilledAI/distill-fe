import AutonomousAgents from "./AutonomousAgents"
import ListTrending from "./ListTrending"
import TopActiveClans from "./TopActiveClans"

const Trending: React.FC = () => {
  return (
    <div className="relative mx-auto mb-4 max-w-[960px] items-center justify-between px-5 md:mb-6">
      <AutonomousAgents />
      <TopActiveClans />
      <ListTrending />
    </div>
  )
}
export default Trending
