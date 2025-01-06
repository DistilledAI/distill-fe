import useAuthState from "@hooks/useAuthState"
import { findTokenByAddress } from "@pages/MyPrivateRoom/DexActionCore/helpers"
import { Network } from "@pages/MyPrivateRoom/DexActionCore/interface"
import useSend from "@pages/MyPrivateRoom/DexActionCore/Send/useSend"
import { toBN } from "@utils/format"
import { useState } from "react"
import { toast } from "react-toastify"

const useSendSubmit = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()
  const { handleSend, txh } = useSend()

  const handleSubmit = async ({
    toAccountAddress,
    amount,
    tokenAddress,
  }: {
    toAccountAddress?: string
    amount?: string
    tokenAddress?: string
  }) => {
    try {
      if (!toAccountAddress || !amount || !tokenAddress) return
      setIsLoading(true)
      const timestamp = Math.floor(Date.now())
      const decimals = findTokenByAddress(tokenAddress)?.decimals || 6
      const sendAmount = toBN(
        toBN(amount)
          .multipliedBy(10 ** decimals)
          .toFixed(0, 1),
      ).toNumber()
      const result = await handleSend({
        network: Network.SOL,
        msgSign: {
          action: "sign_solana",
          timestamp,
        },
        agentWalletAddress: "6qe2EtWg2uLVD2isYGeN6d6Rx3cp5Z9gctZwZ8qWj3vh",
        tokenAddress,
        toWalletAddress: toAccountAddress,
        amount: sendAmount,
        signerAddress: user.publicAddress,
        timestamp,
        decimals,
      })
      if (result) {
        toast.success("Sent successfully!")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSubmit, txh, isLoading }
}

export default useSendSubmit
