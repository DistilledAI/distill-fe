import { BN } from "@coral-xyz/anchor"

export enum BotDataTypeKey {
  SOCIAL_MEDIA = "social-media",
  CV_FILE = "cv-file",
  PDF_FILE = "pdf-file",
  PHOTO_VIDEO_FILE = "photo-video-file",
  TXT_FILE = "txt-file",
  FAQ = "faq",
  PLAIN_TEXT_FILE = "plain-text-file",
}

export enum ConfigBotType {
  LIVE = "live",
}

export interface userInfo {
  _id?: string
  name: string
  wallet: string
  avatar?: string
  isLedger?: boolean
  signature?: string
}

export interface metadataInfo {
  name: string
  symbol: string
  image: string
  description: string
  agentPersonality: string
  agentStyle: string
  createdOn: string
  twitter?: string
  website?: string
  telegram?: string
  discord?: string
  agentId: number
  agentAddress: string
  creatorAddress: string
  createdAt: number
}

export interface coinInfo {
  commit: any
  _id?: string
  name: string
  creator: string | userInfo
  ticker: string
  url: string
  tokenReserves: BN
  lamportReserves: BN
  bondingCurveLimit: BN
  token: string
  marketcap?: number
  presale?: number
  replies?: number
  description?: string
  twitter?: string
  website?: string
  telegram?: string
  date?: Date
  decimals: number
  metadata?: metadataInfo
  listed: boolean
  oraidexPoolAddr?: string
  raydiumPoolAddr?: string
  bondingCurve?: boolean
  tradingTime?: Date
  partyTradingTime?: Date
  publicTradingTime?: Date
}
