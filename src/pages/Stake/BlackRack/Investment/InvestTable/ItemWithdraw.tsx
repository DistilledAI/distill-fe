import { Button } from "@nextui-org/react"
import React, { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "react-toastify"
import { Web3Invest } from "../web3Invest"

const ItemWithdraw: React.FC<{
  id: number
  isWithdraw: boolean
  callback?: () => void
}> = ({ id, isWithdraw, callback }) => {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)

  const handleWithdraw = async () => {
    try {
      if (!wallet || !id || loading || !isWithdraw) return
      setLoading(true)
      const web3Invest = new Web3Invest()
      const res = await web3Invest.withdraw(wallet, id)
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
