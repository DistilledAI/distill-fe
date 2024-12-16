import { loadingButtonIcon } from "@assets/svg"
import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useWallet } from "@solana/wallet-adapter-react"
import { numberWithCommas, toBN } from "@utils/format"
import BigNumber from "bignumber.js"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { memo, useState } from "react"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "."
import { DECIMAL_BTC, DECIMAL_SHOW, DECIMAL_SPL } from "../constants"
import { CalculatingCardContent } from "./CalculatingCardContent"
import MaxBettedInfo from "./MaxBettedInfo"

const ExpireCardContent = ({ roundItem }: { roundItem: any }) => {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [isClaimed, setIsClaimed] = useState(false)
  const isUnDrawn = !!roundItem.outcome.undrawn
  const isDown = !!roundItem.outcome.down
  const isDraw =
    !!roundItem.outcome.invalid ||
    !!roundItem.outcome.same ||
    !!roundItem.outcome.undrawn
  const isUp = !!roundItem.outcome.up

  //max predict
  const typeMaxBet = roundItem?.predict?.action

  const userBetUp = roundItem.userOrder?.outcome?.up
  const userBetDown = roundItem.userOrder?.outcome?.down
  // !isUnDrawn &&
  const isClaimable = userBetUp || userBetDown
  //  &&
  // (isDraw || (userBetDown && isDown) || (userBetUp && isUp))

  const downAmount = roundItem?.downAmount || 0
  const upAmount = roundItem?.upAmount || 0
  const total = new BigNumber(downAmount).plus(upAmount)
  const settlePrice = new BigNumber(roundItem?.settlePrice || 0)
    .div(10 ** DECIMAL_BTC)
    .toNumber()
  const lockPrice = new BigNumber(roundItem?.lockPrice || 0).toNumber()

  const upOffset = !toBN(upAmount).isEqualTo(0)
    ? numberWithCommas(total.div(upAmount).toNumber())
    : numberWithCommas(
        total.div(10 ** DECIMAL_SPL).isEqualTo(0)
          ? 1
          : total.div(10 ** DECIMAL_SPL).toNumber(),
      )
  const downOffset = !toBN(downAmount).isEqualTo(0)
    ? numberWithCommas(total.div(downAmount).toNumber())
    : numberWithCommas(
        total.div(10 ** DECIMAL_SPL).isEqualTo(0)
          ? 1
          : total.div(10 ** DECIMAL_SPL).toNumber(),
      )

  const priceChange = new BigNumber(settlePrice).minus(lockPrice).toNumber()

  const isInvalid = !!roundItem?.outcome?.undrawn || !!roundItem.outcome.invalid
  // if (isUnDrawn) {
  //   return <CalculatingCardContent roundItem={roundItem} />
  // }

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      {userBetUp && (
        <div className={twMerge("p-3 text-white", userBetUp && "bg-green-500")}>
          USER BET UP: {String(userBetUp)}
        </div>
      )}
      {userBetDown && (
        <div className={twMerge("p-3 text-white", userBetDown && "bg-red-500")}>
          USER BET DOWN: {String(userBetDown)}
        </div>
      )}
      {isInvalid && (
        <div
          className={twMerge(
            "absolute left-1/2 top-0 flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-sm border border-[#080A14] bg-[#E8E9EE] p-[6px] text-[12px] text-[#080A14] shadow shadow-[#rgba(0,_0,_0,_0.16)]",
          )}
        >
          <CloseFilledIcon size={12} color="#080A14" />
          <span className="ml-1">CANCELED</span>
        </div>
      )}
      <div
        className={twMerge(
          "mb-4 rounded-lg border border-[#9FF4CF] bg-[#080A14] p-4",
          // FIXME: realtime price check
          isDown && "border-[#E75787]",
          isDraw && "border-[#1A1C28]",
        )}
      >
        <div className="mb-2 text-[12px] text-[#9192A0]">Last Price</div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-[24px] font-medium text-[#E8E9EE]">
            ${numberWithCommas(settlePrice)}
          </div>

          <div
            className={twMerge(
              "flex h-5 items-center justify-center rounded-sm bg-[#9FF4CF] p-1 text-[12px] text-[#052E1C]",
              // FIXME: realtime price check
              isDown && "bg-[#E75787] text-[#080A14]",
              isDraw && "bg-[#1A1C28] text-[#585A6B]",
            )}
          >
            {isDraw
              ? "$0.00"
              : isDown
                ? `-$${numberWithCommas(
                    new BigNumber(priceChange).multipliedBy(-1).toNumber(),
                    undefined,
                    { maximumFractionDigits: DECIMAL_SHOW },
                  )}`
                : `+$${numberWithCommas(
                    new BigNumber(priceChange).toNumber(),
                    undefined,
                    { maximumFractionDigits: DECIMAL_SHOW },
                  )}`}
          </div>
        </div>
      </div>
      <div className="mb-6 w-full">
        <div
          className={twMerge(
            "mb-1 flex items-center justify-between rounded-t-lg bg-[rgba(159,_244,_207,_0.16)] p-3",
            (isDraw || isDown) && "bg-[#1A1C28]",
          )}
        >
          <div className="flex items-center">
            <span
              className={twMerge(
                "mr-2 text-[14px] text-[#9FF4CF]",
                !isUp && "bg-[#1A1C28] text-[#585A6B]",
              )}
            >
              UP
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {isDraw ? 1 : upOffset}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MaxBettedInfo
              betType={typeMaxBet}
              typeBet={BET_TYPE.UP}
              isExpired
            />
            <ArrowUpFilledIcon
              bgColor={!isUp ? "#585A6B" : "#9FF4CF"}
              size={18}
            />
          </div>
        </div>
        <div
          className={twMerge(
            "flex items-center justify-between rounded-b-lg bg-[#1A1C28] p-3",
            isDown && "bg-[rgba(231,87,135,0.16)]",
            isDraw && "bg-[#1A1C28]",
          )}
        >
          <div className="flex items-center">
            <span
              className={twMerge(
                !isDown && "mr-2 text-[14px] text-[#585A6B]",
                isDown && "mr-2 text-[14px] text-[#E75787]",
              )}
            >
              DOWN
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {isDraw ? 1 : downOffset}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MaxBettedInfo
              betType={typeMaxBet}
              typeBet={BET_TYPE.DOWN}
              isExpired
            />
            <div className="rotate-180">
              <ArrowUpFilledIcon
                bgColor={isDown ? "#E75787" : "#585A6B"}
                size={18}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Locked Price</span>
          <span className="text-[#E8E9EE]">${numberWithCommas(lockPrice)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">
            {numberWithCommas(total.div(10 ** DECIMAL_SPL).toNumber())} $MAX
          </span>
        </div>
      </div>
      {isClaimable && (
        <button
          disabled={!wallet || loading}
          onClick={async () => {
            try {
              setLoading(true)

              const web3Solana = new Web3SolanaProgramInteraction()
              const res = await web3Solana.claimOrder(
                wallet,
                roundItem.id.toNumber(),
              )

              if (res) {
                setIsClaimed(true)
              }
            } catch (error) {
              console.log("claim error", error)
            } finally {
              setLoading(false)
            }
          }}
          className="mt-4 w-full cursor-pointer rounded border-[2px] border-solid border-[rgba(255,255,255,0.25)] p-1 uppercase transition-all duration-150 ease-in hover:border-[rgba(255,255,255)] disabled:cursor-not-allowed disabled:opacity-75"
        >
          <div className="flex items-center justify-center gap-2 rounded bg-white px-6 py-2 uppercase text-[#080A14]">
            {loading && <img src={loadingButtonIcon} alt="loadingButtonIcon" />}
            {!isInvalid ? "Collect winnings" : "WITHDRAW"}
          </div>
        </button>
      )}
    </div>
  )
}

export default memo(ExpireCardContent)
