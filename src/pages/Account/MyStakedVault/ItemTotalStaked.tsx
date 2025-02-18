import { SPL_DECIMAL } from "@pages/Stake/config"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { shortenNumber } from "@utils/index"
import React, { useEffect, useState } from "react"

const ItemTotalStaked: React.FC<{
  data: Record<string, any>
}> = ({ data }) => {
  const [total, setTotal] = useState(data.totalStaked)
  const wallet = useWallet()

  const getTotalStakeAll = async () => {
    if (!data.address) return
    const web3Locking = new Web3SolanaLockingToken()
    const res = await web3Locking.getVaultInfo(data.address, wallet)
    if (res?.totalStaked)
      setTotal(
        toBN(res.totalStaked as any)
          .div(10 ** SPL_DECIMAL)
          .toNumber(),
      )
  }

  useEffect(() => {
    getTotalStakeAll()
  }, [])

  return (
    <div className="flex items-center gap-2 text-14 font-medium">
      {shortenNumber(total)} {data.tokenName}
    </div>
  )
}

export default ItemTotalStaked
