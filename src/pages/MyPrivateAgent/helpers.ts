import { ComputeBudgetProgram, Connection, PublicKey } from "@solana/web3.js"
import { toast } from "react-toastify"
import { match } from "ts-pattern"
import {
  SOL_COMPUTE_UNIT_LIMIT,
  SOL_MICRO_LAMPORTS,
  SOLANA_RPC,
  SOLANA_WS,
  TOKENS,
} from "./constants"
import { ConfirmTxParams, Network } from "./interface"

const getProvider = () => {
  if ("solana" in window) {
    const provider = (window as any).solana
    if (provider.isPhantom) {
      return provider
    }
  }
  return null
}

const getSignatureWithSol = async (transaction: any) => {
  const provider = getProvider()
  if (!provider) {
    return toast.warning("Provider not found")
  }

  const signedTransactions = await provider.signAndSendAllTransactions([
    transaction,
  ])

  return signedTransactions
}

export const getSignatureByNetwork = async (
  network: Network,
  transaction: any,
) => {
  return match(network)
    .with(Network.SOL, () => getSignatureWithSol(transaction))
    .run()
}

export const getMsgDataTx = (transaction: any) => {
  const TxSendToDistill = transaction.message
    ? transaction.message.serialize()
    : transaction.serializeMessage()
  return Buffer.from(TxSendToDistill).toString("hex")
}

const confirmTransactionWithSol = async ({
  transaction,
  fromWalletAddress,
  signatureByAgent,
}: ConfirmTxParams) => {
  transaction.addSignature(
    new PublicKey(fromWalletAddress),
    Buffer.from(signatureByAgent),
  )
  const connection = new Connection(SOLANA_RPC, {
    commitment: "confirmed",
    wsEndpoint: SOLANA_WS,
  })

  const txid = await connection.sendRawTransaction(transaction.serialize(), {
    skipPreflight: true,
    maxRetries: 5,
  })

  const resConfirm = await connection.confirmTransaction(txid, "confirmed")
  if (resConfirm.value.err) {
    console.error("Transaction Error:", resConfirm.value.err)
    return {
      error: JSON.stringify(resConfirm.value.err),
      result: null,
    }
  }

  console.log("txid: ", txid)
  return {
    error: null,
    result: txid,
  }
}

export const confirmTransactionByNetwork = async (
  network: Network,
  params: ConfirmTxParams,
) => {
  return match(network)
    .with(Network.SOL, () => confirmTransactionWithSol(params))
    .run()
}

export const setComputeUnitLimit = ComputeBudgetProgram.setComputeUnitLimit({
  units: SOL_COMPUTE_UNIT_LIMIT,
})
export const setComputePriceLimit = ComputeBudgetProgram.setComputeUnitPrice({
  microLamports: SOL_MICRO_LAMPORTS,
})

export const findTokenByAddress = (address: string) => {
  return Object.values(TOKENS).find((token) => token.address === address)
}
