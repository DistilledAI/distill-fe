import { envConfig } from "@configs/env"
import { CoinGeckoPrices } from "@hooks/useCoingecko"
import { CoinGeckoId, fetchRetry } from "@oraichain/oraidex-common"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { getTokensPriceByIds } from "@utils/index"
import { useEffect, useState } from "react"
import { SPL_DECIMAL } from "../config"
import { useSearchParams } from "react-router-dom"
import { getVaultAddress } from "./helpers"
import { StakeTokenAddress } from ".."

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

export const LIMIT = 20

const useGetRewardStrongVault = (
  coingeckoPrices: CoinGeckoPrices<CoinGeckoId> | undefined,
) => {
  const [rewardList, setRewardList] = useState<RewardByToken[]>([])
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [isLastPage, setIsLastPage] = useState(false)
  const wallet = useWallet()
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const strongboxVaultAddr = getVaultAddress(tokenAddress as StakeTokenAddress)

  const getListReward = async ({
    next,
    rewardToken,
  }: {
    next: null | string
    rewardToken?: string
  }) => {
    try {
      if (next === null) {
        setNextPage(null)
        setIsLastPage(false)
      }
      if (!wallet.publicKey?.toBase58()) return
      if (loading) return
      setLoading(true)
      const staker = wallet.publicKey?.toBase58()
      const fetchURL = `${envConfig.stakingAirdropBackendUrl}/airdrops/vaults/${strongboxVaultAddr}/claimants/${staker}?limit=${LIMIT}`
      const getURLByNextPage = (url: string) => {
        if (rewardToken)
          return `${envConfig.stakingAirdropBackendUrl}/airdrops/vaults/${strongboxVaultAddr}/claimants/${staker}?rewardToken=${rewardToken}`
        return next ? `${url}&nextKey=${next}` : url
      }
      const res = await fetchRetry(getURLByNextPage(fetchURL))
      const resJson: {
        nextKey: string | null
        merkleClaims: RewardByToken[]
      } = await res.json()
      if (resJson.nextKey !== null) setNextPage(resJson.nextKey)
      else setIsLastPage(true)
      const listRewards: RewardByToken[] = resJson.merkleClaims
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
        return {
          ...item,
          amountUsd: toUsd,
        }
      })
      if (next === null) setRewardList(rewards)
      else setRewardList((prevData) => [...prevData, ...rewards])
    } catch (error) {
      console.log("get list rewards strongbox vault error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListReward({ next: null })
  }, [wallet.publicKey])

  return {
    loading,
    rewardList,
    isLastPage,
    nextPage,
    getListReward,
  }
}

export default useGetRewardStrongVault
