import { SPL_DECIMAL } from "@pages/Stake/config"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const useStakerInfo = () => {
  const wallet = useWallet()
  const [isCanAction, setIsCanAction] = useState<boolean | null>(null)
  const [totalUserStake, setTotalUserStake] = useState(0)
  const { agentAddress } = useParams()

  const web3Locking = new Web3SolanaLockingToken()

  const getStakedAmount = async () => {
    try {
      if (!wallet.publicKey) {
        setIsCanAction(null)
        setTotalUserStake(0)
        return
      }
      if (!agentAddress) return
      const info = await web3Locking.getStakerInfo(wallet, agentAddress)
      const amount = toBN(info?.totalStake as any)
        .div(10 ** SPL_DECIMAL)
        .toNumber()
      setTotalUserStake(amount)
      if (amount > 0) setIsCanAction(true)
      else setIsCanAction(false)
    } catch (error) {
      console.error(error)
      setIsCanAction(false)
      setTotalUserStake(0)
    }
  }

  useEffect(() => {
    getStakedAmount()
  }, [wallet.publicKey, agentAddress])

  return { isCanAction, totalUserStake }
}

export default useStakerInfo
