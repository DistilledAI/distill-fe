import { useState } from "react"
import { LockParams } from "../interface"
import { toast } from "react-toastify"
import {
  confirmTransactionByNetwork,
  getMsgDataTx,
  getSignatureByNetwork,
  postSignAgentByNetwork,
} from "../helpers"
import { lockWithSolNetwork } from "./helpers"

const useLock = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txh, setTxh] = useState("")

  const handleLock = async (params: LockParams) => {
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
        duration,
        tokenAddress,
      } = params

      const signature = await getSignatureByNetwork(network, msgSign)
      const transaction = await lockWithSolNetwork({
        lockPeriod: duration,
        lockAmount: amount,
        agentWalletAddress,
        tokenAddress,
      })

      if (!signature || !transaction) return toast.error("Lock error!")
      const signatureByAgent = await postSignAgentByNetwork(network, {
        endpointAgent,
        message: getMsgDataTx(transaction),
        signerAddress,
        timestamp,
        signature: signature as string,
      })

      if (!signatureByAgent) return toast.error("Lock error!")
      const txid = await confirmTransactionByNetwork(network, {
        transaction,
        agentWalletAddress,
        signatureByAgent,
      })
      if (!txid) return toast.error("Lock error!")
      toast.success("Locked successfully!")
      setTxh(txid)
      return txid
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleLock, isLoading, txh }
}

export default useLock
