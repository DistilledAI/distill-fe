import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { toBN } from "@utils/format"
import { Web3Invest } from "./web3Invest"
import { SPL_DECIMAL } from "@pages/Stake/config"

const web3Invest = new Web3Invest()

export interface InfoVault {
  nav: number
  totalShares: number
  aum: number
  avgPrice: number
  highestNav: number
  managementFee: number
  performanceFee: number
  nextTimeTakeManagementFee: number
}

const useGetVaultInfo = () => {
  const wallet = useWallet()
  const [total, setTotal] = useState(0)
  const [info, setInfo] = useState<InfoVault>({
    nav: 0,
    totalShares: 0,
    aum: 0,
    avgPrice: 0,
    highestNav: 0,
    managementFee: 0,
    performanceFee: 0,
    nextTimeTakeManagementFee: 0,
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
          nav: dt.nav.toNumber(),
          aum: dt.aum.toNumber(),
          totalShares: toBN(Number(dt.totalShares)).toNumber(),
          avgPrice: toBN(Number(dt.avgPrice)).toNumber(),
          highestNav: toBN(Number(dt.highestNav)).toNumber(),
          managementFee: toBN(Number(dt.managementFee)).toNumber(),
          performanceFee: toBN(Number(dt.performanceFee)).toNumber(),
          nextTimeTakeManagementFee: toBN(
            Number(dt.nextTimeTakeManagementFee),
          ).toNumber(),
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
