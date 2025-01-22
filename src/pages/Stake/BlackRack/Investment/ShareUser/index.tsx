import { aiFund2Ava } from "@assets/images"
import { toBN } from "@utils/format"
import { formatNumberWithComma } from "@utils/index"
import React from "react"

const InvestShareUser: React.FC<{
  total: number
  loading: boolean
  nav: number
}> = ({ total, loading, nav }) => {
  return (
    <div className="grid grid-cols-2 gap-5 rounded-[14px] border-1 border-[#A88E67] bg-brown-50 px-6 py-4">
      <div>
        <p className="text-14 font-medium text-mercury-700">Your Shares</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          $
          {total === 0 || nav === 0
            ? "--"
            : formatNumberWithComma(
                toBN(toBN(nav * total).toFixed(3)).toNumber(),
              )}
        </p>
        <div className="flex items-center gap-1">
          <img className="h-4 w-4 rounded-full object-cover" src={aiFund2Ava} />
          <p className="text-14 text-brown-600">
            {loading ? "--" : formatNumberWithComma(total)} Shares
          </p>
        </div>
      </div>
      <div>
        <p className="text-14 font-medium text-mercury-700">Share Price</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          ${nav === 0 ? "--" : nav}
        </p>
      </div>
    </div>
  )
}

export default InvestShareUser
