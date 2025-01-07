import { solanaLogo } from "@assets/images"
import DisplayWrapper from "../Components/DisplayWrapper"
import CmdTokenInfo from "../Components/TokenInfo"
import React from "react"
import { ICmdMessage } from "@pages/MyPrivateRoom/CmdMessageProvider"
import { LIST_TOKEN_SWAP } from "@components/CommandChat/Actions/SwapToken"
import { Link } from "react-router-dom"
import { CircleCheckFilled } from "@components/Icons"
import { twMerge } from "tailwind-merge"
import { Spinner } from "@nextui-org/react"
import useSwapSubmit from "./useSwapSubmit"
import { useCoinGeckoPrices } from "@hooks/useCoingecko"
import { toBN } from "@utils/format"

const SwapToken: React.FC<{
  data: ICmdMessage
}> = ({ data }) => {
  const { handleSubmit, isLoading, txh } = useSwapSubmit()
  const { data: prices } = useCoinGeckoPrices()
  const fromTokenInfo = LIST_TOKEN_SWAP.find(
    (item) => item.id === data.swap?.fromToken,
  )
  const toTokenInfo = LIST_TOKEN_SWAP.find(
    (item) => item.id === data.swap?.toToken,
  )
  const fromTokenPrice = fromTokenInfo
    ? Number(prices?.[fromTokenInfo?.coinGeckoId] || 0)
    : 0
  const toTokenPrice = toTokenInfo
    ? Number(prices?.[toTokenInfo?.coinGeckoId] || 0)
    : 0
  const toAmount =
    fromTokenPrice && toTokenPrice
      ? toBN(
          toBN(data.swap?.amount || 0)
            .multipliedBy(fromTokenPrice)
            .div(toTokenPrice),
        ).toFixed(6)
      : "0"

  return (
    <DisplayWrapper>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 pt-1">
          <p className="font-semibold">Swap</p>
          <CmdTokenInfo
            tokenAva={fromTokenInfo?.avatar as string}
            networkAva={solanaLogo}
            tokenName={fromTokenInfo?.title as string}
            amount={data.swap?.amount as string}
            usdPrice={fromTokenPrice}
          />
          <p className="font-semibold">to</p>
          <CmdTokenInfo
            tokenAva={toTokenInfo?.avatar as string}
            networkAva={solanaLogo}
            amount={toAmount}
            tokenName={toTokenInfo?.title as string}
            usdPrice={toTokenPrice}
          />
        </div>
        {txh ? (
          <div className="flex items-center gap-1">
            <CircleCheckFilled size={20} />
            <Link
              className="underline"
              target="_blank"
              to={`https://solscan.io/tx/${txh}`}
            >
              Transaction details
            </Link>
          </div>
        ) : (
          <div
            onClick={() => {
              if (isLoading) return
              handleSubmit({
                toToken: data.swap?.toToken,
                fromToken: data.swap?.fromToken,
                amount: data.swap?.amount,
              })
            }}
            className={twMerge(
              "item flex cursor-pointer gap-1 font-semibold text-brown-600 underline",
              isLoading && "opacity-70",
            )}
          >
            {isLoading && <Spinner size="sm" />} Approve to do this
          </div>
        )}
      </div>
    </DisplayWrapper>
  )
}

export default SwapToken
