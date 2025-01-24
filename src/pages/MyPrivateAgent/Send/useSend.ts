import { getAssociatedTokenAddress } from "@solana/spl-token"
import { PublicKey } from "@solana/web3.js"
import { useState } from "react"
import { toast } from "react-toastify"
import { getSignatureByNetwork } from "../helpers"
import { SendParams } from "../interface"
import { sendWithSolNetwork } from "./helpers"

const useSend = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txh, setTxh] = useState<string | null>("")

  const handleSend = async (params: SendParams) => {
    try {
      setIsLoading(true)
      setTxh("")
      const {
        network,
        fromWalletAddress,
        amount,
        decimals,
        tokenAddress,
        toWalletAddress,
      } = params

      const token = new PublicKey(tokenAddress)
      const agentAddress = new PublicKey(fromWalletAddress)
      const toAccount = new PublicKey(toWalletAddress)
      const senderTokenAccount = await getAssociatedTokenAddress(
        token,
        agentAddress,
      )

      const receiverTokenAccount = await getAssociatedTokenAddress(
        token,
        toAccount,
      )

      const transaction = await sendWithSolNetwork({
        senderTokenAccount,
        token,
        receiverTokenAccount,
        fromWalletAddress: agentAddress,
        amount,
        decimals,
      })

      if (!transaction) return toast.error("Send error!")
      const signature = await getSignatureByNetwork(network, transaction)
      return signature
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSend, isLoading, txh }
}

export default useSend
