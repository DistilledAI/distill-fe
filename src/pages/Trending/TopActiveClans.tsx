import { MessageFilledIcon } from "@components/Icons/Message"
import {
  CretUpFilledIcon,
  FlagFilledIcon,
} from "@components/Icons/TrendingPage"

const TopActiveClans: React.FC = () => {
  return (
    <div className="mt-[50px]">
      <div className="mb-4 flex items-center gap-2">
        <FlagFilledIcon />
        <span className="text-[22px] font-bold">Top Active Clans</span>
        <span className="text-[22px] font-normal uppercase text-mercury-700">
          24h
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        <ActiveClanContainer clanName="Max.Clan" totalMessage="214.3K" />
        <ActiveClanContainer clanName="Max.Clan" totalMessage="214.3K" />
        <ActiveClanContainer clanName="Max.Clan" totalMessage="214.3K" />
        <ActiveClanContainer clanName="Max.Clan" totalMessage="214.3K" />
        <ActiveClanContainer clanName="Max.Clan" totalMessage="214.3K" />
        <ActiveClanContainer clanName="Max.Clan" totalMessage="214.3K" />
      </div>
    </div>
  )
}

interface ActiveClanContainerProps {
  clanName: string
  totalMessage: number | string
}
const ActiveClanContainer: React.FC<ActiveClanContainerProps> = ({
  clanName,
  totalMessage,
}) => {
  return (
    <div className="relative min-h-[130px] min-w-[156px] rounded-[4px] bg-mercury-500">
      <div className="absolute right-2 top-2 flex w-fit items-center gap-1 rounded-full bg-[#20993F] px-1">
        <CretUpFilledIcon />
        <span className="text-[12px] font-medium text-white">53.4%</span>
      </div>

      <div className="absolute bottom-2 flex w-full justify-between px-2">
        <span className="text-[12px] font-bold text-white">{clanName}</span>
        <div className="flex items-center gap-[2px]">
          <MessageFilledIcon size={12} color="#FFFF" />
          <span className="text-[12px] font-bold text-white">
            {totalMessage}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopActiveClans
