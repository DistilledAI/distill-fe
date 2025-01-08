import { solanaCircleIcon } from "@assets/svg"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { Button, Image } from "@nextui-org/react"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import { centerTextEllipsis, copyClipboard } from "@utils/index"

const LoginPhantom = () => {
  const { isConnectWallet, connectWallet, address, disconnectWallet } =
    useConnectPhantom()
  return (
    <>
      {isConnectWallet ? (
        <div className="inline-flex items-center gap-2">
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
          onClick={connectWallet}
          className="rounded-full bg-mercury-950 font-medium text-white"
        >
          Connect To Phantom
        </Button>
      )}
    </>
  )
}

export default LoginPhantom
