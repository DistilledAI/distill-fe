import { IconTrendingUp } from "@components/Icons/DefiLens"
import { MessagePlusIcon } from "@components/Icons/Message"
import { formatNumberWithComma } from "@utils/index"
import useTrendingAgent from "../hooks/useTrendingAgent"
import StatCard from "./StatCard"
import SpotlightAgentCard from "./SpotlightAgentCard"

const TrendingAgent = () => {
  const { totalMarketCap, totalMsg, agentSpotlight } = useTrendingAgent()

  return (
    <div className="flex w-full items-center justify-between gap-10 max-md:flex-col-reverse">
      <div className="w-[55%] max-md:w-full">
        <div className="flex items-center gap-4">
          <h2 className="bg-lgd-code-hot-ramp bg-clip-text text-[68px] font-bold text-transparent max-md:text-[50px]">
            8
          </h2>
          <span className="text-18 font-bold text-mercury-950 md:text-22">
            Autonomous agents <br /> managing their own wallets
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <StatCard
            icon={IconTrendingUp}
            title="Total Market Cap"
            value={`$${formatNumberWithComma(totalMarketCap)}`}
          />
          <StatCard
            icon={MessagePlusIcon}
            title="Total Messages"
            value={formatNumberWithComma(totalMsg)}
          />
        </div>
      </div>

      <SpotlightAgentCard agentSpotlight={agentSpotlight} />
    </div>
  )
}

export default TrendingAgent
