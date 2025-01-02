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

const useSwap = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [txh, setTxh] = useState("")

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
        endpointAgent,
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
        endpointAgent,
        message: getMsgDataTx(transaction),
        signerAddress,
        timestamp,
        signature: signature as string,
      })

      if (!signatureByAgent) return toast.error("Swap error!")
      const txid = await confirmTransactionByNetwork(network, {
        transaction,
        agentWalletAddress,
        signatureByAgent,
      })
      if (!txid) return toast.error("Swap error!")
      toast.success("Swapped successfully!")
      setTxh(txid)
      return txid
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSwap, isLoading, txh }
}

export default useSwap
