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
import { handleTransaction } from "../utils.ts"
// import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils.ts"

export const vaultProgramId = new PublicKey(idl.address)
export const vaultInterface = JSON.parse(JSON.stringify(idl))

export class Web3Airdrop {
  constructor(
    private readonly connection = new Connection(
      "https://devnet.helius-rpc.com/?api-key=791e2c4e-4495-45c4-b873-c8f35344e0c0",
      {
        commitment: "confirmed",
        wsEndpoint:
          "wss://devnet.helius-rpc.com/?api-key=791e2c4e-4495-45c4-b873-c8f35344e0c0",
      },
    ),
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
}
