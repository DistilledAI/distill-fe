export const INVEST_ADDRESS = {
  vault: "WPmfvoFKKzx6CEYvTpYaBiH39nXvPQp1fvz7e6SZ4WS",
  manager: "vafeqL4dT3pejF7NE9HSevf1b7i1HwuCMG3CUGvEoSm",
  usdc: "v6ZegfKumXFEKzLAWiHouPe7KZsZq8kv6dq4Sc1Aqvq",
  shareToken: "vaAYYQDHqVHvj3JexZykm9vQbeQvhiQv9U1Wfe9UAnW",
  vault_config: "FWyomXM84eVGRQ3VqHwEM1wdVKcV5gMbrf9GYRZhFY5E",
  authority: "8SWacfZ2AGRejg4sC7fkCAaiszKHwhz41KsfXM3eunvm",
  whitelistDepositPda: "exD9H9JCaoLQ25Ky2F2EpsZrJfV2aR186AziSZ7EDQ1",
}

export function toUtfBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

export const SEED_VAULT_CONFIG = toUtfBytes("vault_config")
export const SEED_VAULT = toUtfBytes("vault")
export const SEED_SHARE_MINTER = toUtfBytes("share_minter")
export const SEED_WHITELIST_DEPOSIT = toUtfBytes("whitelist_deposit")
export const SEED_AUTHORITY = toUtfBytes("authority")
export const SEED_SHARE_INFO = toUtfBytes("share_info")
export const SEED_SELL_SHARE_INFO_DETAIL = toUtfBytes("sell_share_info_detail")

export const NAV_SCALE = 10000
