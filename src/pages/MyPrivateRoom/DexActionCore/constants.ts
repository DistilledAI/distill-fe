export const SOLANA_RPC =
  "https://mainnet.helius-rpc.com/?api-key=5660b1f6-78f6-4316-b541-7fc5137b2026"
export const SOLANA_WS =
  "wss://mainnet.helius-rpc.com/?api-key=5660b1f6-78f6-4316-b541-7fc5137b2026"

export const SOL_COMPUTE_UNIT_LIMIT = 100000
export const SOL_MICRO_LAMPORTS = 100000
export const TIMER = {
  MILLISECONDS: 1000,
  MONTH_TO_SECONDS: 30 * 24 * 60 * 60,
  HAFT_MILLISECOND: 500,
  MILLISECOND: 1000,
  SECOND: 60,
  MINUTE: 60,
  HOUR: 24,
  DAY_TO_SECONDS: 15 * 60,
}
export enum TypeLock {
  MONTH = "months",
  DAY = "days",
  MIN = "minutes",
}

export const LOCK_TIME_OPTIONS = [
  {
    title: "1 month",
    value: 1,
    id: 1,
  },
  {
    title: "3 months",
    value: 3,
    id: 2,
  },
  {
    title: "6 months",
    value: 6,
    id: 3,
  },
]

export enum TokenKey {
  MAX = "MAX",
  SOLANA = "SOLANA",
}

export const TOKENS = {
  [TokenKey.MAX]: {
    id: "max",
    decimals: 6,
    label: "MAX",
    address: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
  },
  [TokenKey.SOLANA]: {
    id: "solana",
    decimals: 9,
    label: "SOL",
    address: "So11111111111111111111111111111111111111112",
  },
}
