import { SPL_DECIMAL } from "@pages/Stake/config"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { shortenNumber } from "@utils/index"
import React, { useEffect } from "react"

const ItemMyStaked: React.FC<{
  data: Record<string, any>
  setList: React.Dispatch<React.SetStateAction<any[]>>
}> = ({ data, setList }) => {
  const wallet = useWallet()

  const getStakedAmount = async () => {
    if (!data.address) return

    const web3Locking = new Web3SolanaLockingToken()
    const info = await web3Locking.getStakerInfo(wallet, data.address)
    setList((prev) =>
      prev.map((item) => {
        if (item.address === data.address) {
          return {
            ...item,
            myStaked: toBN(info?.totalStake as any)
              .div(10 ** SPL_DECIMAL)
              .toNumber(),
          }
        }
        return item
      }),
    )
  }

  useEffect(() => {
    getStakedAmount()
  }, [wallet.publicKey])

  return (
    <div className="flex items-center gap-2 text-14 font-medium">
      {shortenNumber(data.myStaked)} {data.tokenName}
    </div>
  )
}

export default ItemMyStaked
