import { envConfig } from "@configs/env"
import { Connection, PublicKey } from "@solana/web3.js"
import { coinInfo } from "@types"
import axios from "axios"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils"
import { Metaplex } from "@metaplex-foundation/js"
import { fetchRetry } from "@oraichain/oraidex-common"
import { StakeTokenAddress } from ".."
import { STAKING_VAULT_ADDRESS } from "./constants"

const connection = new Connection(SOLANA_RPC, {
  wsEndpoint: SOLANA_WS,
  commitment: "confirmed",
})
const metaplex = Metaplex.make(connection)

export const getAgentCoinsInfo = async (
  params: any,
): Promise<{ coins: coinInfo[]; total: number; isError?: boolean }> => {
  try {
    const res = await axios.get(`${envConfig.agentBackendUrl}/coin`, {
      params,
    })
    return res.data
  } catch (error) {
    console.log("Get List agent token from BE failed", error)
    return {
      coins: [],
      total: 0,
      isError: true,
    }
  }
}

export const getMemeCoinsInfo = async (
  params: any,
): Promise<{ coins: coinInfo[]; total: number; isError?: boolean }> => {
  try {
    const res = await axios.get(`${envConfig.memeBackendUrl}/coin`, {
      params,
    })
    return res.data
  } catch (error) {
    console.log("Get List meme token from BE failed", error)
    return {
      coins: [],
      total: 0,
      isError: true,
    }
  }
}

export const getTokenInfoFromContract = async (tokenAddr: PublicKey) => {
  try {
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: tokenAddr }, { commitment: "confirmed" })
    return token
  } catch (error) {
    console.log({ "Error in getTokenInfoFromContract": error })
  }
}

type ProofData = {
  leaf: string
  proof: string[]
  amount: number
  index: number
}

export async function getProofForTokenClaim({
  stakerAddr,
  tokenAddr,
  randomKp,
}: {
  stakerAddr: string
  tokenAddr: string
  randomKp: string
}): Promise<ProofData | null> {
  try {
    const res = await fetchRetry(
      `${envConfig.stakingAirdropBackendUrl}/airdrops/tokens/${tokenAddr}/rounds/${randomKp}/stakers/${stakerAddr}/proof`,
    )
    const listProof: ProofData = await res.json()
    return listProof
  } catch (error) {
    console.log("get proof for token claim error", error)
    return null
  }
}

export const getVaultAddress = (tokenAddress: StakeTokenAddress) => {
  switch (tokenAddress) {
    case StakeTokenAddress.BlackRack:
      return STAKING_VAULT_ADDRESS.RACKS
    case StakeTokenAddress.Degenerator:
      return STAKING_VAULT_ADDRESS.GNRT

    default:
      return null
  }
}
