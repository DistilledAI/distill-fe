import * as anchor from "@coral-xyz/anchor"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { ComputeBudgetProgram, Connection, Transaction } from "@solana/web3.js"
import { Program } from "@coral-xyz/anchor"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils.ts"
import { handleTransaction } from "./utils"

export class Web3StakeBase {
  protected connection: Connection

  constructor() {
    this.connection = new Connection(SOLANA_RPC, {
      commitment: "confirmed",
      wsEndpoint: SOLANA_WS,
    })
  }

  protected getProvider(wallet: WalletContextState): anchor.AnchorProvider {
    return new anchor.AnchorProvider(this.connection, wallet as any, {
      preflightCommitment: "confirmed",
    })
  }

  protected getProgram<T extends anchor.Idl>(
    provider: anchor.AnchorProvider,
    idl: any,
  ): Program<T> {
    return new Program(idl, provider) as Program<T>
  }

  protected async sendTransaction(
    provider: anchor.AnchorProvider,
    wallet: WalletContextState,
    instructions: anchor.web3.TransactionInstruction[],
  ): Promise<any> {
    const transaction = new Transaction()
    const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 1_000_000,
    })
    const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

    transaction.add(cpIx, cuIx)
    transaction.add(...instructions)

    transaction.feePayer = wallet.publicKey!
    transaction.recentBlockhash = (
      await provider.connection.getLatestBlockhash()
    ).blockhash

    const signedTx = await wallet.signTransaction!(transaction)
    const serializedTx = signedTx.serialize()

    const signature = await provider.connection.sendRawTransaction(
      serializedTx,
      {
        preflightCommitment: "confirmed",
        skipPreflight: false,
      },
    )
    const blockhash = await provider.connection.getLatestBlockhash()
    const result = await provider.connection.confirmTransaction(
      {
        signature,
        blockhash: blockhash.blockhash,
        lastValidBlockHeight: blockhash.lastValidBlockHeight,
      },
      "confirmed",
    )

    console.log("Transaction successful. Signature:", signature)
    return result
  }

  protected async handleTransactionError(error: any) {
    const { transaction = "", result } =
      (await handleTransaction({
        error,
        connection: this.connection,
      })) || {}
    if (result?.value?.confirmationStatus) {
      return { transaction, result }
    }
    return null
  }
}
