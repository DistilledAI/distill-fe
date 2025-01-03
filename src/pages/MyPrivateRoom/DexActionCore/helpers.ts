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
  TOKENS,
} from "./constants"
import { fetchApiAuth } from "services/fetchApi"
import endpoint from "services/endpoint"

const postSignAgentWithSol = async (params: PostSignParams) => {
  try {
    const { message, signerAddress, signature, timestamp, agentId } = params
    const res = await fetchApiAuth({
      method: "post",
      url: endpoint.CALL_AGENT,
      data: {
        botId: agentId,
        path: "/wallet/sign-solana",
        body: {
          data: {
            metadata: {
              message,
            },
            signer_addr: signerAddress,
            timestamp,
            network: "solana",
          },
          signature,
        },
      },
    })
    if (!res.data.signature) return null
    return res.data.signature
  } catch (error: any) {
    console.error(error)
  }
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
