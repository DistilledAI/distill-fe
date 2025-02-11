import { STAKING_VAULT_SEED, VOTER_SEED } from "./../Stake/config"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { Web3StakeBase } from "@pages/Stake/web3StakeBase"
import { FungStakingVault } from "../Stake/idl/staking_vault.ts"
import * as anchor from "@coral-xyz/anchor"

import idl from "../Stake/idl/staking_vault.json"
import { BN } from "@coral-xyz/anchor"
import { Keypair, PublicKey } from "@solana/web3.js"
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
      console.error("Create error:", error)
      return { result: null, proposal: null }
    }
  }

  async voteProposal({
    unbondingPeriod,
    wallet,
    stakeCurrencyMint,
    proposalPublicKey,
    option,
  }: {
    unbondingPeriod: number | string
    wallet: WalletContextState
    stakeCurrencyMint: string
    proposalPublicKey: string
    option: number
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

      const voteIx = await program.methods
        .voteProposal(new BN(unbondingPeriod), option)
        .accounts({
          stakeCurrencyMint,
          proposal: proposalPublicKey,
        })
        .instruction()

      return await this.sendTransaction(provider, wallet, [voteIx])
    } catch (error) {
      console.error(error)
      return this.handleTransactionError(error)
    }
  }

  async getProposals({
    unbondingPeriod,
    wallet,
    stakeCurrencyMint,
  }: {
    unbondingPeriod: number | string
    wallet: WalletContextState
    stakeCurrencyMint: string
  }) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        vaultInterface,
      )

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKING_VAULT_SEED),
          new PublicKey(stakeCurrencyMint).toBytes(),
          new BN(unbondingPeriod).toBuffer("le", 8),
        ],
        program.programId,
      )

      const proposals = await this.connection.getParsedProgramAccounts(
        program.programId,
        {
          commitment: "confirmed",
          filters: [
            { dataSize: 289 },
            {
              memcmp: {
                offset: 72,
                bytes: vaultPda.toBase58(),
              },
            },
          ],
        },
      )

      return proposals.map((proposal) => {
        const proposalDetail = program.coder.accounts.decode<
          anchor.IdlAccounts<FungStakingVault>["proposal"]
        >("proposal", proposal.account.data as Buffer)

        return {
          proposal: proposalDetail.proposal.toBase58(),
          creator: proposalDetail.creator.toBase58(),
          vault: proposalDetail.vault.toBase58(),
          createdTime: proposalDetail.createdTime.toNumber(),
          expirationTime: proposalDetail.expirationTime.toNumber(),
          uri: proposalDetail.uri,
          options: proposalDetail.options,
          voteCount: proposalDetail.voteCount.map((vote) => vote.toNumber()),
          quorum: proposalDetail.quorum,
          threshold: proposalDetail.threshold,
        }
      })
    } catch (error: any) {
      console.error("Staking error:", error)
      return []
    }
  }

  async getProposalsDetail({
    wallet,
    proposalPublicKey,
  }: {
    wallet: WalletContextState
    proposalPublicKey: string
  }) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        vaultInterface,
      )
      const proposalDetail =
        await program.account.proposal.fetch(proposalPublicKey)
      return {
        proposal: proposalDetail.proposal.toBase58(),
        creator: proposalDetail.creator.toBase58(),
        vault: proposalDetail.vault.toBase58(),
        createdTime: proposalDetail.createdTime.toNumber(),
        expirationTime: proposalDetail.expirationTime.toNumber(),
        uri: proposalDetail.uri,
        options: proposalDetail.options,
        voteCount: proposalDetail.voteCount.map((vote) => vote.toNumber()),
        quorum: proposalDetail.quorum,
        threshold: proposalDetail.threshold,
      }
    } catch (error: any) {
      console.error("Staking error:", error)
      return null
    }
  }

  async getUserVote({
    wallet,
    proposalPublicKey,
  }: {
    wallet: WalletContextState
    proposalPublicKey: string
  }) {
    try {
      if (!wallet.publicKey) {
        return { option: null }
      }
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        vaultInterface,
      )

      const [VotePda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(VOTER_SEED),
          new PublicKey(proposalPublicKey).toBytes(),
          wallet.publicKey?.toBytes(),
        ],
        program.programId,
      )

      const voteDetail = await program.account.voter.fetch(VotePda)

      if (voteDetail) return { option: voteDetail.option }
      return { option: null }
    } catch (error: any) {
      console.error(error)
      return { option: null }
    }
  }
}
