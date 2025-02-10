import {
  PercentageIcon,
  PercentageSmallIcon,
  SimpleStakeIcon,
} from "@components/Icons"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import useGetStakedAmount from "@pages/Stake/useGetStakedAmount"
import { shortenNumber } from "@utils/index"
import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { StakeTokenAddress } from "../.."
import useConnectPhantom from "../../useConnectPhantom"

const SimpleCard: React.FC<{
  link: string
}> = ({ link }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isConnectWallet } = useConnectPhantom()
  const tokenAddress = searchParams.get("token")
  const { total, totalStakeAll, loadingStakeAll, loadingUserStake } =
    useGetStakedAmount()
  const infoToken = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  return (
    <div
      onClick={() =>
        navigate(link, {
          state: { isHistory: "true" },
        })
      }
      className="w-[350px] max-w-full cursor-pointer"
    >
      <div
        style={{
          background: "linear-gradient(71deg, #000 0%, #797676 100%)",
        }}
        className="flex h-[90px] justify-between rounded-t-[22px] px-6 py-5 max-md:h-[60px] max-md:px-4 max-md:py-4"
      >
        <div className="flex items-center gap-4">
          <img
            className="h-[48px] w-[48px] rounded-full"
            src={infoToken?.avatar}
          />
          <div className="text-white">
            <p className="text-20 font-bold italic max-md:text-18">
              Simple Staking
            </p>
            <p className="max-md:text-14">Deposit RACKS</p>
          </div>
        </div>
        <div className="flex items-center gap-[1px]">
          <div className="h-4 w-[2px] bg-[rgba(255,255,255,0.5)]"></div>
          <div className="h-4 w-[3px] bg-[rgba(255,255,255,0.8)]"></div>
          <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.1)]"></div>
          <div className="h-4 w-[4px] bg-[rgba(255,255,255,0.1)]"></div>
        </div>
      </div>
      <div
        style={{ borderBottomRightRadius: "22px" }}
        className="flex-1 bg-mercury-100 p-6 max-md:p-4"
      >
        <p className="mb-[80px] font-medium text-mercury-900 max-md:mb-[60px] max-md:text-14">
          Stake your RACKS to earn revenue shares and additional benefits.
        </p>
        <div className="relative grid grid-cols-2 gap-4">
          <div className="absolute left-6">
            <SimpleStakeIcon />
          </div>
          <div>
            <div className="-mb-3 -ml-2">
              <PercentageIcon />
            </div>
            <p className="text-14 font-medium text-mercury-700">Total Staked</p>
            <p className="text-20 font-bold text-mercury-950 max-md:text-16">
              {loadingStakeAll ? "--" : shortenNumber(totalStakeAll)} RACKS
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <div className="-mb-1 -ml-2">
              <PercentageSmallIcon />
            </div>
            <p className="text-14 font-medium text-mercury-700">Your Staked</p>
            <p className="text-20 font-bold text-mercury-950 max-md:text-16">
              {!isConnectWallet || loadingUserStake
                ? "--"
                : shortenNumber(total)}{" "}
              RACKS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleCard
