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
import { checkHasPeriodForUI, getInfoTokenByAddress } from "../helpers"
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
  const hasPeriod = checkHasPeriodForUI(tokenAddress as StakeTokenAddress)

  const getDescription = (tokenAddress: StakeTokenAddress) => {
    switch (tokenAddress) {
      case StakeTokenAddress.Banker:
        return (
          <div className="mb-6 mt-6">
            <p className="mb-4 font-semibold text-red-600">
              Early stakers within the first week (until Feb 14, 2025 15:00 UTC)
              will receive a 10% capital bonus on the fund distribution date.
            </p>
            <div className="flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px]">
              <GiftIcon color="#A2845E" size={24} /> What Are The Incentives for
              Staking?
            </div>
            <div className="mt-4">
              <p className="mb-1 text-18 font-semibold text-[#2CB34E] max-md:text-15">
                Profit Distribution
              </p>
              <div className="pl-3">
                <p className="relative pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  Upon fund maturity, stakers will receive a share of all
                  revenue, including the full capital amount.
                </p>
                <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  Additionally, any revenue generated by $BANKER may be
                  distributed to stakers on a monthly basis, subject to a
                  community vote based on the allocation of acquired tokens.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-18 font-semibold text-[#2CB34E] max-md:text-15">
                DAO Governance
              </p>
              <div className="pl-3">
                <p className="relative pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  The community retains decision-making authority over key
                  aspects, including development, fund distribution, and
                  strategic proposals, through DAO voting.
                </p>
                <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  Stakers play an integral role in shaping the platform’s
                  future.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-18 font-semibold text-[#2CB34E] max-md:text-15">
                Development Initiatives
              </p>
              <div className="pl-3">
                <p className="relative pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  The community will collectively determine the direction of
                  $BANKER’s development, including potential initiatives such as
                  educational programs focused on active trading strategies.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-18 font-semibold text-[#2CB34E] max-md:text-15">
                Ecosystem Support
              </p>
              <div className="pl-3">
                <p className="relative pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  This initiative strengthens the MAX ecosystem by incorporating
                  Dollar-Cost Averaging (DCA) into MAX and demonstrating a
                  successful, community-driven DeFi model.
                </p>
                <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                  Early stakers who commit funds within the first week will
                  receive a 10% capital bonus on the fund distribution date.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px]">
              <TimeIcon /> How Are Rewards Distributed?
            </div>
            <div className="pl-3">
              <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                Passive income and potential earnings will be allocated based on
                community consensus.
              </p>
              <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                Upon dissolution of the agent, as decided by community vote, the
                full fund—including initial capital—will be distributed in a
                currency determined by the community.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px] max-md:leading-5">
              <ChartIcon /> Can I withdraw my staked $BANKER anytime?
            </div>
            <div className="pl-3">
              <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                To ensure long-term sustainability, staked $BANKER tokens within
                the vault cannot be withdrawn. In return, all profits and
                revenues will be distributed to locked stakers.
              </p>
              <p className="relative mt-1 pl-3 font-medium text-mercury-800 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-mercury-800 max-md:text-14">
                Once a $BANKER, always a $BANKER.
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className="mb-6 mt-6">
            <div className="flex items-center gap-2 text-[22px] font-semibold max-md:text-[18px]">
              <GiftIcon color="#A2845E" size={24} /> What Are The Incentives for
              Staking?
            </div>
            <div className="mt-4">
              <p className="text-18 font-semibold text-[#2CB34E] max-md:text-15">
                Profit Distribution
              </p>
              <p className="font-medium text-mercury-800 max-md:text-14">
                Rewards come from the stakers’ reward pool, funded by profits
                from the DCA fund after expiration.
              </p>
            </div>
            <div className="mt-3">
              <p className="text-18 font-semibold text-[#2CB34E] max-md:text-15">
                Token Contributions
              </p>
              <p className="font-medium text-mercury-800 max-md:text-14">
                A portion of staked $GUARD tokens from the staking vault also
                contributes to the reward pool.
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
              Vault $GUARD stakers receive rewards based on their staked weight{" "}
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
        )
    }
  }

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
              {hasPeriod && (
                <>
                  <WithdrawAll tokenAddress={tokenAddress} />
                  <StakeTable list={list} getListUnbonding={getListUnbonding} />
                </>
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
          {!hasPeriod && getDescription(tokenAddress as StakeTokenAddress)}
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
