import useAuthState from "@hooks/useAuthState"
import { findTokenByAddress } from "@pages/MyPrivateRoom/DexActionCore/helpers"
import { Network } from "@pages/MyPrivateRoom/DexActionCore/interface"
import useSwap from "@pages/MyPrivateRoom/DexActionCore/Swap/useSwap"
import { toBN } from "@utils/format"
import { useState } from "react"
import { toast } from "react-toastify"

const useSwapSubmit = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const { handleSwap, txh } = useSwap()

  const handleSubmit = async ({
    toToken,
    amount,
    fromToken,
  }: {
    toToken?: string
    amount?: string
    fromToken?: string
  }) => {
    try {
      if (!toToken || !amount || !fromToken) return
      setIsLoading(true)
      const timestamp = Math.floor(Date.now())
      const decimals = findTokenByAddress(fromToken)?.decimals || 6
      const swapAmount = toBN(
        toBN(amount)
          .multipliedBy(10 ** decimals)
          .toFixed(0, 1),
      ).toNumber()
      const result = await handleSwap({
        network: Network.SOL,
        msgSign: {
          action: "sign_solana",
          timestamp,
        },
        agentWalletAddress: "6qe2EtWg2uLVD2isYGeN6d6Rx3cp5Z9gctZwZ8qWj3vh",
        assetAddressIn: fromToken,
        assetAddressOut: toToken,
        amount: swapAmount,
        signerAddress: user.publicAddress,
        timestamp,
      })
      if (result) {
        toast.success("Swapped successfully!")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSubmit, txh, isLoading }
}

export default useSwapSubmit
