import { useNavigate, useSearchParams } from "react-router-dom"
import UserStakedInfo from "../UserStakedInfo"
import WithdrawAll from "../WithdrawAll"
import BoxStake from "../BoxStake"
import StakeTable from "../StakeTable"
import StakedInfo from "../StakedInfo"
import { PoolIcon } from "@components/Icons"
import useConnectPhantom from "../useConnectPhantom"
import useGetStakedAmount from "../useGetStakedAmount"
import useGetUnbondingList from "../StakeTable/useGetUnbondingList"
import { useEffect } from "react"
import { StakeTokenAddress } from ".."
import { PATH_NAMES } from "@constants/index"
import { getInfoTokenByAddress } from "../helpers"

const SimpleStaking = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const navigate = useNavigate()
  const { isConnectWallet } = useConnectPhantom()
  const { total, getStakedAmount, totalStakeAll, getTotalStakeAll } =
    useGetStakedAmount()
  const { list, getListUnbonding } = useGetUnbondingList()
  useEffect(() => {
    if (!tokenAddress)
      navigate(`${PATH_NAMES.STAKING}?token=${StakeTokenAddress.BlackRack}`)
  }, [])
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  return (
    <>
      <div>
        <p className="text-[36px] font-semibold max-md:text-[22px]">
          {tokenInfo?.label}'s Simple Staking
        </p>
        <p className="text-14 text-mercury-700">
          Stake your holdings today to earn revenue shares and additional
          benefits.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-8 max-md:mt-6 max-md:flex-col-reverse">
        <div className="w-[calc(60%-16px)] max-md:w-full">
          {isConnectWallet ? (
            <>
              <UserStakedInfo total={total} />
              <WithdrawAll />
              <StakeTable list={list} getListUnbonding={getListUnbonding} />
            </>
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-[22px] border-1 border-dashed border-mercury-400 bg-mercury-70">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-md border-1 border-mercury-300 bg-mercury-100">
                <PoolIcon />
              </div>
              <p className="mt-2 font-medium text-mercury-950">No staking</p>
              <p className="text-14 text-mercury-700">
                Your staking status will appear here.
              </p>
            </div>
          )}
        </div>
        <div className="w-[calc(40%-16px)] max-md:w-full">
          <StakedInfo total={totalStakeAll} />
          <BoxStake
            total={total}
            fetchTotal={() => {
              getStakedAmount()
              getTotalStakeAll()
              getListUnbonding()
            }}
          />
        </div>
      </div>
    </>
  )
}

export default SimpleStaking
