import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { TIMER } from "@hooks/useCountdown"
import { Divider, Skeleton } from "@nextui-org/react"
import { DECIMAL_BTC, DECIMAL_SPL } from "@pages/BetingPage/constants"
import { useGetRoundDataById } from "@pages/BetingPage/hooks/useGetRoundData"
import { numberWithCommas, toBN } from "@utils/format"
import BigNumber from "bignumber.js"
import { memo, useState } from "react"
import { twMerge } from "tailwind-merge"
import TimeProgress from "../TimeProgress"
import LiveCardPrice from "./LivePrice"
import { CalculatingCardContent } from "../CalculatingCardContent"

const CardLiveBet = ({ roundItem }: { roundItem: any; currentRound?: any }) => {
  const { liveRoundData } = useGetRoundDataById(roundItem.round)

  // const [isEnd, setIsEnd] = useState(false)
  // const startTime = roundItem?.start
  //   ? new BigNumber(roundItem?.start).toNumber()
  //   : Math.floor(Date.now() / TIMER.MILLISECOND)
  // const endTime = roundItem?.end
  //   ? new BigNumber(roundItem?.end).toNumber()
  //   : Math.floor(Date.now() / TIMER.MILLISECOND)

  // const userBetUp = roundItem?.userOrder?.outcome?.up
  // const userBetDown = roundItem?.userOrder?.outcome?.down
  // const userBetAmount = toBN(roundItem?.userOrder?.amount || 0)
  //   .div(10 ** DECIMAL_SPL)
  //   .toNumber()

  // const downAmount = roundItem?.downAmount || 0
  // const upAmount = roundItem?.upAmount || 0
  // const total = new BigNumber(downAmount).plus(upAmount)
  // const lockPrice = new BigNumber(roundItem?.lockPrice || 0).toNumber()

  const [isEnd, setIsEnd] = useState(false)
  const startTime = liveRoundData?.lockTime
    ? new BigNumber(liveRoundData?.lockTime).toNumber()
    : Math.floor(Date.now() / TIMER.MILLISECOND)
  const endTime = new BigNumber(startTime)
    // .plus(toBN(liveRoundData.lockTime).minus(liveRoundData.startTime))
    .plus(300)
    .toNumber()

  const userBetUp = liveRoundData?.userOrder?.outcome?.up
  const userBetDown = liveRoundData?.userOrder?.outcome?.down
  const userBetAmount = toBN(liveRoundData?.userOrder?.amount || 0)
    .div(10 ** DECIMAL_SPL)
    .toNumber()

  const downAmount = liveRoundData?.downAmount || 0
  const upAmount = liveRoundData?.upAmount || 0
  const total = new BigNumber(downAmount).plus(upAmount)
  const lockPrice = new BigNumber(liveRoundData?.lockPrice || 0)
    .div(10 ** DECIMAL_BTC)
    .toNumber()

  if (isEnd) {
    const now = Date.now()

    if (now > endTime * TIMER.MILLISECOND) {
      return <CalculatingCardContent roundItem={roundItem} />
    }
  }

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      {(userBetDown || userBetUp) && (
        <div
          className={twMerge(
            "absolute left-1/2 top-0 flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-sm border border-[#080A14] bg-[#E4775D] p-[6px] text-[12px] text-[#080A14] shadow shadow-[#rgba(0,_0,_0,_0.16)]",
          )}
        >
          <CheckFilledIcon size={12} color="#080A14" />
          <span className="ml-1">ENTERED</span>
        </div>
      )}
      <TimeProgress
        startTime={startTime}
        endTime={endTime}
        onEnd={() => setIsEnd(true)}
      />
      <LiveCardPrice currentRound={liveRoundData} roundItem={roundItem} />
      <div className="mt-6 flex flex-col">
        {(userBetDown || userBetUp) && (
          <>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#9192A0]">Your position</span>
              <span className="text-[#E8E9EE]">
                {numberWithCommas(userBetAmount)} MAX
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-[#9192A0]">Your prediction</span>
              {userBetUp ? (
                <span className="text-[#9FF4CF]">UP</span>
              ) : (
                <span className="text-[#E75787]">DOWN</span>
              )}
            </div>
            <Divider className="my-3 bg-[#30344A]" />
          </>
        )}
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Locked Price</span>
          {new BigNumber(lockPrice).isEqualTo(0) ? (
            <Skeleton className="h-4 w-[40px] rounded bg-mercury-800"></Skeleton>
          ) : (
            <span className="text-[#E8E9EE]">
              ${numberWithCommas(lockPrice)}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">
            {numberWithCommas(total.div(10 ** DECIMAL_SPL).toNumber())} $MAX
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(CardLiveBet)
