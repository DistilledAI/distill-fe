import { LIST_TOKEN_STAKE, StakeTokenAddress } from "."

export const getInfoTokenByAddress = (address: StakeTokenAddress | null) => {
  return address
    ? LIST_TOKEN_STAKE.find((item) => item.address === address)
    : null
}
