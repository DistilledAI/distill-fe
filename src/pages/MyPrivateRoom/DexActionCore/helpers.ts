import axios from "axios"
import {
  ConfirmTxParams,
  MsgSignSwap,
  Network,
  PostSignParams,
} from "./interface"
import { match } from "ts-pattern"
import { toast } from "react-toastify"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { ComputeBudgetProgram, Connection, PublicKey } from "@solana/web3.js"
import {
  SOL_COMPUTE_UNIT_LIMIT,
  SOL_MICRO_LAMPORTS,
  SOLANA_RPC,
  SOLANA_WS,
} from "./constants"

const postSignAgentWithSol = async (params: PostSignParams) => {
  const { endpointAgent, message, signerAddress, signature, timestamp } = params
  const res = await axios.request({
    method: "post",
    maxBodyLength: Infinity,
    url: `${endpointAgent}/wallet/sign-solana`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      data: {
        metadata: {
          message,
        },
        signer_addr: signerAddress,
        timestamp,
        network: "solana",
      },
      signature,
    }),
  })

  if (!res.data.signature) return null
  return res.data.signature
}

export const postSignAgentByNetwork = async (
  network: Network,
  params: PostSignParams,
) => {
  return match(network)
    .with(Network.SOL, () => postSignAgentWithSol(params))
    .run()
}

const getProvider = () => {
  if ("solana" in window) {
    const provider = (window as any).solana
    if (provider.isPhantom) {
      return provider
    }
  }
  return null
}

const getSignatureWithSol = async (msgSign: MsgSignSwap) => {
  const provider = getProvider()
  if (!provider) {
    return toast.warning("Provider not found")
  }
  const message = JSON.stringify(msgSign)
  const encodedMessage = new TextEncoder().encode(message)
  const signedMessage = await provider.signMessage(encodedMessage, "utf8")
  const signature = bs58.encode(signedMessage.signature)
  return signature
}

export const getSignatureByNetwork = async (
  network: Network,
  msgSign: MsgSignSwap,
) => {
  return match(network)
    .with(Network.SOL, () => getSignatureWithSol(msgSign))
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
  agentWalletAddress,
  signatureByAgent,
}: ConfirmTxParams) => {
  transaction.addSignature(
    new PublicKey(agentWalletAddress),
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

  await connection.confirmTransaction(txid, "confirmed")
  console.log("txid: ", txid)
  return txid
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
