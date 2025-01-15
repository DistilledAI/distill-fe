// import { maxAvatar } from "@assets/images"
// import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { useCoinGeckoPrices } from "@hooks/useCoingecko"
import { numberWithCommas, toBN } from "@utils/format"
import { useSearchParams } from "react-router-dom"
import { getInfoTokenByAddress } from "../helpers"
import { StakeTokenAddress } from ".."
import { useDisclosure } from "@nextui-org/react"
import ClaimReward from "./ClaimReward"

const UserStakedInfo = ({ total }: { total: number }) => {
  const { isOpen, onClose, onOpenChange } = useDisclosure()
  const { data: prices } = useCoinGeckoPrices()
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
        <p className="text-24 font-semibold text-brown-600 max-md:text-20">
          $0
        </p>
        <p className="text-14 text-brown-600">0 Asset</p>
        {/* <Popover placement="right">
          <PopoverTrigger>
            <div className="inline-flex cursor-pointer items-center gap-1">
              <div className="item-center flex">
                <img
                  className="h-4 w-4 rounded-full object-cover"
                  src={maxAvatar}
                />
                <img
                  className="-ml-2 h-4 w-4 rounded-full object-cover"
                  src={maxAvatar}
                />
                <img
                  className="-ml-2 h-4 w-4 rounded-full object-cover"
                  src={maxAvatar}
                />
              </div>
              <p className="text-14 text-brown-600">21 Assets</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="w-[280px] rounded-[22px] bg-white p-4 max-md:w-[210px] max-md:p-2">
              <p className="mb-3 text-14 font-medium text-mercury-700">
                21 Assets
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={maxAvatar}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    <p className="text-14 font-semibold text-mercury-950">
                      1,234,544 MAX
                    </p>
                  </div>
                  <p className="text-14 text-brown-500">$89,242</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={maxAvatar}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    <p className="text-14 font-semibold text-mercury-950">
                      1,234,544 MAX
                    </p>
                  </div>
                  <p className="text-14 text-brown-500">$89,242</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={maxAvatar}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    <p className="text-14 font-semibold text-mercury-950">
                      1,234,544 MAX
                    </p>
                  </div>
                  <p className="text-14 text-brown-500">$89,242</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover> */}
      </div>
      <div className="cursor-default font-semibold text-brown-600 opacity-65 max-md:mt-3 max-md:w-full max-md:text-center max-md:text-14">
        Claim Rewards
      </div>
      {isOpen && (
        <ClaimReward
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}
    </div>
  )
}

export default UserStakedInfo
