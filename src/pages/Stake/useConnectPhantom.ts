import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"

const useConnectPhantom = () => {
  const wallet = useWallet()
  const isConnectWallet = wallet.publicKey

  const connectWallet = async () => {
    wallet.select(PhantomWalletName)
    await wallet.connect()
  }

  return {
    isConnectWallet,
    connectWallet,
    address: wallet.publicKey?.toBase58() || "",
  }
}

export default useConnectPhantom
