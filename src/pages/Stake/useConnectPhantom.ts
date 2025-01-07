import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { toast } from "react-toastify"

const useConnectPhantom = () => {
  const wallet = useWallet()
  const isConnectWallet = wallet.publicKey

  const connectWallet = async () => {
    wallet.select(PhantomWalletName)
    await wallet.connect().catch(() => {
      toast.error("Connect Wallet Failed")
    })
  }

  return { isConnectWallet, connectWallet }
}

export default useConnectPhantom
