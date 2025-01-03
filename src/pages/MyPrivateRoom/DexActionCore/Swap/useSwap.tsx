import { useState } from "react"
import { SwapParams } from "../interface"
import { toast } from "react-toastify"
import { swapWithJup } from "./helpers"
import {
  confirmTransactionByNetwork,
  getMsgDataTx,
  getSignatureByNetwork,
  postSignAgentByNetwork,
} from "../helpers"
import { useAppSelector } from "@hooks/useAppRedux"

const useSwap = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txh, setTxh] = useState<string | null>("")
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const handleSwap = async (params: SwapParams) => {
    try {
      setIsLoading(true)
      setTxh("")
      const {
        network,
        msgSign,
        agentWalletAddress,
        assetAddressIn,
        assetAddressOut,
        amount,
        signerAddress,
        timestamp,
      } = params

      const signature = await getSignatureByNetwork(network, msgSign)
      const transaction = await swapWithJup({
        walletAddress: agentWalletAddress,
        assetAddressIn,
        assetAddressOut,
        amount,
      })

      if (!signature || !transaction) return toast.error("Swap error!")
      const signatureByAgent = await postSignAgentByNetwork(network, {
        message: getMsgDataTx(transaction),
        signerAddress,
        timestamp,
        signature: signature as string,
        agentId: myAgent?.id as number,
      })

      if (!signatureByAgent) return toast.error("Swap error!")
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

  return { handleSwap, isLoading, txh }
}

export default useSwap
