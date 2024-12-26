import React from "react"
import PercentageChange from "./PercentageChange"
import { shortenNumber } from "@utils/index"

interface NumberWithChangeProps {
  value?: number
  percentage?: number
  unit?: string
}

const NumberWithChange: React.FC<NumberWithChangeProps> = ({
  value = 0,
  percentage = 0,
  unit = "",
}) => {
  if (!value) return "-"

  return (
    <div className="flex items-center gap-2">
      <span className="text-14 font-medium text-mercury-950">
        {unit}
        {shortenNumber(value)}
      </span>
      {percentage ? <PercentageChange percentage={percentage} /> : null}
    </div>
  )
}

export default NumberWithChange
