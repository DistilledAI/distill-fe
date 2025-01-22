export const INVEST_ADDRESS = {
  vault: "6kGD7KZmzYeShJab5659TNGaKxs8XHYJb9Dpnc3unhC8",
  usdc: "v6ZegfKumXFEKzLAWiHouPe7KZsZq8kv6dq4Sc1Aqvq",
  shareToken: "v41emVMVDU8FEukVPc56Gtoc4cn1dHmPBYrBxuPduPs",
  vault_config: "4Yhev2YSPYcmQEZLvtxJDqkgeFia89jHCCFfcpR6RiEh",
  authority: "85jP2e8ZGLRepsBA81vv6aZTV7T672mN5gR6F6S9K61F",
  whitelistDepositPda: "GfdZoLuEsz9vhB2MDw61CX38rAjJczkaV9DR4yoCCvs6",
  manager: "vafeqL4dT3pejF7NE9HSevf1b7i1HwuCMG3CUGvEoSm",
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
