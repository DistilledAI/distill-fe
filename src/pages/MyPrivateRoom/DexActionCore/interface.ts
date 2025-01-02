import { PublicKey } from "@solana/web3.js"

export enum Network {
  SOL = "sol",
}

export type MsgSignSwap = {
  action: string
  timestamp: number
}

export type SwapParams = {
  network: Network
  msgSign: MsgSignSwap
  agentWalletAddress: string
  assetAddressIn: string
  assetAddressOut: string
  amount: number
  endpointAgent: string
  signerAddress: string
  timestamp: number
}

export type LockParams = {
  network: Network
  msgSign: MsgSignSwap
  agentWalletAddress: string
  tokenAddress: string
  amount: number
  endpointAgent: string
  signerAddress: string
  timestamp: number
  duration: number
}

export type SendParams = {
  network: Network
  msgSign: MsgSignSwap
  agentWalletAddress: string
  tokenAddress: string
  amount: number
  endpointAgent: string
  signerAddress: string
  timestamp: number
  duration: number
}

export type TransferParams = {
  senderTokenAccount: PublicKey
  token: PublicKey
  receiverTokenAccount: PublicKey
  agentWalletAddress: PublicKey
  amount: number | bigint
  decimals: number
}

export type PostSignParams = {
  endpointAgent: string
  message: string
  signerAddress: string
  timestamp: number
  signature: string
}

export type ConfirmTxParams = {
  transaction: any
  agentWalletAddress: string
  signatureByAgent: string
}

export type LockTokenParams = {
  lockPeriod: number
  lockAmount: number
  agentWalletAddress: string
  tokenAddress: string
}
