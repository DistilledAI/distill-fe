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
import { useAppSelector } from "@hooks/useAppRedux"

const useSend = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txh, setTxh] = useState<string | null>("")
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const handleSend = async (params: SendParams) => {
    try {
      setIsLoading(true)
      setTxh("")
      const {
        network,
        msgSign,
        agentWalletAddress,
        amount,
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
        message: getMsgDataTx(transaction),
        signerAddress,
        timestamp,
        signature: signature as string,
        agentId: myAgent?.id as number,
      })

      if (!signatureByAgent) return toast.error("Send error!")
      const { error, result } = await confirmTransactionByNetwork(network, {
        transaction,
        agentWalletAddress,
        signatureByAgent,
      })
      if (error) {
        toast.error(`Error: ${error}`)
        return result
      }
      setTxh(result)
      return result
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSend, isLoading, txh }
}

export default useSend
