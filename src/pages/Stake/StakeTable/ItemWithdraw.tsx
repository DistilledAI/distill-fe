import { Button } from "@nextui-org/react"
import React, { useState } from "react"
import { Web3SolanaLockingToken } from "../web3Locking"
import { useSearchParams } from "react-router-dom"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "react-toastify"
import { getDurationByAddress } from "../helpers"

const ItemWithdraw: React.FC<{
  id: number
  isWithdraw: boolean
  callback?: () => void
}> = ({ id, isWithdraw, callback }) => {
  const wallet = useWallet()
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const [loading, setLoading] = useState(false)

  const handleWithdraw = async () => {
    try {
      if (!tokenAddress || !wallet || !id || loading || !isWithdraw) return
      setLoading(true)
      const web3Locking = new Web3SolanaLockingToken()
      const res = await web3Locking.withdraw(
        id,
        getDurationByAddress(tokenAddress),
        wallet,
        tokenAddress,
      )
      if (res) {
        toast.success("Withdraw successfully!")
        if (callback) callback()
      }
    } catch (error) {
      console.error(error)
      toast.error(JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      isDisabled={!isWithdraw}
      isLoading={loading}
      onClick={handleWithdraw}
      className="h-6 rounded-full bg-mercury-950 text-[14px] font-medium text-white"
    >
      WITHDRAW
    </Button>
  )
}

export default ItemWithdraw
