import { solanaCircleIcon } from "@assets/svg"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { Button, Image } from "@nextui-org/react"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { centerTextEllipsis, copyClipboard } from "@utils/index"

const LoginPhantom = () => {
  const { isConnectWallet, address, disconnectWallet } = useConnectPhantom()
  const { setVisible } = useWalletModal()

  return (
    <>
      {isConnectWallet ? (
        <div className="flex items-center justify-end gap-2">
          <p className="w-[62px] font-medium max-md:text-[14px]">Wallet:</p>
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={(e) => copyClipboard(e, address)}
          >
            <span className="text-[16px] max-md:text-[14px]">
              {centerTextEllipsis(address)}
            </span>
            <Image className="h-5 w-5" src={solanaCircleIcon} />
            <CopyIcon />
          </div>
          <div onClick={disconnectWallet} className="cursor-pointer">
            <LogoutIcon color="red" />
          </div>
        </div>
      ) : (
        <Button
          onPress={() => setVisible(true)}
          className="rounded-full bg-mercury-950 font-medium text-white"
        >
          Connect Wallet
        </Button>
      )}
    </>
  )
}

export default LoginPhantom
