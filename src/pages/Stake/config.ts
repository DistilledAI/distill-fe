import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export const RPC_MAPS = {
  Rpc1: "https://solana-mainnet.phantom.app/YBPpkkN4g91xDiAnTE9r0RcMkjg0sKUIWvAfoFVJ", // phantom
  // Rpc1: import.meta.env.VITE_SOLANA_RPC, // phantom
  Rpc2: "https://cold-hanni-fast-mainnet.helius-rpc.com", // drift
  // Rpc3: 'https://mainnet-beta.solflare.network', // solflare
  Rpc3: "https://solana-public.agents.land", // agents.land
  Rpc4: "https://rpc.ironforge.network/mainnet?apiKey=01J3QVEMHPE2ZSG1BAGGJ9G60W",
  // 'Agents.Land': import.meta.env.VITE_SOLANA_RPC,

  Custom: "https://",
}
export const RPC_DEFAULT_KEY = "Rpc1"
export const RPC_FALLBACK_KEY = "Rpc2"
export const DEFAULT_RPC = RPC_MAPS[RPC_DEFAULT_KEY] || RPC_MAPS.Rpc1
export const FALLBACK_RPC = RPC_MAPS[RPC_FALLBACK_KEY] || RPC_MAPS.Rpc2

export const AXIOS_TIMEOUT = 10000

export const SOL_PRICE_KEY = "SOL_PRICE_KEY"

export const SOLANA_ENV = import.meta.env.VITE_APP_SOLANA_ENV || "mainnet-beta"

export const SPL_DECIMAL = 6
export const SOL_DECIMAL = 9
export const MAX_RETRY_QUERY_TOKEN = 3
export const LIMIT_PAGINATION = 8
export const SEED_GLOBAL = "global"
export const TX_FEE = 0.25

/**
 * STAKING VAULTS
 */
export const STAKING_VAULT_SEED = "staking_vault"
export const STAKING_STAKER_INFO_SEED = "staker_info"
export const STAKING_UNBONDING_INFO_SEED = "unbonding_info_seed"
/**
 * STRONGBOX VAULTS
 */
export const STRONG_BOX_VAULT_SEED = "staking_vault"
export const STRONG_BOX_STAKE_CONFIG_SEED = "staking_config"
export const STAKER_INFO_SEED = "staker_info"
export const STAKE_DETAIL_SEED = "stake_detail"

/**
 * FUNGIBLE LOCK
 */
export const FUNGIBLE_VAULT_SEED = "staking_vault"
export const FUNGIBLE_STAKE_CONFIG_SEED = "staking_config"
export const STAKE_FUNGIBLE_INFO_SEED = "stake_info"

export const PARRY_STATUS = "party_status"
export const BLACK_LIST_ADDRESS = [
  "oraigyiRnYoCgFiaLnpiaPvJjZbs5zzmWHp4sxBgZq3", // BlackRack
  "Au2AaBHBJ2b5E9eERrff58Byspu4Esg7CxJYrkNBeZa6", // TSM
  // gen test

  "BRqRVPwtyndv2vaWNFjDSv8fH7Rccnfeo8uw5RxSbjUt",
  "7XKfaPix942j4iuJcB57yNb9eUCJEk8arLzReBy8Wq83",
  "APwbeogTeENbdLZM4xsFZuwEGWn8zVRLVzuPziQfEMoS",
  "4YAUi3ZnjeHmNx1LUxsavxxAHvFExX8ep72hJtDNKkU2",
  "DbKiFv3JkZSCtmcMWnTo3NzCApUKaXkKaWq2441JNETi",
  "88FR4czxf7syvNsrEQZ9cLP2AFnxodFfGmXNsbdJQCBn",
  "HgZWwzuUwRKScwvdncp2aG5kkQKnWEQKQHsagRf8qCkn",
  "GvF2U3ZQmsVagRP4FrgD7ETjwTutBeSdCVQM9CzTG8XD",
  "6ypXJsniSKVrynxwLqtJkBdVhZj6m3yE4A6fNJbrRoa",
  "9UTMesxqi2cv7cXXkswrksnsFff65dB41B7ve6EWppJU",
  "3NdUk319N7aKSyVt8LsJvupeeuYn8ojhC9uwyJqmoeTe",
  "2s72rmFpx8B48jDzw2pDrdUgGra3YmFH6bWnubhgvkuU",
  "DzvehmQYSzd4bAmwkge9GoLSN6abxP8Xvie6YTbnu7EQ",
  "AR9hpPi7jn4QwZVUUDm1kC9GSpmL1pqV5ofpwzbpWaEH",
  "5u4BdDHAPKTgw2aaQxVYsojmJGsEUNWxsT9xJChBpcaL",
  "MNg5gaa36GXZTgbAemn2aMiRoDct54TkrfDX8Kz6UpC",
  "7exZSwq17Kg3aC4Q1QtQYVrvj6nu5XivcKEDnjtU3mVB",
  "FLbuiaNtsmhm28Aq5Pg2RYvZof7pFp9aYFF1mr6PJGs6",
  "HrVAhZEeVaJiBoDVQELDiugiavjJFXMfsEqTjievSccE",
  "Bxn23vGQzhG12Bk3xMPvRx8PdgFgggb4fs2CGsfkZrQd",
]
// export const OFFICIAL_TIME = 1735059600000; // time go live 0h00 - 25/12/2024
// export const OFFICIAL_TIME = 1735059600; // time go live

