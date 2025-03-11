import { Button, Image, Switch } from "@nextui-org/react"
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
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { solanaCircleIcon } from "@assets/svg"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import useGetVaultInfo from "@pages/Stake/BlackRack/Investment/useGetVaultInfo"
import { INVEST_ADDRESS } from "@pages/Stake/BlackRack/Investment/constants"
import { DECIMAL_SPL } from "@pages/BetingPage/constants"
import { aiFund2Ava } from "@assets/images"

export interface IVaultData {
  totalStaked: number
  myStaked: number
  id: number
  address: StakeTokenAddress
  label: string
  decimals: number
  tokenName: string
  avatar: string
  coinGeckoId: CoinGeckoId | null
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
  const { total, info } = useGetVaultInfo()
  const aum = toBN(info.aum / 10 ** DECIMAL_SPL).toFixed(2)

  const vaultAgentFundII: IVaultData = {
    totalStaked: Number(aum),
    myStaked: total,
    id: -1,
    address: INVEST_ADDRESS.shareToken as any,
    label: "AI Agent Fund II",
    decimals: 6,
    tokenName: "SHARES",
    avatar: aiFund2Ava,
    coinGeckoId: null,
  }

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

  const getListVaultStake = () => {
    const dt = list.concat([{ ...vaultAgentFundII }])
    return isAllVault ? dt : dt.filter((item) => item.myStaked > 0)
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {wallet.publicKey && (
            <>
              <p className="font-bold max-md:text-15">Show All Vaults</p>
              <Switch isSelected={isAllVault} onValueChange={setIsAllVault} />
            </>
          )}
        </div>
        {!wallet.publicKey ? (
          <Button
            className="rounded-full bg-mercury-950 text-white max-md:h-[40px]"
            onPress={() => setVisible(true)}
          >
            <img className="w-5" src={solanaCircleIcon} /> Connect Wallet
          </Button>
        ) : (
          <div className="inline-flex items-center gap-2">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={(e) =>
                copyClipboard(e, wallet.publicKey?.toBase58() || "")
              }
            >
              <span className="text-[16px] max-md:text-[14px]">
                {centerTextEllipsis(wallet.publicKey?.toBase58() || "", 4)}
              </span>
              <Image className="h-5 w-5" src={solanaCircleIcon} />
              <CopyIcon />
            </div>
            <div onClick={disconnectWallet} className="cursor-pointer">
              <LogoutIcon color="red" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-5">
        <StakedTable
          list={getListVaultStake()}
          emptyContent={
            wallet.publicKey ? "Empty" : "Connect wallet to show vaults"
          }
        />
      </div>
    </div>
  )
}

export default MyStakedVault
