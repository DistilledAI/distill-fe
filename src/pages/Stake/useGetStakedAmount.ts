import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { Web3SolanaLockingToken } from "./web3Locking"
import { toBN } from "@utils/format"
import { SPL_DECIMAL } from "./config"

const web3Locking = new Web3SolanaLockingToken()

const useGetStakedAmount = () => {
  const wallet = useWallet()
  const [total, setTotal] = useState(0)
  const [totalStakeAll, setTotalStakeAll] = useState(0)
  const getStakedAmount = async () => {
    const info = await web3Locking.getStakerInfo(wallet)
    setTotal(
      toBN(info?.totalStake as any)
        .div(10 ** SPL_DECIMAL)
        .toNumber(),
    )
  }

  const getTotalStakeAll = async () => {
    const res = await web3Locking.getVaultInfo()
    setTotalStakeAll(
      toBN(res.totalStaked as any)
        .div(10 ** SPL_DECIMAL)
        .toNumber(),
    )
  }

  useEffect(() => {
    getTotalStakeAll()
  }, [])

  useEffect(() => {
    getStakedAmount()
  }, [wallet.publicKey])

  return { total, getStakedAmount, totalStakeAll, getTotalStakeAll }
}

export default useGetStakedAmount