export const CONFIGS: Record<
  string,
  {
    PROGRAM_ID: string
    DISTILL_COMMUNITY_POOL_WALLET: string
    STAKE_CURRENCY_MINT: string
    STRONGBOX_VAULT_PROGRAM_ID: string
    BONDING_CURVE_LIMIT: number
    INIT_SOL_BONDING_CURVE: number
    TIMER: {
      MILLISECONDS: number
      MONTH_TO_SECONDS: number
      HAFT_MILLISECOND: number
      MILLISECOND: number
      SECOND: number
      MINUTE: number
      HOUR: number
      DAY_TO_SECONDS: number
    }
    SHOW_DECIMALS_PRICE: number
    OFFICIAL_TIME: number
    LOCK_FUNGIBLE_STAKE: number
    STAKE_SOFT_CAP: number
    STAKING_PROGRAM_ID: string
    DURATION_STAKE: number
  }
> = {
  // localnet keys are in cli/local-scripts/
  localnet: {
    PROGRAM_ID: "agentDiuyLRQEZgByNRnDErj1FcXyfyZysaQBDfwNNM",
    DISTILL_COMMUNITY_POOL_WALLET:
      "ADRbQMzWXQiXocmTj67HCHubyYWrEdLbZcjZKUChoSEc",
    STAKE_CURRENCY_MINT: "8NHfoL9NjSNwBRKCCrDBmbqByFoaZ1AcMJ6Dn17CWqWx",
    STRONGBOX_VAULT_PROGRAM_ID: "9grg8RG2prncny136yjDMy5BZcwhB4NvqGMGDFs7QtKy",
    BONDING_CURVE_LIMIT: 85 * LAMPORTS_PER_SOL,
    INIT_SOL_BONDING_CURVE: 3 * LAMPORTS_PER_SOL,
    TIMER: {
      MILLISECONDS: 1000,
      MONTH_TO_SECONDS: 60,
      HAFT_MILLISECOND: 500,
      MILLISECOND: 1000,
      SECOND: 60,
      MINUTE: 60,
      HOUR: 24,
      DAY_TO_SECONDS: 24 * 60 * 60,
    },
    DURATION_STAKE: 300,
    SHOW_DECIMALS_PRICE: 9,
    OFFICIAL_TIME: 1735059600000,
    LOCK_FUNGIBLE_STAKE: 300,
    STAKE_SOFT_CAP: 5000000,
    STAKING_PROGRAM_ID: "CmM3iSUBXGnURkHiG6DneSp8fkvkxy5L9oqfTUhMxV7u",
  },
  devnet: {
    PROGRAM_ID: "agentDiuyLRQEZgByNRnDErj1FcXyfyZysaQBDfwNNM",
    DISTILL_COMMUNITY_POOL_WALLET:
      "CyokHgfzAWYaaFR2P37hfHz3H3RRF6u9A6RNhWraSyoN",
    STAKE_CURRENCY_MINT: "3Ff7yUkQsbMzViXu7aAxAYsgpy31wY8R8TteE39FDuw4",
    STRONGBOX_VAULT_PROGRAM_ID: "9grg8RG2prncny136yjDMy5BZcwhB4NvqGMGDFs7QtKy",
    BONDING_CURVE_LIMIT: 260 * LAMPORTS_PER_SOL,
    INIT_SOL_BONDING_CURVE: 60 * LAMPORTS_PER_SOL,
    TIMER: {
      MILLISECONDS: 1000,
      MONTH_TO_SECONDS: 60,
      HAFT_MILLISECOND: 500,
      MILLISECOND: 1000,
      SECOND: 60,
      MINUTE: 60,
      HOUR: 24,
      DAY_TO_SECONDS: 24 * 60 * 60,
    },
    DURATION_STAKE: 300,
    SHOW_DECIMALS_PRICE: 9,
    OFFICIAL_TIME: 1735059600000,
    LOCK_FUNGIBLE_STAKE: 300,
    STAKE_SOFT_CAP: 5000000,
    STAKING_PROGRAM_ID: "CmM3iSUBXGnURkHiG6DneSp8fkvkxy5L9oqfTUhMxV7u",
  },
  "mainnet-beta": {
    PROGRAM_ID: "agentDiuyLRQEZgByNRnDErj1FcXyfyZysaQBDfwNNM",
    DISTILL_COMMUNITY_POOL_WALLET:
      "HJbs8zNyiMQP46S1MrcVsyPQs9hDnf5bcmscU1rPxi3d",
    STAKE_CURRENCY_MINT: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
    STRONGBOX_VAULT_PROGRAM_ID: "Fke77idjs2D92Ha6uGJKfe94z62nDgjY3mHGsm9kskiH",
    BONDING_CURVE_LIMIT: 260 * LAMPORTS_PER_SOL,
    INIT_SOL_BONDING_CURVE: 60 * LAMPORTS_PER_SOL,
    TIMER: {
      MILLISECONDS: 1000,
      MONTH_TO_SECONDS: 30 * 24 * 60 * 60,
      HAFT_MILLISECOND: 500,
      MILLISECOND: 1000,
      SECOND: 60,
      MINUTE: 60,
      HOUR: 24,
      DAY_TO_SECONDS: 24 * 60 * 60,
    },
    DURATION_STAKE: 30 * 24 * 60 * 60,
    SHOW_DECIMALS_PRICE: 9,
    OFFICIAL_TIME: 1735059600000,
    LOCK_FUNGIBLE_STAKE: 14 * 86400,
    STAKE_SOFT_CAP: 5000000,
    STAKING_PROGRAM_ID: "CmM3iSUBXGnURkHiG6DneSp8fkvkxy5L9oqfTUhMxV7u",
  },
  "mainnet-beta-test": {
    PROGRAM_ID: "agentDiuyLRQEZgByNRnDErj1FcXyfyZysaQBDfwNNM",
    DISTILL_COMMUNITY_POOL_WALLET:
      "HJbs8zNyiMQP46S1MrcVsyPQs9hDnf5bcmscU1rPxi3d",
    STAKE_CURRENCY_MINT: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
    STRONGBOX_VAULT_PROGRAM_ID: "Fke77idjs2D92Ha6uGJKfe94z62nDgjY3mHGsm9kskiH",
    BONDING_CURVE_LIMIT: 260 * LAMPORTS_PER_SOL,
    INIT_SOL_BONDING_CURVE: 60 * LAMPORTS_PER_SOL,
    TIMER: {
      MILLISECONDS: 1000,
      MONTH_TO_SECONDS: 30 * 24 * 60 * 60,
      HAFT_MILLISECOND: 500,
      MILLISECOND: 1000,
      SECOND: 60,
      MINUTE: 60,
      HOUR: 24,
      DAY_TO_SECONDS: 5 * 60,
    },
    DURATION_STAKE: 30 * 24 * 60 * 60,
    SHOW_DECIMALS_PRICE: 12,
    OFFICIAL_TIME: 1735059600000,
    LOCK_FUNGIBLE_STAKE: 86400 * 14,
    STAKE_SOFT_CAP: 5000000,
    STAKING_PROGRAM_ID: "CmM3iSUBXGnURkHiG6DneSp8fkvkxy5L9oqfTUhMxV7u",
  },
}

export const ALL_CONFIGS = CONFIGS[SOLANA_ENV] || CONFIGS["mainnet-beta"]

export const PROGRAM_ID = ALL_CONFIGS.PROGRAM_ID ?? ""
