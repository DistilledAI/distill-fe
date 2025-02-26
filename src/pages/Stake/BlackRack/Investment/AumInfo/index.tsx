import { formatNumberWithComma } from "@utils/index"
import React from "react"

const AumInfo: React.FC<{
  aum: string
}> = ({ aum }) => {
  return (
    <div className="mb-6">
      <div className="rounded-[22px] border-1 border-mercury-100 bg-mercury-70 px-7 py-6">
        <p className="text-14 font-bold text-mercury-900">
          AUM{" "}
          <span className="font-medium text-mercury-700">
            (Assets Under Management)
          </span>
        </p>
        <p className="mt-1 text-24 font-bold text-mercury-950">
          ${formatNumberWithComma(Number(aum))}
        </p>
        {/* <p className="inline-block rounded-md bg-[#F1FCF3] p-1 text-14 text-green-600">
          +3.44% Today
        </p> */}
      </div>
    </div>
  )
}

export default AumInfo
