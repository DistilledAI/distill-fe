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
import { INVEST_ADDRESS, SEED_VAULT, SEED_VAULT_CONFIG } from "./constants"
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token"

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
      const userAta = getAssociatedTokenAddressSync(
        new PublicKey(INVEST_ADDRESS.shareToken),
        wallet.publicKey,
      )

      const userAtaInfo = await this.connection.getAccountInfo(userAta)
      if (!userAtaInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            userAta,
            wallet.publicKey,
            new PublicKey(INVEST_ADDRESS.shareToken),
          ),
        )
      }

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

  async getUnbondingList(wallet: WalletContextState) {
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
      const unbondings = await program.account.sellShareInfoDetail.all([
        {
          memcmp: {
            offset: 16,
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ])

      return unbondings
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async getStakerShare(wallet: WalletContextState) {
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
      const shareATA = getAssociatedTokenAddressSync(
        new PublicKey(INVEST_ADDRESS.shareToken),
        wallet.publicKey,
      )
      const balance = await this.connection.getTokenAccountBalance(shareATA)
      return balance.value.amount
    } catch (error) {
      console.error(error)
      return 0
    }
  }
  async getVault(wallet: WalletContextState) {
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

      const [vault_config] = PublicKey.findProgramAddressSync(
        [SEED_VAULT_CONFIG, new PublicKey(INVEST_ADDRESS.manager).toBytes()],
        program.programId,
      )
      const [vault] = PublicKey.findProgramAddressSync(
        [
          SEED_VAULT,
          vault_config.toBytes(),
          new PublicKey(INVEST_ADDRESS.shareToken).toBytes(),
        ],
        program.programId,
      )

      const vaultAccount = await program.account.vault.fetch(vault)
      return vaultAccount.nav
    } catch (error) {
      console.error(error)
      return new BN(0)
    }
  }

  async withdraw(wallet: WalletContextState, id: number) {
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

      const unboundIx = await program.methods
        .claim(new BN(id))
        .accounts({
          signer: wallet.publicKey,
          manager: new PublicKey(INVEST_ADDRESS.manager),
          shareToken: new PublicKey(INVEST_ADDRESS.shareToken),
          depositToken: new PublicKey(INVEST_ADDRESS.usdc),
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
