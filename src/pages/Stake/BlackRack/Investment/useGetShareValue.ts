import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { toBN } from "@utils/format"
import { Web3Invest } from "./web3Invest"
import { SPL_DECIMAL } from "@pages/Stake/config"
import { NAV_SCALE } from "./constants"

const web3Invest = new Web3Invest()

const useGetShareValue = () => {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [nav, setNav] = useState(0)

  const getStakedAmount = async () => {
    try {
      if (!wallet.publicKey) {
        setTotal(0)
        return
      }
      setLoading(true)
      const amount = await web3Invest.getStakerShare(wallet)
      const nav = await web3Invest.getVault(wallet)
      if (amount) {
        const amountDisplay = toBN(amount as any)
          .div(10 ** SPL_DECIMAL)
          .toNumber()
        setTotal(amountDisplay)
      }
      if (nav) {
        setNav(nav.toNumber() / NAV_SCALE)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStakedAmount()
  }, [wallet.publicKey])

  return { total, loading, nav, getStakedAmount }
}

export default useGetShareValue
