import React from "react"
import { shortenNumber } from "@utils/index"
import { useSearchParams } from "react-router-dom"
import { getInfoTokenByAddress } from "../helpers"
import { StakeTokenAddress } from ".."

const StakedInfo: React.FC<{
  total: number
}> = ({ total }) => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between rounded-[22px] border-1 border-mercury-100 bg-mercury-70 px-8 pb-6 pt-8">
        <div>
          <p className="text-14 font-medium text-mercury-700">
            Total {tokenInfo?.tokenName} staked
          </p>
          <p className="text-20 font-medium uppercase text-mercury-950">
            {shortenNumber(total)} {tokenInfo?.tokenName}
          </p>
        </div>
        {/* <div>
          <p className="text-right text-14 font-medium text-mercury-700">
            Unique stakers
          </p>
          <p className="text-right text-20 font-medium text-mercury-950">120</p>
        </div> */}
      </div>
    </div>
  )
}

export default StakedInfo
