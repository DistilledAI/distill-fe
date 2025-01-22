import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { Web3Invest } from "../web3Invest"
import { NAV_SCALE } from "../constants"

const web3Invest = new Web3Invest()

const useGetUnbondingList = () => {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<
    {
      id: number
      amount: number
      unstakedAtTime: number
    }[]
  >([])

  const getListUnbonding = async () => {
    try {
      if (!wallet) return
      setLoading(true)
      const res = await web3Invest.getUnbondingList(wallet)
      if (res) {
        const data = res
          .filter((item) => item.account.claimed === false)
          .map((dt) => ({
            id: dt.account.id.toNumber(),
            amount:
              (dt.account.shareAmount.toNumber() *
                dt.account.snapshotNav.toNumber()) /
              NAV_SCALE,
            unstakedAtTime: dt.account.withdrawTime.toNumber(),
          }))
        setList(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListUnbonding()
  }, [wallet.publicKey])

  return { list, getListUnbonding, loading }
}

export default useGetUnbondingList
