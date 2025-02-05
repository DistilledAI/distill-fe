import { useNavigate, useSearchParams } from "react-router-dom"
import UserStakedInfo from "../UserStakedInfo"
import WithdrawAll from "../WithdrawAll"
import BoxStake from "../BoxStake"
import StakeTable from "../StakeTable"
import StakedInfo from "../StakedInfo"
import { ChartIcon, PoolIcon, TimeIcon } from "@components/Icons"
import useConnectPhantom from "../useConnectPhantom"
import useGetStakedAmount from "../useGetStakedAmount"
import useGetUnbondingList from "../StakeTable/useGetUnbondingList"
import { useEffect } from "react"
import { StakeTokenAddress } from ".."
import { PATH_NAMES } from "@constants/index"
import { getInfoTokenByAddress } from "../helpers"
import { GiftIcon } from "@components/Icons/RewardsIcons"

const SimpleStaking = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const navigate = useNavigate()
  const { isConnectWallet } = useConnectPhantom()
  const { total, getStakedAmount, totalStakeAll, getTotalStakeAll, endDate } =
    useGetStakedAmount()
  const { list, getListUnbonding } = useGetUnbondingList()
  useEffect(() => {
    if (!tokenAddress)
      navigate(`${PATH_NAMES.STAKING}?token=${StakeTokenAddress.BlackRack}`)
  }, [])
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)
  const isGuardToken = tokenAddress === StakeTokenAddress.Guard

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
              {!isGuardToken && (
                <>
                  <WithdrawAll tokenAddress={tokenAddress} />
                  <StakeTable list={list} getListUnbonding={getListUnbonding} />
                </>
              )}
              {isGuardToken && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px]">
                    <GiftIcon color="#A2845E" size={24} /> What Are The
                    Incentives for Staking?
                  </div>
                  <div className="mt-4">
                    <p className="text-18 font-semibold text-[#2CB34E] max-md:text-15">
                      Profit Distribution
                    </p>
                    <p className="font-medium text-mercury-800 max-md:text-14">
                      Rewards come from the stakers’ reward pool, funded by
                      profits from the DCA fund after expiration.
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-18 font-semibold text-[#2CB34E] max-md:text-15">
                      Token Contributions
                    </p>
                    <p className="font-medium text-mercury-800 max-md:text-14">
                      A portion of staked $GUARD tokens from the staking vault
                      also contributes to the reward pool.
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-18 font-semibold text-[#2CB34E] max-md:text-15">
                      Revenue Streams
                    </p>
                    <p className="font-medium text-mercury-800 max-md:text-14">
                      Additional funding comes from revenue-generating products.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px]">
                    <TimeIcon /> How Are Rewards Distributed?
                  </div>
                  <p className="mt-1 font-medium text-mercury-800 max-md:text-14">
                    Vault $GUARD stakers receive rewards based on their staked
                    weight{" "}
                    <span className="font-semibold text-mercury-950">
                      after the DCA fund expires
                    </span>
                    .
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px] max-md:leading-5">
                    <ChartIcon /> Can I withdraw my staked $GUARD anytime?
                  </div>
                  <p className="mt-1 font-medium text-mercury-800 max-md:text-14">
                    No, staked $GUARD in the vault cannot be claimed to{" "}
                    <span className="font-semibold text-mercury-950">
                      ensure long-term sustainability
                    </span>
                    .
                  </p>
                </div>
              )}
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
            endDate={endDate}
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
