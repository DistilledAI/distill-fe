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
import { useAppSelector } from "@hooks/useAppRedux"

const useLock = () => {
  const [isLoading, setIsLoading] = useState(false)
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const [txh, setTxh] = useState<string | null>("")

  const handleLock = async (params: LockParams) => {
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
        message: getMsgDataTx(transaction),
        signerAddress,
        timestamp,
        signature: signature as string,
        agentId: myAgent?.id as number,
      })

      if (!signatureByAgent) return toast.error("Lock error!")
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

  return { handleLock, isLoading, txh }
}

export default useLock
