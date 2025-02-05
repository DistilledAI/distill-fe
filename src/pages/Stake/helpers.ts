import { LIST_TOKEN_STAKE, StakeTokenAddress } from "."
import { ALL_CONFIGS } from "./config"

export const getInfoTokenByAddress = (address: StakeTokenAddress | null) => {
  return address
    ? LIST_TOKEN_STAKE.find((item) => item.address === address)
    : null
}

export const getDurationByAddress = (
  address: StakeTokenAddress | null | string,
) => {
  switch (address) {
    case StakeTokenAddress.LeeQuid:
    case StakeTokenAddress.BlackRack:
      return ALL_CONFIGS.DURATION_STAKE * 2

    default:
      return ALL_CONFIGS.DURATION_STAKE
  }
}
