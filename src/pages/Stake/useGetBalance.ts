import { useWallet } from "@solana/wallet-adapter-react"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { useEffect, useState } from "react"

const web3Solana = new Web3SolanaProgramInteraction()

const useGetBalance = (tokenAddress?: string | null) => {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const { publicKey } = useWallet()
  const address = publicKey?.toBase58() || ""

  const getBalance = async () => {
    if (!publicKey) {
      setBalance(0)
      return
    }
    if (!tokenAddress) return
    try {
      setLoading(true)
      const tokenBal = await web3Solana.getTokenBalance(address, tokenAddress)
      setBalance(tokenBal ? tokenBal : 0)
      setLoading(false)
    } catch (error) {
      setBalance(0)
      console.log("error", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getBalance()
  }, [publicKey, tokenAddress])

  return { balance, loading, getBalance }
}

export default useGetBalance
