import { SPL_DECIMAL } from "@pages/Stake/config"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const useTotalStakeAll = () => {
  const wallet = useWallet()
  const [totalStakeAll, setTotalStakeAll] = useState(0)
  const { agentAddress } = useParams()

  const getTotalStakeAll = async () => {
    if (!agentAddress) return
    const web3Locking = new Web3SolanaLockingToken()
    const res = await web3Locking.getVaultInfo(agentAddress, wallet)

    if (res?.totalStaked)
      setTotalStakeAll(
        toBN(res.totalStaked as any)
          .div(10 ** SPL_DECIMAL)
          .toNumber(),
      )
  }

  useEffect(() => {
    getTotalStakeAll()
  }, [agentAddress])

  return { totalStakeAll }
}

export default useTotalStakeAll
