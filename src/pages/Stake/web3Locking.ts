import {
  STAKER_INFO_SEED,
  STAKING_VAULT_SEED,
  STAKING_UNBONDING_INFO_SEED,
  ALL_CONFIGS,
} from "./config"
import * as anchor from "@coral-xyz/anchor"
import { BN, Program } from "@coral-xyz/anchor"
import { WalletContextState } from "@solana/wallet-adapter-react"
import {
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js"
import { FungStakingVault } from "./staking_vault.ts"
import idl from "./staking_vault.json"
import { handleTransaction } from "./utils"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils.ts"

export const vaultProgramId = new PublicKey(idl.address)
export const vaultInterface = JSON.parse(JSON.stringify(idl))

// const stakeCurrencyMint = ALL_CONFIGS.STAKE_CURRENCY_MINT

export class Web3SolanaLockingToken {
  constructor(
    private readonly connection = new Connection(SOLANA_RPC, {
      commitment: "confirmed",
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  async stake(
    unbondingPeriod: number,
    amount: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
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
      ) as Program<FungStakingVault>

      const transaction = new Transaction()
      const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

      const stakeIx = await program.methods
        .stake(new BN(unbondingPeriod), new BN(amount))
        .accounts({
          signer: wallet.publicKey,
          stakeCurrencyMint,
        })

        .instruction()

      transaction.add(stakeIx)
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

        console.log("Successfully locking token.\n Signature: ", signature)
        return res
      }
    } catch (error: any) {
      console.log("Error in locking token transaction", error, error.error)
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

  async getStakerInfo(wallet: WalletContextState, stakeCurrencyMint: string) {
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
      ) as Program<FungStakingVault>

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKING_VAULT_SEED),
          new PublicKey(stakeCurrencyMint).toBytes(),
          new BN(ALL_CONFIGS.DURATION_STAKE).toBuffer("le", 8),
        ],
        program.programId,
      )

      // validate user's vault stake info
      const [userStakePda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKER_INFO_SEED),
          vaultPda.toBytes(),
          wallet.publicKey.toBytes(),
        ],
        program.programId,
      )

      const userData = await program.account.stakerInfo.fetch(userStakePda)
      return {
        totalStake: userData.totalStake,
      }
    } catch (error) {
      console.error(error)
      return {
        totalStake: 0,
      }
    }
  }

  async getVaultInfo(stakeCurrencyMint: string, wallet: WalletContextState) {
    try {
      let provider
      provider = new anchor.AnchorProvider(this.connection, wallet as any, {
        preflightCommitment: "confirmed",
      })
      anchor.setProvider(provider)
      provider = anchor.getProvider()
      const program = new Program(
        vaultInterface,
        provider,
      ) as Program<FungStakingVault>
      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKING_VAULT_SEED),
          new PublicKey(stakeCurrencyMint).toBytes(),
          new BN(ALL_CONFIGS.DURATION_STAKE).toBuffer("le", 8),
        ],
        program.programId,
      )

      const vaultData = await program.account.vault.fetch(vaultPda)
      return {
        totalStaked: vaultData.totalStaked,
      }
    } catch (error) {
      console.error(error)
    }
  }

  // async getListLockedOfUser(lockPeriod: number, wallet: WalletContextState) {
  //   let vaultInfo = { totalStaked: new BN("0") }
  //   try {
  //     const provider = anchor.getProvider()
  //     if (!provider.connection) {
  //       console.log("Warning: Wallet not connected")
  //       return
  //     }
  //     const program = new Program(vaultInterface, provider) as Program<Vault>

  //     const [configPda] = PublicKey.findProgramAddressSync(
  //       [
  //         Buffer.from(STRONG_BOX_STAKE_CONFIG_SEED),
  //         new PublicKey(stakeCurrencyMint).toBytes(),
  //       ],
  //       program.programId,
  //     )
  //     const [vaultPda] = PublicKey.findProgramAddressSync(
  //       [
  //         Buffer.from(STRONG_BOX_VAULT_SEED),
  //         configPda.toBytes(),
  //         new BN(lockPeriod).toBuffer("le", 8),
  //       ],
  //       program.programId,
  //     )

  //     vaultInfo = (await program.account.vault.fetch(vaultPda)) || {
  //       totalStaked: new BN("0"),
  //     }

  //     if (!wallet.publicKey) {
  //       return { listLockedItems: [], vaultInfo }
  //     }

  //     const [stakerInfoPda] = PublicKey.findProgramAddressSync(
  //       [
  //         Buffer.from(STAKER_INFO_SEED),
  //         vaultPda.toBytes(),
  //         wallet.publicKey.toBytes(),
  //       ],
  //       program.programId,
  //     )

  //     let currentId = 0
  //     try {
  //       const stakerInfo = await program.account.stakerInfo.fetch(stakerInfoPda)
  //       currentId = stakerInfo.currentId.toNumber()

  //       const listLockedItems = await Promise.all(
  //         [...new Array(currentId)].map(async (_item, key) => {
  //           const [userStakeDetailPda] = PublicKey.findProgramAddressSync(
  //             [
  //               Buffer.from(STAKE_DETAIL_SEED),
  //               stakerInfoPda.toBytes(),
  //               new BN(key + 1).toBuffer("le", 8),
  //             ],
  //             program.programId,
  //           )

  //           const info =
  //             await program.account.stakeDetail.fetch(userStakeDetailPda)

  //           return { ...(info || {}), lockPeriod }
  //         }),
  //       )

  //       return { listLockedItems, vaultInfo }
  //     } catch (error) {
  //       throw error
  //     }
  //   } catch (error) {
  //     console.log("get list error", error)
  //     return { listLockedItems: [], vaultInfo }
  //   }
  // }

  async unStake(
    unbondingPeriod: number,
    amount: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
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
      ) as Program<FungStakingVault>

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKING_VAULT_SEED),
          new PublicKey(stakeCurrencyMint).toBytes(),
          new BN(unbondingPeriod).toBuffer("le", 8),
        ],
        program.programId,
      )

      const [userStakePda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKER_INFO_SEED),
          vaultPda.toBytes(),
          wallet.publicKey.toBytes(),
        ],
        program.programId,
      )

      const userStakeInfo = await program.account.stakerInfo.fetch(userStakePda)
      const [unbondingInfoPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(STAKING_UNBONDING_INFO_SEED),
          userStakePda.toBytes(),
          new BN(userStakeInfo.currentId.toNumber() + 1).toBuffer("le", 8),
        ],
        program.programId,
      )

      const transaction = new Transaction()
      const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

      const unStakeIx = await program.methods
        .destake(new BN(unbondingPeriod), new BN(amount))
        .accounts({
          signer: wallet.publicKey,
          stakeCurrencyMint,
          unbondingInfoPda,
        })
        .instruction()

      transaction.add(unStakeIx)
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

        console.log("Successfully unlocking token.\n Signature: ", signature)
        return res
      }
    } catch (error: any) {
      console.log("Error in locking token transaction", error, error.error)

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

  async getUnbondingList(
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
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
      ) as Program<FungStakingVault>

      const unbondings = await this.connection.getParsedProgramAccounts(
        program.programId,
        {
          commitment: "confirmed",
          filters: [
            {
              dataSize: 97,
            },
            {
              memcmp: {
                offset: 32, // number of bytes
                bytes: wallet.publicKey.toBase58(), // base58 encoded string
              },
            },
            {
              memcmp: {
                offset: 64, // number of bytes
                bytes: new PublicKey(stakeCurrencyMint).toBase58(), // base58 encoded string
              },
            },
          ],
        },
      )

      const unbondingInfo: {
        id: number
        amount: number
        unstakedAtTime: number
        stakeCurrencyMint: string
      }[] = []

      for (const unbonding of unbondings) {
        const stakeData = program.coder.accounts.decode<
          anchor.IdlAccounts<FungStakingVault>["unbondingInfo"]
        >("unbondingInfo", unbonding.account.data as Buffer)

        if (!stakeData.claimed) {
          unbondingInfo.push({
            id: stakeData.id.toNumber(),
            amount: stakeData.amount.toNumber(),
            unstakedAtTime: stakeData.unstakedAtTime.toNumber(),
            stakeCurrencyMint,
          })
        }
      }

      return unbondingInfo
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async withdraw(
    id: number,
    unbondingPeriod: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
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
      ) as Program<FungStakingVault>

      const transaction = new Transaction()
      const cpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const cuIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 })

      const unStakeIx = await program.methods
        .claimDeStake(new BN(id), new BN(unbondingPeriod))
        .accounts({
          signer: wallet.publicKey,
          stakeCurrencyMint,
        })
        .instruction()

      transaction.add(unStakeIx)
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

        console.log("Successfully unlocking token.\n Signature: ", signature)
        return res
      }
    } catch (error: any) {
      console.log("Error in locking token transaction", error, error.error)

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
