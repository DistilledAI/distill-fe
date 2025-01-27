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
import ItemRewardPreview from "./ItemRewardPreview"

const UserStakedInfo = ({ total }: { total: number }) => {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()
  const { data: prices } = useCoinGeckoPrices()
  const { rewardList, getListReward, nextPage, isLastPage, loading } =
    useGetRewardStrongVault(prices)
  const { tokens, setTokens } = useGetListTokenWithInfo(rewardList)
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

  const hasReward = tokens.length > 0
  const isHasVault =
    tokenInfo?.address === StakeTokenAddress.Degenerator ||
    tokenInfo?.address === StakeTokenAddress.BlackRack

  const openModal = () => {
    getListReward({ next: null })
    onOpen()
  }

  return (
    <div className="flex flex-wrap items-center justify-between rounded-[14px] border-1 border-[#A88E67] bg-brown-50 px-6 py-4">
      <div>
        <p className="text-14 font-medium text-mercury-700">Staked Amount</p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          {totalPriceUsd === 0 ? "$ --" : `$${numberWithCommas(totalPriceUsd)}`}
        </p>
        <p className="text-14 text-brown-600">
          {numberWithCommas(total)} {tokenInfo?.tokenName}
        </p>
      </div>
      <div>
        <p className="text-14 font-medium text-mercury-700">
          Claimable Rewards
        </p>
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          $ --
        </p>
        {isHasVault && hasReward ? (
          <div
            onClick={() => {
              if (hasReward) openModal()
            }}
            className={twMerge(
              "inline-flex items-center gap-1",
              hasReward && "cursor-pointer",
            )}
          >
            {hasReward ? (
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
          </div>
        ) : (
          <p className="text-14 text-brown-600">0 Asset</p>
        )}
      </div>
      <div
        onClick={() => {
          if (hasReward && isHasVault) openModal()
        }}
        className={twMerge(
          "font-semibold text-brown-600 opacity-65 max-md:mt-3 max-md:w-full max-md:text-center max-md:text-14",
          hasReward && isHasVault && "cursor-pointer opacity-100",
        )}
      >
        Claim Rewards
      </div>
      {isOpen && (
        <ClaimReward
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          loading={loading}
          loadMore={() => getListReward({ next: nextPage })}
          hasMore={!isLastPage}
          getListReward={getListReward}
          tokens={tokens}
          refresh={(rewardToken) =>
            setTokens((prev) =>
              prev.filter((item) => item.rewardToken !== rewardToken),
            )
          }
        />
      )}
    </div>
  )
}

export default UserStakedInfo
