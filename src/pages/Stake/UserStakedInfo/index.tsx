// import { maxAvatar } from "@assets/images"
// import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { useCoinGeckoPrices } from "@hooks/useCoingecko"
import { numberWithCommas, toBN } from "@utils/format"
import { useSearchParams } from "react-router-dom"
import { getInfoTokenByAddress } from "../helpers"
import { StakeTokenAddress } from ".."
import { useDisclosure } from "@nextui-org/react"
import ClaimReward from "./ClaimReward"
import useGetRewardStrongVault from "./useGetListReward"
import useGetListTokenWithInfo from "./useGetListToken"
import { twMerge } from "tailwind-merge"
import { formatNumberWithComma } from "@utils/index"
import ItemRewardPreview from "./ItemRewardPreview"
import { useEffect, useState } from "react"

const UserStakedInfo = ({ total }: { total: number }) => {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()
  const { data: prices } = useCoinGeckoPrices()
  const [totalToken, setTotalToken] = useState<number>(0)
  const { rewardList, totalClaimable } = useGetRewardStrongVault(prices)
  const { tokens } = useGetListTokenWithInfo(rewardList)
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)
  const tokenPrice = tokenInfo?.coinGeckoId
    ? Number(prices?.[tokenInfo.coinGeckoId] || 0)
    : 0
  const totalPriceUsd = toBN(
    toBN(tokenPrice * toBN(total).toNumber())
      .toNumber()
      .toFixed(3),
  ).toNumber()

  useEffect(() => {
    setTotalToken(tokens.length)
  }, [tokens])

  const isGNRT = tokenInfo?.address === StakeTokenAddress.Degenerator

  return (
    <div className="flex flex-wrap items-center justify-between rounded-[14px] border-1 border-[#A88E67] bg-brown-50 px-6 py-4">
      <div>
        <p className="text-14 font-medium text-mercury-700">Staked Amount</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          {totalPriceUsd === 0 ? "--" : `$${numberWithCommas(totalPriceUsd)}`}
        </p>
        <p className="text-14 text-brown-600">
          {numberWithCommas(total)} {tokenInfo?.tokenName}
        </p>
      </div>
      <div>
        <p className="text-14 font-medium text-mercury-700">
          Claimable Rewards
        </p>
        {isGNRT ? (
          <p className="text-24 font-semibold text-brown-600 max-md:text-20">
            {totalClaimable === 0
              ? "--"
              : `$${formatNumberWithComma(totalClaimable)}`}
          </p>
        ) : (
          <p className="text-24 font-semibold text-brown-600 max-md:text-20">
            --
          </p>
        )}
        {isGNRT ? (
          <div
            onClick={() => {
              if (totalToken > 0) onOpen()
            }}
            className={twMerge(
              "inline-flex items-center gap-1",
              totalToken > 0 && "cursor-pointer",
            )}
          >
            {totalToken > 0 ? (
              <div className="flex items-center">
                {[...tokens].slice(0, 3).map((item, index) => (
                  <ItemRewardPreview
                    key={item.rewardToken}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
            <p className="text-14 text-brown-600">
              {totalToken} {totalToken > 1 ? "Assets" : "Asset"}
            </p>
          </div>
        ) : (
          <p className="text-14 text-brown-600">0 Asset</p>
        )}
      </div>
      <div
        onClick={() => {
          if (totalToken > 0 && isGNRT) onOpen()
        }}
        className={twMerge(
          "font-semibold text-brown-600 opacity-65 max-md:mt-3 max-md:w-full max-md:text-center max-md:text-14",
          totalToken > 0 && isGNRT && "cursor-pointer opacity-100",
        )}
      >
        Claim Rewards
      </div>
      {isOpen && (
        <ClaimReward
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          tokens={tokens}
          refresh={() => setTotalToken((prev) => prev - 1)}
        />
      )}
    </div>
  )
}

export default UserStakedInfo
