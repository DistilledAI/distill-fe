import * as anchor from "@coral-xyz/anchor"
import { BN, Program } from "@coral-xyz/anchor"
import { WalletContextState } from "@solana/wallet-adapter-react"
import {
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js"
import { MerkleAirdrop } from "./idl/merkle_airdrop.ts"
import idl from "./idl/merkle_airdrop.json"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils.ts"
import { handleTransaction } from "@utils/web3.ts"
import { STAKING_VAULT_SEED } from "../config.ts"
import { FungStakingVault } from "../idl/staking_vault.ts"
import idlFungStakingVault from "../idl/staking_vault.json"

export const vaultProgramId = new PublicKey(idl.address)
export const vaultInterface = JSON.parse(JSON.stringify(idl))
export const vaultFungStakingVaultInterface = JSON.parse(
  JSON.stringify(idlFungStakingVault),
)

export class Web3Airdrop {
  constructor(
    private readonly connection = new Connection(SOLANA_RPC, {
      commitment: "confirmed",
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  async claim({
    wallet,
    randomKp,
    index,
    amount,
    proof,
    stakingVault,
    rewardToken,
  }: {
    wallet: WalletContextState
    randomKp: PublicKey
    rewardToken: PublicKey
    stakingVault: PublicKey
    index: BN
    amount: BN
    proof: string[]
  }) {
    let provider
    try {
      provider = new anchor.AnchorProvider(this.connection, wallet as any, {
        preflightCommitment: "confirmed",
      })
      anchor.setProvider(provider)
      provider = anchor.getProvider()
      if (!provider.connection || !wallet.publicKey) {
        console.log("Warning: Wallet not connected")
        return
      }
      const program = new Program(
        vaultInterface,
        provider,
      ) as Program<MerkleAirdrop>

      const transaction = new Transaction()
      const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

      const claimIx = await program.methods
        .claim(
          randomKp,
          index,
          amount,
          proof.map((p) => Array.from(Buffer.from(p, "base64"))),
        )
        .accounts({
          signer: wallet.publicKey,
          stakingVault,
          tokenMint: rewardToken,
        })
        .instruction()

      transaction.add(claimIx)
      transaction.add(cpIx, cuIx)
      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (
        await provider.connection.getLatestBlockhash()
      ).blockhash

      if (wallet.signTransaction) {
        const signedTx = await wallet.signTransaction(transaction)
        const sTx = signedTx.serialize()
        const signature = await provider.connection.sendRawTransaction(sTx, {
          preflightCommitment: "confirmed",
          skipPreflight: false,
        })
        const blockhash = await provider.connection.getLatestBlockhash()

        const res = await provider.connection.confirmTransaction(
          {
            signature,
            blockhash: blockhash.blockhash,
            lastValidBlockHeight: blockhash.lastValidBlockHeight,
          },
          "confirmed", // FIXME: trick lord confirmed / finalized;
        )

        console.log("Successfully claim reward token.\n Signature: ", signature)
        return res
      }
    } catch (error: any) {
      console.log("Error in claim token transaction", error, error.error)

      if (!provider) {
        return
      }
      const { transaction = "", result } =
        (await handleTransaction({
          error,
          connection: provider.connection,
        })) || {}

      if (result?.value?.confirmationStatus) {
        console.log("----confirm----", { transaction, result })
        return { transaction, result }
      }
    }
  }

  async getStakingVaultAddress({
    wallet,
    stakeCurrencyMint,
    unbondingPeriod,
  }: {
    wallet: WalletContextState
    stakeCurrencyMint: string
    unbondingPeriod: number | string
  }) {
    let provider
    try {
      provider = new anchor.AnchorProvider(this.connection, wallet as any, {
        preflightCommitment: "confirmed",
      })
      anchor.setProvider(provider)
      provider = anchor.getProvider()
      const program = new Program(
        vaultFungStakingVaultInterface,
        provider,
      ) as Program<FungStakingVault>

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKING_VAULT_SEED),
          new PublicKey(stakeCurrencyMint).toBytes(),
          new BN(unbondingPeriod).toBuffer("le", 8),
        ],
        program.programId,
      )

      const stakingVault = vaultPda.toBase58()
      return stakingVault
    } catch (error) {
      console.error("Get staking vault error:", error)
      return null
    }
  }
}
