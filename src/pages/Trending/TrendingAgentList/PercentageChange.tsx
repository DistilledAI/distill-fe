import { CaretUpFilledIcon } from "@components/Icons/TrendingPage"
import { twMerge } from "tailwind-merge"

interface Props {
  percentage: number
  classNames?: {
    wrapper?: string
    percentage?: string
    iconWrapper?: string
  }
}

const PercentageChange = ({ percentage, classNames }: Props) => {
  if (!percentage) return null

  return (
    <div
      className={twMerge("flex items-center gap-[1px]", classNames?.wrapper)}
    >
      <div
        className={twMerge(
          percentage < 0 && "rotate-180",
          classNames?.iconWrapper,
        )}
      >
        <CaretUpFilledIcon color={percentage < 0 ? "#FF3B30" : "#20993F"} />
      </div>
      <span
        className={twMerge(
          "text-[14px] font-medium",
          percentage < 0 ? "text-[#FF3B30]" : "text-[#20993F]",
          classNames?.percentage,
        )}
      >
        {percentage.toFixed(1)}%
      </span>
    </div>
  )
}

export default PercentageChange
