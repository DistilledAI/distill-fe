import { MessageFilledIcon } from "@components/Icons/Message"
import {
  CretUpFilledIcon,
  FlagFilledIcon,
} from "@components/Icons/TrendingPage"

const TopActiveClans: React.FC = () => {
  return (
    <div className="mt-[50px] max-md:mt-4">
      <div className="mb-4 flex items-center gap-2">
        <FlagFilledIcon />
        <span className="text-[22px] font-bold max-md:text-18">
          Top Active Clans
        </span>
        <span className="text-[22px] font-normal uppercase text-mercury-700 max-md:text-18">
          24h
        </span>
      </div>

      <div className="grid w-full grid-cols-6 gap-1 max-md:grid-cols-3">
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
    <div className="relative h-[130px] w-full cursor-pointer overflow-hidden rounded-[8px] bg-mercury-500">
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)",
        }}
        className="absolute bottom-0 left-0 h-[80%] w-full"
      ></div>
      <div className="absolute right-2 top-2 flex w-fit items-center gap-1 rounded-full bg-[#20993F] px-1">
        <CretUpFilledIcon />
        <span className="text-[12px] font-medium text-white">53.4%</span>
      </div>
      <img
        src="https://storage.distilled.ai/avatar/maxi.png"
        alt="trending"
        className="h-full w-full object-cover"
      />
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
