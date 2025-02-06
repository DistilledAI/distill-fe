import {
  STAKER_INFO_SEED,
  STAKING_VAULT_SEED,
  STAKING_UNBONDING_INFO_SEED,
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
import { FungStakingVault } from "./idl/staking_vault.ts"
import idl from "./idl/staking_vault.json"
import guardIdl from "./idl/guard_staking_vault.json"
import { handleTransaction } from "./utils"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils.ts"
import { getDurationByAddress } from "./helpers.ts"

export const vaultProgramId = new PublicKey(idl.address)
export const guardVaultProgramId = new PublicKey(guardIdl.address)

export const vaultInterface = JSON.parse(JSON.stringify(idl))
export const guardVaultInterface = JSON.parse(JSON.stringify(guardIdl))

export class Web3SolanaLockingToken {
  private connection: Connection

  constructor() {
    this.connection = new Connection(SOLANA_RPC, {
      commitment: "confirmed",
      wsEndpoint: SOLANA_WS,
    })
  }

  private _getProvider(wallet: WalletContextState): anchor.AnchorProvider {
    return new anchor.AnchorProvider(this.connection, wallet as any, {
      preflightCommitment: "confirmed",
    })
  }

  private _getProgram(
    isNoPeriod: boolean,
    provider: anchor.AnchorProvider,
  ): Program<FungStakingVault> {
    const idl = isNoPeriod ? guardVaultInterface : vaultInterface
    return new Program(idl, provider) as Program<FungStakingVault>
  }

  private _getVaultPda(
    stakeCurrencyMint: string,
    isNoPeriod: boolean,
    program: Program<FungStakingVault>,
  ): PublicKey {
    const mintKey = new PublicKey(stakeCurrencyMint)
    const seeds = isNoPeriod
      ? [Buffer.from(STAKING_VAULT_SEED), mintKey.toBytes()]
      : [
          Buffer.from(STAKING_VAULT_SEED),
          mintKey.toBytes(),
          new BN(getDurationByAddress(stakeCurrencyMint)).toBuffer("le", 8),
        ]
    const [vaultPda] = PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )
    return vaultPda
  }

  private _getVaultPdaWithUnbondingPeriod(
    stakeCurrencyMint: string,
    unbondingPeriod: number,
    program: Program<FungStakingVault>,
  ): PublicKey {
    const mintKey = new PublicKey(stakeCurrencyMint)
    const seeds = [
      Buffer.from(STAKING_VAULT_SEED),
      mintKey.toBytes(),
      new BN(unbondingPeriod).toBuffer("le", 8),
    ]
    const [vaultPda] = PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )
    return vaultPda
  }

  private _getUserStakePda(
    vaultPda: PublicKey,
    wallet: WalletContextState,
    program: Program<FungStakingVault>,
  ): PublicKey {
    const seeds = [
      Buffer.from(STAKER_INFO_SEED),
      vaultPda.toBytes(),
      wallet.publicKey!.toBytes(),
    ]
    const [userStakePda] = PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )
    return userStakePda
  }

  private _getUnbondingInfoPda(
    userStakePda: PublicKey,
    currentId: number,
    program: Program<FungStakingVault>,
  ): PublicKey {
    const seeds = [
      Buffer.from(STAKING_UNBONDING_INFO_SEED),
      userStakePda.toBytes(),
      new BN(currentId).toBuffer("le", 8),
    ]
    const [unbondingInfoPda] = PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )
    return unbondingInfoPda
  }

  private async _sendTransaction(
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

    const result = await provider.connection.confirmTransaction(
      {
        signature,
        ...(await provider.connection.getLatestBlockhash()),
      },
      "confirmed",
    )

    console.log("Transaction successful. Signature:", signature)
    return result
  }

  async stake(
    unbondingPeriod: number,
    amount: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
    isNoPeriod = false,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(isNoPeriod, provider)
      if (!wallet.publicKey) throw new Error("Wallet not connected")

      const stakeIx = isNoPeriod
        ? await program.methods
            //@ts-ignore
            .stake(new BN(amount))
            .accounts({
              signer: wallet.publicKey,
              stakeCurrencyMint,
            })
            .instruction()
        : await program.methods
            .stake(new BN(unbondingPeriod), new BN(amount))
            .accounts({
              signer: wallet.publicKey,
              stakeCurrencyMint,
            })
            .instruction()

      return await this._sendTransaction(provider, wallet, [stakeIx])
    } catch (error: any) {
      console.error("Staking error:", error)
      const { transaction = "", result } =
        (await handleTransaction({
          error,
          connection: this.connection,
        })) || {}
      if (result?.value?.confirmationStatus) {
        return { transaction, result }
      }
    }
  }

  async getStakerInfo(
    wallet: WalletContextState,
    stakeCurrencyMint: string,
    isNoPeriod = false,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(isNoPeriod, provider)
      if (!wallet.publicKey) throw new Error("Wallet not connected")

      const vaultPda = this._getVaultPda(stakeCurrencyMint, isNoPeriod, program)
      const userStakePda = this._getUserStakePda(vaultPda, wallet, program)

      const userData = await program.account.stakerInfo.fetch(userStakePda)
      return { totalStake: userData.totalStake }
    } catch (error) {
      console.error("Error fetching staker info:", error)
      return { totalStake: 0 }
    }
  }

  async getVaultInfo(
    stakeCurrencyMint: string,
    wallet: WalletContextState,
    isNoPeriod = false,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(isNoPeriod, provider)

      const vaultPda = this._getVaultPda(stakeCurrencyMint, isNoPeriod, program)
      const vaultData: any = await program.account.vault.fetch(vaultPda)

      return {
        totalStaked: vaultData.totalStaked,
        endDate: vaultData.endDate ? vaultData.endDate.toNumber() * 1000 : null,
      }
    } catch (error) {
      console.error("Error fetching vault info:", error)
      return null
    }
  }

  async isWhiteList(
    stakeCurrencyMint: string,
    wallet: WalletContextState,
    isNoPeriod = false,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(isNoPeriod, provider)

      const vaultPda = this._getVaultPda(stakeCurrencyMint, isNoPeriod, program)
      const [whitelistPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("whitelist"), vaultPda.toBytes()],
        program.programId,
      )

      const whitelist = await program.account.whitelistVault.fetch(whitelistPda)
      return whitelist.whitelisted
    } catch (error) {
      console.error("Error checking whitelist:", error)
      return false
    }
  }

  async unStake(
    unbondingPeriod: number,
    amount: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(false, provider)
      if (!wallet.publicKey) throw new Error("Wallet not connected")

      const vaultPda = this._getVaultPdaWithUnbondingPeriod(
        stakeCurrencyMint,
        unbondingPeriod,
        program,
      )
      const userStakePda = this._getUserStakePda(vaultPda, wallet, program)
      const userStakeInfo = await program.account.stakerInfo.fetch(userStakePda)

      const unbondingInfoPda = this._getUnbondingInfoPda(
        userStakePda,
        userStakeInfo.currentId.toNumber() + 1,
        program,
      )

      const unStakeIx = await program.methods
        .destake(new BN(unbondingPeriod), new BN(amount))
        .accounts({
          signer: wallet.publicKey,
          stakeCurrencyMint,
          unbondingInfoPda,
        })
        .instruction()

      return await this._sendTransaction(provider, wallet, [unStakeIx])
    } catch (error: any) {
      console.error("Unstaking error:", error)
      const { transaction = "", result } =
        (await handleTransaction({
          error,
          connection: this.connection,
        })) || {}
      if (result?.value?.confirmationStatus) {
        return { transaction, result }
      }
    }
  }

  async getUnbondingList(
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(false, provider)
      if (!wallet.publicKey) throw new Error("Wallet not connected")

      const accounts = await this.connection.getParsedProgramAccounts(
        program.programId,
        {
          commitment: "confirmed",
          filters: [
            { dataSize: 97 },
            {
              memcmp: {
                offset: 32,
                bytes: wallet.publicKey.toBase58(),
              },
            },
            {
              memcmp: {
                offset: 64,
                bytes: new PublicKey(stakeCurrencyMint).toBase58(),
              },
            },
          ],
        },
      )

      return accounts
        .map(({ account }) => {
          const data = program.coder.accounts.decode(
            "unbondingInfo",
            account.data as Buffer,
          )
          return {
            id: data.id.toNumber(),
            amount: data.amount.toNumber(),
            unstakedAtTime: data.unstakedAtTime.toNumber(),
            stakeCurrencyMint,
            claimed: data.claimed,
          }
        })
        .filter((item) => !item.claimed)
    } catch (error) {
      console.error("Error fetching unbonding list:", error)
      return []
    }
  }

  async withdraw(
    id: number,
    unbondingPeriod: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
    try {
      const provider = this._getProvider(wallet)
      const program = this._getProgram(false, provider)
      if (!wallet.publicKey) throw new Error("Wallet not connected")

      const withdrawIx = await program.methods
        .claimDeStake(new BN(id), new BN(unbondingPeriod))
        .accounts({
          signer: wallet.publicKey,
          stakeCurrencyMint,
        })
        .instruction()

      return await this._sendTransaction(provider, wallet, [withdrawIx])
    } catch (error: any) {
      console.error("Withdrawal error:", error)
      const { transaction = "", result } =
        (await handleTransaction({
          error,
          connection: this.connection,
        })) || {}
      if (result?.value?.confirmationStatus) {
        return { transaction, result }
      }
    }
  }
}
