import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { toBN } from "@utils/format"
import { Web3Invest } from "./web3Invest"
import { SPL_DECIMAL } from "@pages/Stake/config"
import { NAV_SCALE } from "./constants"

const web3Invest = new Web3Invest()

const useGetVaultInfo = () => {
  const wallet = useWallet()
  const [total, setTotal] = useState(0)
  const [info, setInfo] = useState<{
    nav: number
    totalShares: number
    aum: number
  }>({
    nav: 0,
    totalShares: 0,
    aum: 0,
  })

  const getVaultInfo = async () => {
    try {
      if (!wallet.publicKey) {
        setTotal(0)
      }
      const amount = await web3Invest.getStakerShare(wallet)
      const dt = await web3Invest.getVault(wallet)
      if (amount) {
        const amountDisplay = toBN(amount as any)
          .div(10 ** SPL_DECIMAL)
          .toNumber()
        setTotal(amountDisplay)
      }
      if (dt) {
        setInfo({
          nav: dt.nav.toNumber() / NAV_SCALE,
          aum: dt.aum.toNumber(),
          totalShares: toBN(Number(dt.totalShares)).toNumber(),
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getVaultInfo()
  }, [wallet.publicKey])

  return { total, loading: false, info, getVaultInfo }
}

export default useGetVaultInfo
