import React, { useEffect, useState } from "react"
import { TokenInfo } from "./useGetListToken"
import { twMerge } from "tailwind-merge"
import { getTokenInfoFromContract } from "./helpers"
import { PublicKey } from "@solana/web3.js"
import { fetchJSONDataFromUrl } from "@utils/index"
import { IMAGE_TOKENS } from "./constants"

const ItemRewardPreview: React.FC<{
  item: TokenInfo
  index: number
}> = ({ item, index }) => {
  const [url, setUrl] = useState<string | null>(null)

  const handleGetUrl = async (link: string) => {
    const resUrl = await fetchJSONDataFromUrl(link)
    if (resUrl && resUrl.image) setUrl(resUrl.image)
  }

  const getInfoFromContract = async () => {
    const res = await getTokenInfoFromContract(new PublicKey(item.rewardToken))
    if (res?.uri) handleGetUrl(res.uri)
    else {
      const img = IMAGE_TOKENS.find(
        (token) => token.address === item.rewardToken,
      )?.image
      if (img) setUrl(img)
    }
  }

  useEffect(() => {
    if (!item.url) getInfoFromContract()
  }, [item.url])

  const imgUrl = item.url || url

  return imgUrl ? (
    <img
      src={imgUrl}
      className={twMerge("h-4 w-4 rounded-full", index !== 0 && "-ml-2")}
      alt="ava"
    />
  ) : (
    <div
      className={twMerge(
        "h-4 w-4 rounded-full bg-mercury-200",
        index !== 0 && "-ml-2",
      )}
    ></div>
  )
}

export default ItemRewardPreview
