export const INVEST_ADDRESS = {
  vault: "QrXtXQcwNgZJpc5JE56WdnnkHft4agsf7rxj1XrD8A3",
  manager: "vafeqL4dT3pejF7NE9HSevf1b7i1HwuCMG3CUGvEoSm",
  usdc: "v6ZegfKumXFEKzLAWiHouPe7KZsZq8kv6dq4Sc1Aqvq",
  shareToken: "vpi96fiFLfy7wHJB8G5XuzNVYz98WyX6MQWjBYvTDQJ",
  vault_config: "4Diisj5QK2JnYuKp1PR39yy2H35wGxj38Ys4VvZVZHQJ",
  authority: "XPRDB7M3JeMhFh7xW3mpzC7M56CjAJyoaTinpL9T16h",
  whitelistDepositPda: "ArfV1s9Q3cG2NQEpaRHeGmcEDKsQAfS5HmaspYX31CMZ",
}

export function toUtfBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

export const SEED_VAULT_CONFIG = toUtfBytes("vault_config")
export const SEED_VAULT = toUtfBytes("vault")
export const SEED_SHARE_MINTER = toUtfBytes("share_minter")
export const SEED_WHITELIST_DEPOSIT = toUtfBytes("whitelist_deposit")
export const SEED_AUTHORITY = toUtfBytes("authority")
export const SEED_SELL_SHARE_INFO = toUtfBytes("sell_share_info")
export const SEED_SELL_SHARE_INFO_DETAIL = toUtfBytes("sell_share_info_detail")

export const NAV_SCALE = 10000
