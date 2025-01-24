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
  fromWalletAddress: string
  assetAddressIn: string
  assetAddressOut: string
  amount: number
  timestamp: number
}

export type LockParams = {
  network: Network
  msgSign: MsgSignSwap
  fromWalletAddress: string
  tokenAddress: string
  amount: number
  timestamp: number
  duration: number
}

export type SendParams = {
  network: Network
  fromWalletAddress: string
  tokenAddress: string
  amount: number
  timestamp: number
  toWalletAddress: string
  decimals: number
}

export type TransferParams = {
  senderTokenAccount: PublicKey
  token: PublicKey
  receiverTokenAccount: PublicKey
  fromWalletAddress: PublicKey
  amount: number | bigint
  decimals: number
}

export type PostSignParams = {
  message: string
  timestamp: number
  signature: string
  agentId: number
}

export type ConfirmTxParams = {
  transaction: any
  fromWalletAddress: string
  signatureByAgent: string
}

export type LockTokenParams = {
  lockPeriod: number
  lockAmount: number
  fromWalletAddress: string
  tokenAddress: string
}
