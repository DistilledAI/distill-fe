import { FlagFilledIcon } from "@components/Icons/TrendingPage"
import TopActiveClanCard from "./TopActiveClanCard"

const TopActiveClans = () => {
  return (
    <div className="mt-7 md:mt-14">
      <div className="mb-4 flex items-center gap-2">
        <FlagFilledIcon />
        <h3 className="text-18 font-bold text-mercury-950 md:text-22">
          Top Active Clans
        </h3>
        <h3 className="text-18 uppercase text-mercury-700 md:text-22">24h</h3>
      </div>

      <div className="grid w-full grid-cols-6 gap-1 max-md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TopActiveClanCard
            key={index}
            clanName="Max.Clan"
            clanImage="https://storage.distilled.ai/avatar/maxi.png"
            totalMessage={214300}
            percentage={99.5}
          />
        ))}
      </div>
    </div>
  )
}
export default TopActiveClans
