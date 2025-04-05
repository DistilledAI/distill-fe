import { envConfig } from "@configs/env"
import { CoinGeckoPrices } from "@hooks/useCoingecko"
import { CoinGeckoId, fetchRetry } from "@oraichain/oraidex-common"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { getTokensPriceByIds } from "@utils/index"
import { useEffect, useState } from "react"
import { SPL_DECIMAL } from "../config"
import { useSearchParams } from "react-router-dom"
import { StakeTokenAddress } from ".."
import { Web3Airdrop } from "./web3Airdrop"
import { getDurationByAddress } from "../helpers"

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
const web3Airdrop = new Web3Airdrop()

const useGetRewardStrongVault = (
  coingeckoPrices: CoinGeckoPrices<CoinGeckoId> | undefined,
) => {
  const [rewardList, setRewardList] = useState<RewardByToken[]>([])
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [isLastPage, setIsLastPage] = useState(false)
  const [stakingVaultAddress, setStakingVaultAddress] = useState<string | null>(
    null,
  )
  const wallet = useWallet()
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")

  useEffect(() => {
    const fetchStakingVaultAddress = async () => {
      if (!tokenAddress) return

      try {
        const address = await web3Airdrop.getStakingVaultAddress({
          wallet,
          stakeCurrencyMint: tokenAddress as StakeTokenAddress,
          unbondingPeriod: getDurationByAddress(
            tokenAddress as StakeTokenAddress,
          ),
        })
        setStakingVaultAddress(address)
      } catch (error) {
        console.log("Error fetching staking vault address:", error)
      }
    }

    fetchStakingVaultAddress()
  }, [tokenAddress])

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
      if (!wallet.publicKey?.toBase58() || !stakingVaultAddress || loading)
        return

      setLoading(true)
      const staker = wallet.publicKey?.toBase58()
      const fetchURL = `${envConfig.stakingAirdropBackendUrl}/airdrops/vaults/${stakingVaultAddress}/claimants/${staker}?limit=${LIMIT}`
      const getURLByNextPage = (url: string) => {
        if (rewardToken)
          return `${envConfig.stakingAirdropBackendUrl}/airdrops/vaults/${stakingVaultAddress}/claimants/${staker}?rewardToken=${rewardToken}`
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
    if (stakingVaultAddress) {
      getListReward({ next: null })
    }
  }, [wallet.publicKey, stakingVaultAddress])

  return {
    loading,
    rewardList,
    isLastPage,
    nextPage,
    getListReward,
  }
}

export default useGetRewardStrongVault
