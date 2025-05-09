import { LIST_TOKEN_STAKE, StakeTokenAddress } from "."
import { ALL_CONFIGS } from "./config"

export const getInfoTokenByAddress = (address: StakeTokenAddress | null) => {
  return address
    ? LIST_TOKEN_STAKE.find((item) => item.address === address)
    : null
}

const MAX_DURATION_STAKE = "18446744073709551615"

export const getDurationByAddress = (
  address: StakeTokenAddress | null | string,
) => {
  switch (address) {
    case StakeTokenAddress.LeeQuid:
    case StakeTokenAddress.JPOW:
    case StakeTokenAddress.BitMax:
      return 30 * 24 * 60 * 60 * 2

    case StakeTokenAddress.Banker:
    case StakeTokenAddress.Guard:
      return MAX_DURATION_STAKE

    default:
      return ALL_CONFIGS.DURATION_STAKE
  }
}

const noPeriodTokensForUI = [StakeTokenAddress.Guard, StakeTokenAddress.Banker]
export const checkHasPeriodForUI = (tokenAddress: StakeTokenAddress) => {
  return !noPeriodTokensForUI.includes(tokenAddress)
}
