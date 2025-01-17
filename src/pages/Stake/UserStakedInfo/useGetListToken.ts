import { useEffect, useState } from "react"
import { getAgentCoinsInfo, getMemeCoinsInfo } from "./helpers"
import { RewardByToken } from "./useGetListReward"

export interface TokenInfo extends RewardByToken {
  name: string | null
  ticker: string | null
  url: string | null
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
      }))
      setTokens(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (rewardList.length === 0) return
    getListToken()
  }, [rewardList])

  return { tokens, loading, setTokens }
}

export default useGetListTokenWithInfo
