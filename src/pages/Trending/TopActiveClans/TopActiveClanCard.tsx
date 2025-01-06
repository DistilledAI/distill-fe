import { MessageFilledIcon } from "@components/Icons/Message"
import PercentageChange from "../TrendingAgentList/PercentageChange"
import { shortenNumber } from "@utils/index"

interface Props {
  clanName: string
  clanImage: string
  totalMessage: number
  percentage: number
}

const TopActiveClanCard = ({
  clanName,
  clanImage,
  totalMessage,
  percentage,
}: Props) => {
  return (
    <div className="group/item relative h-[130px] w-full cursor-pointer overflow-hidden rounded-lg bg-mercury-500">
      <img
        src={clanImage}
        className="h-full w-full object-cover transition-all duration-300 ease-soft-spring group-hover/item:scale-105"
      />
      <div
        className="absolute inset-0 rounded-lg bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)`,
        }}
      >
        <div className="h-full w-full rounded-lg border-[2px] border-white/20" />
      </div>
      <PercentageChange
        percentage={percentage}
        classNames={{
          wrapper:
            "bg-[#20993F] px-1 w-fit rounded-full absolute right-2 top-2",
          percentage: "text-[12px] font-medium text-white",
          iconWrapper: "[&>svg>path]:stroke-white",
        }}
      />
      <div className="absolute bottom-2 flex w-full justify-between px-2">
        <span className="text-[12px] font-bold text-white">{clanName}</span>
        <div className="flex items-center gap-[2px]">
          <MessageFilledIcon size={12} color="#FFFF" />
          <span className="text-[12px] font-bold text-white">
            {shortenNumber(totalMessage)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopActiveClanCard
