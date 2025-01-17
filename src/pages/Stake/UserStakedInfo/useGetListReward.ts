import { envConfig } from "@configs/env"
import { CoinGeckoPrices } from "@hooks/useCoingecko"
import { CoinGeckoId, fetchRetry } from "@oraichain/oraidex-common"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { getTokensPriceByIds } from "@utils/index"
import { useEffect, useState } from "react"
import { SPL_DECIMAL } from "../config"
import { GNRT_STAKING_VAULT } from "./constants"

export type RewardByToken = {
  randomKp: string
  index: string
  claimant: string
  rewardToken: string
  stakingVault: string
  amount: number
  claimed: boolean
  amountUsd?: number
}

const useGetRewardStrongVault = (
  coingeckoPrices: CoinGeckoPrices<CoinGeckoId> | undefined,
) => {
  const [rewardList, setRewardList] = useState<RewardByToken[]>([])
  const [totalClaimable, setTotalClaimable] = useState(0)
  const [loading, setLoading] = useState(true)
  const wallet = useWallet()
  const strongboxVaultAddr = GNRT_STAKING_VAULT

  const getListReward = async () => {
    try {
      if (!wallet.publicKey?.toBase58()) return
      let totalRewardUsd = 0
      const staker = wallet.publicKey?.toBase58()
      const res = await fetchRetry(
        `${envConfig.stakingAirdropBackendUrl}/airdrops/vaults/${strongboxVaultAddr}/claimants/${staker}`,
      )
      const listRewards: RewardByToken[] = await res.json()
      const prices = await getTokensPriceByIds(
        listRewards.map((item) => item.rewardToken),
        coingeckoPrices,
      )
      const rewards = listRewards.map((item) => {
        const toUsd = toBN(
          toBN(item.amount)
            .div(10 ** SPL_DECIMAL)
            .multipliedBy(prices[item.rewardToken] ?? 0)
            .toFixed(6),
        ).toNumber()
        totalRewardUsd += toUsd
        return {
          ...item,
          amountUsd: toUsd,
        }
      })

      setRewardList(rewards)
      setTotalClaimable(totalRewardUsd)
    } catch (error) {
      console.log("get list rewards strongbox vault error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListReward()
  }, [wallet.publicKey])

  return {
    loading,
    rewardList,
    totalClaimable,
    getListReward,
  }
}

export default useGetRewardStrongVault
