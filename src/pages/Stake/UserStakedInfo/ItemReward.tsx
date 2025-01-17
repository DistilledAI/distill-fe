import { GiftBorderIcon } from "@components/Icons"
import { Button } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { TokenInfo } from "./useGetListToken"
import { toBN } from "@utils/format"
import { SPL_DECIMAL } from "../config"
import { getTokenInfoFromContract } from "./helpers"
import { PublicKey } from "@solana/web3.js"
import { fetchJSONDataFromUrl, formatNumberWithComma } from "@utils/index"
import useClaim from "./useClaim"

const ItemReward: React.FC<{
  className?: string
  item: TokenInfo
  refresh: (rewardToken: string) => void
}> = ({ className, item, refresh }) => {
  const [isClaimed, setIsClaimed] = useState(false)
  const { isLoading, handleClaim } = useClaim()
  const [url, setUrl] = useState("")
  const [ticket, setTicket] = useState("--")

  const handleGetUrl = async (link: string) => {
    const resUrl = await fetchJSONDataFromUrl(link)
    if (resUrl && resUrl.image) setUrl(resUrl.image)
  }

  const amount = toBN(item.amount)
    .div(10 ** SPL_DECIMAL)
    .toFixed(6)

  const getInfoFromContract = async () => {
    try {
      const res = await getTokenInfoFromContract(
        new PublicKey(item.rewardToken),
      )
      setTicket(res?.symbol || "-")
      if (res?.uri) handleGetUrl(res.uri)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!item.url) getInfoFromContract()
  }, [item.url])

  const imgUrl = item.url || url

  if (isClaimed) return null

  return (
    <div
      className={twMerge("mb-4 flex items-center justify-between", className)}
    >
      <div className="flex items-center gap-2">
        {imgUrl ? (
          <img
            src={item.url || url}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-mercury-300 object-cover"></div>
        )}
        <div>
          <p className="text-14 font-semibold text-mercury-950">
            {formatNumberWithComma(toBN(amount).toNumber())}{" "}
            {item.ticker || ticket}
          </p>
          <p className="text-13 font-medium leading-4 text-brown-500">
            {item.amountUsd && item.amountUsd !== 0
              ? `$${formatNumberWithComma(item.amountUsd)}`
              : "$ --"}
          </p>
        </div>
      </div>
      <Button
        isLoading={isLoading}
        onPress={() => {
          if (isLoading) return
          handleClaim({
            callbackDone: () => {
              setIsClaimed(true)
              refresh(item.rewardToken)
            },
            rewardToken: item.rewardToken,
            randomKp: item.randomKp,
          })
        }}
        className="h-8 gap-1 rounded-full bg-[#2CB34E] text-14 font-semibold text-white"
      >
        <GiftBorderIcon />
        Claim
      </Button>
    </div>
  )
}

export default ItemReward
