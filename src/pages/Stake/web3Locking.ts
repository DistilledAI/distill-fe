import {
  STAKER_INFO_SEED,
  STAKING_VAULT_SEED,
  STAKING_UNBONDING_INFO_SEED,
} from "./config"
import { BN, Program } from "@coral-xyz/anchor"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { FungStakingVault } from "./idl/staking_vault.ts"
import idl from "./idl/staking_vault.json"
import guardIdl from "./idl/guard_staking_vault.json"
import { getDurationByAddress } from "./helpers.ts"
import { Web3StakeBase } from "./web3StakeBase.ts"

const vaultInterface = JSON.parse(JSON.stringify(idl))
const guardVaultInterface = JSON.parse(JSON.stringify(guardIdl))

export class Web3SolanaLockingToken extends Web3StakeBase {
  private hasPeriod: boolean

  constructor(hasPeriod = true) {
    super()
    this.hasPeriod = hasPeriod
  }

  private getVaultPda(
    stakeCurrencyMint: string,
    program: Program<FungStakingVault>,
  ): PublicKey {
    const mintKey = new PublicKey(stakeCurrencyMint)
    const seeds = !this.hasPeriod
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

  private getVaultPdaWithUnbondingPeriod(
    stakeCurrencyMint: string,
    unbondingPeriod: number | string,
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

  private getUserStakePda(
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

  private getUnbondingInfoPda(
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

  async stake(
    unbondingPeriod: number | string,
    amount: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram(
        provider,
        !this.hasPeriod ? guardVaultInterface : vaultInterface,
      )
      if (!wallet.publicKey) {
        console.error("Wallet not connected")
        return
      }

      const stakeIx = !this.hasPeriod
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

      return await this.sendTransaction(provider, wallet, [stakeIx])
    } catch (error: any) {
      console.error("Staking error:", error)
      return this.handleTransactionError(error)
    }
  }

  async getStakerInfo(wallet: WalletContextState, stakeCurrencyMint: string) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        !this.hasPeriod ? guardVaultInterface : vaultInterface,
      )
      if (!wallet.publicKey) {
        console.error("Wallet not connected")
        return
      }
      const vaultPda = this.getVaultPda(stakeCurrencyMint, program)
      const userStakePda = this.getUserStakePda(vaultPda, wallet, program)

      const userData = await program.account.stakerInfo.fetch(userStakePda)
      return { totalStake: userData.totalStake }
    } catch (error) {
      console.error("Error fetching staker info:", error)
      return { totalStake: 0 }
    }
  }

  async getVaultInfo(stakeCurrencyMint: string, wallet: WalletContextState) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        !this.hasPeriod ? guardVaultInterface : vaultInterface,
      )

      const vaultPda = this.getVaultPda(stakeCurrencyMint, program)
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

  async isWhiteList(stakeCurrencyMint: string, wallet: WalletContextState) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram<FungStakingVault>(
        provider,
        vaultInterface,
      )

      const vaultPda = this.getVaultPda(stakeCurrencyMint, program)
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
    unbondingPeriod: number | string,
    amount: number,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
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

      const vaultPda = this.getVaultPdaWithUnbondingPeriod(
        stakeCurrencyMint,
        unbondingPeriod,
        program,
      )
      const userStakePda = this.getUserStakePda(vaultPda, wallet, program)
      const userStakeInfo = await program.account.stakerInfo.fetch(userStakePda)

      const unbondingInfoPda = this.getUnbondingInfoPda(
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

      return await this.sendTransaction(provider, wallet, [unStakeIx])
    } catch (error: any) {
      console.error("Unstaking error:", error)
      return this.handleTransactionError(error)
    }
  }

  async getUnbondingList(
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram(provider, vaultInterface)
      if (!wallet.publicKey) {
        console.error("Wallet not connected")
        return
      }

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
    unbondingPeriod: number | string,
    wallet: WalletContextState,
    stakeCurrencyMint: string,
  ) {
    try {
      const provider = this.getProvider(wallet)
      const program = this.getProgram(provider, vaultInterface)
      if (!wallet.publicKey) {
        console.error("Wallet not connected")
        return
      }

      const withdrawIx = await program.methods
        .claimDeStake(new BN(id), new BN(unbondingPeriod))
        .accounts({
          signer: wallet.publicKey,
          stakeCurrencyMint,
        })
        .instruction()

      return await this.sendTransaction(provider, wallet, [withdrawIx])
    } catch (error: any) {
      console.error("Withdrawal error:", error)
      return this.handleTransactionError(error)
    }
  }
}
