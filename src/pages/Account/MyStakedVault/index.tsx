import { Button, Switch } from "@nextui-org/react"
import StakedTable from "./StakedTable"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"
import useAuthState from "@hooks/useAuthState"
import { LIST_TOKEN_STAKE, StakeTokenAddress } from "@pages/Stake"
import { CoinGeckoId } from "@oraichain/oraidex-common"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { SPL_DECIMAL } from "@pages/Stake/config"
import { toBN } from "@utils/format"

export interface IVaultData {
  totalStaked: number
  myStaked: number
  id: number
  address: StakeTokenAddress
  label: string
  decimals: number
  tokenName: string
  avatar: string
  coinGeckoId: CoinGeckoId
  avatar2?: string
}

const web3Locking = new Web3SolanaLockingToken()

const MyStakedVault = () => {
  const wallet = useWallet()
  const { isLogin, isAnonymous } = useAuthState()
  const { setVisible } = useWalletModal()
  const [isAllVault, setIsAllVault] = useState(false)

  const disconnectWallet = async () => await wallet.disconnect()

  const [list, setList] = useState<IVaultData[]>([])

  const handleFetchData = async () => {
    const results = LIST_TOKEN_STAKE.filter(
      (token) => token.address !== StakeTokenAddress.Usdc,
    ).map(async (item) => {
      const dt = { ...item, myStaked: 0, totalStaked: 0 }

      const resVault = await web3Locking.getVaultInfo(item.address, wallet)
      if (resVault?.totalStaked) {
        Object.assign(dt, {
          totalStaked: toBN(resVault.totalStaked as any)
            .div(10 ** SPL_DECIMAL)
            .toNumber(),
        })
      }

      if (!wallet.publicKey) return dt

      const info = await web3Locking.getStakerInfo(wallet, item.address)
      if (info?.totalStake) {
        Object.assign(dt, {
          myStaked: toBN(info?.totalStake as any)
            .div(10 ** SPL_DECIMAL)
            .toNumber(),
        })
      }

      return dt
    })

    const finalResults = await Promise.all(results)
    setList(finalResults as IVaultData[])
  }

  useEffect(() => {
    if (wallet.publicKey) handleFetchData()
    else setList([])
  }, [wallet.publicKey])

  useEffect(() => {
    if (!isLogin || isAnonymous) disconnectWallet()
  }, [isLogin, isAnonymous])

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-bold max-md:text-15">Show All Vaults</p>
          <Switch isSelected={isAllVault} onValueChange={setIsAllVault} />
        </div>
        {!wallet.publicKey && (
          <Button
            className="rounded-full bg-mercury-950 text-white max-md:h-[40px]"
            onPress={() => setVisible(true)}
          >
            Connect Wallet
          </Button>
        )}
      </div>
      <div className="mt-5">
        <StakedTable
          list={isAllVault ? list : list.filter((item) => item.myStaked > 0)}
        />
      </div>
    </div>
  )
}

export default MyStakedVault
