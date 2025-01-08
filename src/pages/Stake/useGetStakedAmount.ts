import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { Web3SolanaLockingToken } from "./web3Locking"
import { toBN } from "@utils/format"
import { SPL_DECIMAL } from "./config"
import { useSearchParams } from "react-router-dom"

const web3Locking = new Web3SolanaLockingToken()

const useGetStakedAmount = () => {
  const wallet = useWallet()
  const [total, setTotal] = useState(0)
  const [totalStakeAll, setTotalStakeAll] = useState(0)
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")

  const getStakedAmount = async () => {
    if (!tokenAddress) return
    const info = await web3Locking.getStakerInfo(wallet, tokenAddress)
    setTotal(
      toBN(info?.totalStake as any)
        .div(10 ** SPL_DECIMAL)
        .toNumber(),
    )
  }

  const getTotalStakeAll = async () => {
    if (!tokenAddress) return
    const res = await web3Locking.getVaultInfo(tokenAddress)
    setTotalStakeAll(
      toBN(res.totalStaked as any)
        .div(10 ** SPL_DECIMAL)
        .toNumber(),
    )
  }

  useEffect(() => {
    getTotalStakeAll()
  }, [tokenAddress])

  useEffect(() => {
    getStakedAmount()
  }, [wallet.publicKey, tokenAddress])

  return { total, getStakedAmount, totalStakeAll, getTotalStakeAll }
}

export default useGetStakedAmount
