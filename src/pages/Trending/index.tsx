import AutonomousAgents from "./AutonomousAgents"
import TopActiveClans from "./TopActiveClans"

const Trending: React.FC = () => {
  return (
    <div className="relative mx-auto mb-4 max-w-[60%] items-center justify-between md:mb-6">
      <AutonomousAgents />
      <TopActiveClans />
    </div>
  )
}
export default Trending
