import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"

const useConnectPhantom = () => {
  const wallet = useWallet()
  const isConnectWallet = wallet.publicKey

  const connectWallet = async () => {
    wallet.select(PhantomWalletName)
    await wallet.connect()
  }

  const disconnectWallet = async () => {
    try {
      await wallet.disconnect()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    isConnectWallet,
    connectWallet,
    disconnectWallet,
    address: wallet.publicKey?.toBase58() || "",
  }
}

export default useConnectPhantom
