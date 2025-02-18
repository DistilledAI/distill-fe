import { Button, Switch } from "@nextui-org/react"
import StakedTable from "./StakedTable"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"
import useAuthState from "@hooks/useAuthState"
import { LIST_TOKEN_STAKE, StakeTokenAddress } from "@pages/Stake"
import { CoinGeckoId } from "@oraichain/oraidex-common"

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

const MyStakedVault = () => {
  const wallet = useWallet()
  const { isLogin, isAnonymous } = useAuthState()
  const { setVisible } = useWalletModal()
  const [isAllVault, setIsAllVault] = useState(false)

  const disconnectWallet = async () => await wallet.disconnect()

  const [list, setList] = useState<IVaultData[]>([])

  const dataDefault = wallet.publicKey
    ? (LIST_TOKEN_STAKE.filter(
        (token) => token.address !== StakeTokenAddress.Usdc,
      ).map((item) => ({
        ...item,
        totalStaked: 0,
        myStaked: 0,
      })) as any)
    : []

  useEffect(() => {
    setList(dataDefault)
  }, [wallet.publicKey])

  useEffect(() => {
    if (!isLogin || isAnonymous) disconnectWallet()
  }, [isLogin, isAnonymous])

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-bold">Show All Vaults</p>
          <Switch isSelected={isAllVault} onValueChange={setIsAllVault} />
        </div>
        {!wallet.publicKey && (
          <Button
            className="rounded-full bg-mercury-950 text-white"
            onPress={() => setVisible(true)}
          >
            Connect Wallet
          </Button>
        )}
      </div>
      <div className="mt-5">
        <StakedTable list={list} setList={setList} />
      </div>
    </div>
  )
}

export default MyStakedVault
