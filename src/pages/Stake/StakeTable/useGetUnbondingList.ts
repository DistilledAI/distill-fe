import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Web3SolanaLockingToken } from "../web3Locking"

const web3Locking = new Web3SolanaLockingToken()

const useGetUnbondingList = () => {
  const wallet = useWallet()
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<
    {
      id: number
      amount: number
      unstakedAtTime: number
      stakeCurrencyMint: string
    }[]
  >([])

  const getListUnbonding = async () => {
    try {
      if (!tokenAddress || !wallet) return
      setLoading(true)
      const res = await web3Locking.getUnbondingList(wallet, tokenAddress)
      if (res) setList(res)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListUnbonding()
  }, [tokenAddress, wallet.publicKey])

  return { list, getListUnbonding, loading }
}

export default useGetUnbondingList
