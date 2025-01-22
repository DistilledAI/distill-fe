import * as anchor from "@coral-xyz/anchor"
import { BN, Program } from "@coral-xyz/anchor"
import { WalletContextState } from "@solana/wallet-adapter-react"
import {
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js"
import { RacksVault } from "./idl/invest_vault"
import idl from "./idl/invest_vault.json"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils.ts"
import { handleTransaction } from "@pages/Stake/utils.ts"
import {
  INVEST_ADDRESS,
  SEED_SELL_SHARE_INFO,
  SEED_SELL_SHARE_INFO_DETAIL,
} from "./constants"

export const vaultProgramId = new PublicKey(idl.address)
export const vaultInterface = JSON.parse(JSON.stringify(idl))

export class Web3Invest {
  constructor(
    private readonly connection = new Connection(SOLANA_RPC, {
      commitment: "confirmed",
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  async deposit({
    wallet,
    amount,
  }: {
    wallet: WalletContextState
    amount: BN
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
      ) as Program<RacksVault>

      const transaction = new Transaction()
      const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

      const depositIx = await program.methods
        .buyShare({
          amount,
        })
        .accounts({
          signer: wallet.publicKey,
          manager: new PublicKey(INVEST_ADDRESS.manager),
          depositToken: new PublicKey(INVEST_ADDRESS.usdc),
          shareToken: new PublicKey(INVEST_ADDRESS.shareToken),
        })
        .instruction()

      transaction.add(depositIx)
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

        console.log(
          "Successfully deposit reward token.\n Signature: ",
          signature,
        )
        return res
      }
    } catch (error: any) {
      console.log("Error in deposit token transaction", error, error.error)

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

  async unbound({
    wallet,
    amount,
  }: {
    wallet: WalletContextState
    amount: BN
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
      ) as Program<RacksVault>

      const [sell_share_info_pda] = PublicKey.findProgramAddressSync(
        [
          SEED_SELL_SHARE_INFO,
          new PublicKey(INVEST_ADDRESS.vault).toBytes(),
          wallet.publicKey.toBytes(),
        ],
        program.programId,
      )

      const sellInfo =
        await program.account.sellShareInfo.fetch(sell_share_info_pda)
      const [sell_share_info_detail_pda] = PublicKey.findProgramAddressSync(
        [
          SEED_SELL_SHARE_INFO_DETAIL,
          sell_share_info_pda.toBytes(),
          new BN(sellInfo.id.toNumber() + 1).toBuffer("le", 8),
        ],
        program.programId,
      )

      const transaction = new Transaction()
      const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

      const unboundIx = await program.methods
        .sellShare({
          shareAmount: amount,
        })
        .accounts({
          signer: wallet.publicKey,
          manager: new PublicKey(INVEST_ADDRESS.manager),
          depositToken: new PublicKey(INVEST_ADDRESS.usdc),
          shareToken: new PublicKey(INVEST_ADDRESS.shareToken),
          sellShareInfoDetailPda: sell_share_info_detail_pda,
        })
        .instruction()

      transaction.add(unboundIx)
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

        console.log(
          "Successfully unbound reward token.\n Signature: ",
          signature,
        )
        return res
      }
    } catch (error: any) {
      console.log("Error in unbound token transaction", error, error.error)

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
