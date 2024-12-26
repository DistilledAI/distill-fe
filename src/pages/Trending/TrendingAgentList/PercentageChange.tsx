import { CaretUpFilledIcon } from "@components/Icons/TrendingPage"
import { twMerge } from "tailwind-merge"

interface Props {
  percentage: number
}

const PercentageChange = ({ percentage }: Props) => {
  if (!percentage) return null

  return (
    <div className="flex items-center">
      <div className={twMerge(percentage < 0 && "rotate-180")}>
        <CaretUpFilledIcon color={percentage < 0 ? "#FF3B30" : "#20993F"} />
      </div>
      <span
        className={twMerge(
          "text-[14px] font-medium",
          percentage < 0 ? "text-[#FF3B30]" : "text-[#20993F]",
        )}
      >
        {percentage.toFixed(1)}%
      </span>
    </div>
  )
}

export default PercentageChange
