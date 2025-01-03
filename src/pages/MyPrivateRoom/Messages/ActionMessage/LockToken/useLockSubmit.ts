import useAuthState from "@hooks/useAuthState"
import { TIMER } from "@pages/MyPrivateRoom/DexActionCore/constants"
import { findTokenByAddress } from "@pages/MyPrivateRoom/DexActionCore/helpers"
import { Network } from "@pages/MyPrivateRoom/DexActionCore/interface"
import useLock from "@pages/MyPrivateRoom/DexActionCore/Lock/useLock"
import { toBN } from "@utils/format"
import { useState } from "react"
import { toast } from "react-toastify"

const useLockSubmit = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()

  const { handleLock, txh } = useLock()

  const handleSubmit = async ({
    tokenAddress,
    amount,
    duration,
  }: {
    tokenAddress?: string
    amount?: string
    duration?: number
  }) => {
    try {
      if (!tokenAddress || !amount || !duration) return
      setIsLoading(true)
      const timestamp = Math.floor(Date.now())
      const lockTime = duration * TIMER.MONTH_TO_SECONDS
      const decimals = findTokenByAddress(tokenAddress)?.decimals || 6
      const lockAmount = toBN(
        toBN(amount)
          .multipliedBy(10 ** decimals)
          .toFixed(0, 1),
      ).toNumber()
      const result = await handleLock({
        network: Network.SOL,
        msgSign: {
          action: "sign_solana",
          timestamp,
        },
        agentWalletAddress: "6qe2EtWg2uLVD2isYGeN6d6Rx3cp5Z9gctZwZ8qWj3vh",
        tokenAddress,
        amount: lockAmount,
        signerAddress: user.publicAddress,
        timestamp,
        duration: lockTime,
      })
      if (result) {
        toast.success("Locked successfully!")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSubmit, isLoading, txh }
}

export default useLockSubmit
