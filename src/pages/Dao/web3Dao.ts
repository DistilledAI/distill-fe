import { WalletContextState } from "@solana/wallet-adapter-react"
import { Web3StakeBase } from "@pages/Stake/web3StakeBase"
import { FungStakingVault } from "../Stake/idl/staking_vault.ts"

import idl from "../Stake/idl/staking_vault.json"
import { BN } from "@coral-xyz/anchor"
import { Keypair } from "@solana/web3.js"
const vaultInterface = JSON.parse(JSON.stringify(idl))

export class Web3Dao extends Web3StakeBase {
  constructor() {
    super()
  }

  async createProposal({
    unbondingPeriod,
    uri,
    wallet,
    stakeCurrencyMint,
    numOptions,
  }: {
    unbondingPeriod: number | string
    uri: string
    wallet: WalletContextState
    stakeCurrencyMint: string
    numOptions: number
  }) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        vaultInterface,
      )
      if (!wallet.publicKey) {
        console.error("Wallet not connected")
        return
      }

      const proposal = Keypair.generate()

      const createIx = await program.methods
        .createProposal(new BN(unbondingPeriod), uri, numOptions)
        .accounts({
          stakeCurrencyMint,
          proposal: proposal.publicKey,
        })
        .signers([proposal])
        .instruction()

      const result = await this.sendTransaction(
        provider,
        wallet,
        [createIx],
        [proposal],
      )

      return { result, proposal }
    } catch (error: any) {
      console.error("Staking error:", error)
      return { result: null, proposal: null }
    }
  }
}
