import { useState } from "react"
import { SendParams } from "../interface"
import { toast } from "react-toastify"
import {
  confirmTransactionByNetwork,
  getMsgDataTx,
  getSignatureByNetwork,
  postSignAgentByNetwork,
} from "../helpers"
import { sendWithSolNetwork } from "./helpers"
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { PublicKey } from "@solana/web3.js"

const useSend = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txh, setTxh] = useState("")

  const handleSend = async (params: SendParams) => {
    try {
      setIsLoading(true)
      setTxh("")
      const {
        network,
        msgSign,
        agentWalletAddress,
        amount,
        endpointAgent,
        signerAddress,
        timestamp,
        decimals,
        tokenAddress,
        toWalletAddress,
      } = params

      const token = new PublicKey(tokenAddress)
      const agentAddress = new PublicKey(agentWalletAddress)
      const toAccount = new PublicKey(toWalletAddress)
      const senderTokenAccount = await getAssociatedTokenAddress(
        token,
        agentAddress,
      )
      const receiverTokenAccount = await getAssociatedTokenAddress(
        token,
        toAccount,
      )

      const signature = await getSignatureByNetwork(network, msgSign)
      const transaction = await sendWithSolNetwork({
        senderTokenAccount,
        receiverTokenAccount,
        token,
        agentWalletAddress: agentAddress,
        amount,
        decimals,
      })

      if (!signature || !transaction) return toast.error("Send error!")
      const signatureByAgent = await postSignAgentByNetwork(network, {
        endpointAgent,
        message: getMsgDataTx(transaction),
        signerAddress,
        timestamp,
        signature: signature as string,
      })

      if (!signatureByAgent) return toast.error("Send error!")
      const txid = await confirmTransactionByNetwork(network, {
        transaction,
        agentWalletAddress,
        signatureByAgent,
      })
      if (!txid) return toast.error("Send error!")
      toast.success("Sended successfully!")
      setTxh(txid)
      return txid
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSend, isLoading, txh }
}

export default useSend
