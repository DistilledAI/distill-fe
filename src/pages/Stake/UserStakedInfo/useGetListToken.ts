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
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  "So11111111111111111111111111111111111111112",
  "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
  "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
]

const useGetListTokenWithInfo = (rewardList: RewardByToken[]) => {
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState<TokenInfo[]>([])

  const isWrappedBTC = (address: string | null): boolean => {
    if (!address) return false
    return WRAPPED_BTC_ADDRESSES.some(
      (btcAddr) => btcAddr.toLowerCase() === address.toLowerCase(),
    )
  }

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
