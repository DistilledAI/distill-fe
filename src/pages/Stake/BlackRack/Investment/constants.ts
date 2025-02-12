export const INVEST_ADDRESS = {
  vault: "21vCxhTX4NSJYWKnmfzz3P9VSPTkyBwuzkuZ8LVetXBf",
  manager: "GnMZJBVNAmk8nwXyeAmu6y3ogqJzsMfrZkBTHtdAvixo",
  usdc: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  shareToken: "moWFLVCW6HUo2dpSwgq7GGEhnzXhpk9yGmaZrPPhd57",
  vault_config: "BKJbENgj5nvNtVL3UjcL8SFkzvFSokrkuuewrR2y7ynS",
  authority: "8SWacfZ2AGRejg4sC7fkCAaiszKHwhz41KsfXM3eunvm",
  whitelistDepositPda: "9MWT5MXNWhkNXBGm3cYG21i1Gixcic2PYkBrYBx2Ft8s",
  lookupTable: "5Le3GJowpGX3nMo1dQ49zDZGC3UreVEidL9uHkUWfLqu"
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
