import ConnectWalletBtn from "@components/ConnectButton"
import DistilledAILogo from "@components/DistilledAILogo"

const ChatHeader = () => {
  return (
    <div className="m-auto flex h-[54px] w-full items-center justify-center px-[86px] pb-2 pt-4">
      <DistilledAILogo />
      <ConnectWalletBtn />
    </div>
  )
}

export default ChatHeader
