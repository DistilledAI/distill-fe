import { useEffect, useState } from "react"
import { DECIMAL_8, SPL_DECIMAL } from "../config"
import { getAgentCoinsInfo, getMemeCoinsInfo } from "./helpers"
import { RewardByToken } from "./useGetListReward"

export interface TokenInfo extends RewardByToken {
  name: string | null
  ticker: string | null
  url: string | null
  decimals: number
}

export const WRAPPED_BTC_ADDRESSES: string[] = [
  "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
]

export const isWrappedBTC = (address: string | null): boolean => {
  if (!address) return false
  return WRAPPED_BTC_ADDRESSES.some(
    (btcAddr) => btcAddr.toLowerCase() === address.toLowerCase(),
  )
}

const useGetListTokenWithInfo = (rewardList: RewardByToken[]) => {
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState<TokenInfo[]>([])

  const getListToken = async () => {
    try {
      setLoading(true)
      const [agentCoins, memeCoins] = await Promise.all([
        getAgentCoinsInfo({ limit: 100, listed: "listed" }),
        getMemeCoinsInfo({ limit: 100, listed: "listed" }),
      ])

      const coins = [...agentCoins.coins, ...memeCoins.coins]
      const getTokenInfo = (address: string) =>
        coins.find((coin) => coin.token === address)

      const data: TokenInfo[] = rewardList.map((reward) => ({
        ...reward,
        name: getTokenInfo(reward.rewardToken)?.name || null,
        ticker: getTokenInfo(reward.rewardToken)?.ticker || null,
        url: getTokenInfo(reward.rewardToken)?.metadata?.image || null,
        decimals:
          (getTokenInfo(reward.rewardToken)?.decimals ??
          isWrappedBTC(reward.rewardToken))
            ? DECIMAL_8
            : SPL_DECIMAL,
      }))
      setTokens(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (rewardList.length === 0) {
      return setTokens([])
    }
    getListToken()
  }, [rewardList])

  return { tokens, loading, setTokens }
}

export default useGetListTokenWithInfo
