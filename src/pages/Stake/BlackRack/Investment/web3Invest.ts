import * as anchor from "@coral-xyz/anchor"
import { BN } from "@coral-xyz/anchor"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { RacksVault } from "./idl/invest_vault"
import idl from "./idl/invest_vault.json"
import {
  INVEST_ADDRESS,
  NAV_SCALE,
  SEED_SHARE_INFO,
  SEED_VAULT,
  SEED_VAULT_CONFIG,
} from "./constants"
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  getMint,
} from "@solana/spl-token"
import { Web3StakeBase } from "@pages/Stake/web3StakeBase"

const vaultInterface = JSON.parse(JSON.stringify(idl))

export class Web3Invest extends Web3StakeBase {
  constructor() {
    super()
  }

  static getManagementFee(
    amount: number,
    currentTimeStamp: number,
    nextTimeTakeManagementFee: number,
    managementFee: number,
  ) {
    if (
      nextTimeTakeManagementFee === 0 ||
      currentTimeStamp > nextTimeTakeManagementFee
    ) {
      return (amount * 30 * managementFee) / 365 / 100
    }
    return (
      (amount *
        managementFee *
        (nextTimeTakeManagementFee - currentTimeStamp)) /
      (365 * 60 * 60 * 24) /
      100
    )
  }

  static async getAvgPrice(
    wallet: WalletContextState,
    program: anchor.Program<RacksVault>,
  ) {
    if (!wallet.publicKey) return new BN(0)
    try {
      const [shareInfoPda] = PublicKey.findProgramAddressSync(
        [
          SEED_SHARE_INFO,
          new PublicKey(INVEST_ADDRESS.vault).toBytes(),
          wallet.publicKey.toBytes(),
        ],
        program.programId,
      )
      const resInfo = await program.account.shareInfo.fetch(shareInfoPda)
      return resInfo.avgPrice
    } catch (error) {
      console.error("Get avg price error:", error)
      return new BN(0)
    }
  }

  static getPerformanceFee(
    shareAmount: number,
    avgPrice: number,
    navPrice: number,
    performanceFee: number,
  ) {
    if (avgPrice >= navPrice) return 0
    const diff_nav = navPrice - avgPrice
    return (shareAmount * diff_nav * performanceFee) / 100 / NAV_SCALE
  }

  async deposit({
    wallet,
    amount,
  }: {
    wallet: WalletContextState
    amount: BN
  }) {
    let provider: anchor.AnchorProvider | null = null
    try {
      provider = await this.getProvider(wallet)
      if (!provider || !wallet.publicKey) {
        console.log("Wallet not connected")
        return
      }

      const program = this.getProgram<RacksVault>(provider, vaultInterface)
      const userAta = getAssociatedTokenAddressSync(
        new PublicKey(INVEST_ADDRESS.shareToken),
        wallet.publicKey,
      )

      const instructions = []
      const userAtaInfo = await this.connection.getAccountInfo(userAta)
      if (!userAtaInfo) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            userAta,
            wallet.publicKey,
            new PublicKey(INVEST_ADDRESS.shareToken),
          ),
        )
      }

      const depositIx = await program.methods
        .buyShare({ amount })
        .accounts({
          signer: wallet.publicKey,
          manager: new PublicKey(INVEST_ADDRESS.manager),
          depositToken: new PublicKey(INVEST_ADDRESS.usdc),
          shareToken: new PublicKey(INVEST_ADDRESS.shareToken),
        })
        .instruction()
      instructions.push(depositIx)

      return await this.sendTransaction(provider, wallet, instructions)
    } catch (error: any) {
      console.log("Deposit error:", error)
      return this.handleTransactionError(error)
    }
  }

  async unbound({
    wallet,
    amount,
  }: {
    wallet: WalletContextState
    amount: BN
  }) {
    let provider: anchor.AnchorProvider | null = null
    try {
      provider = await this.getProvider(wallet)
      if (!provider || !wallet.publicKey) {
        console.log("Wallet not connected")
        return
      }

      const program = this.getProgram<RacksVault>(provider, vaultInterface)
      const unboundIx = await program.methods
        .sellShare({ shareAmount: amount })
        .accounts({
          signer: wallet.publicKey,
          manager: new PublicKey(INVEST_ADDRESS.manager),
          depositToken: new PublicKey(INVEST_ADDRESS.usdc),
          shareToken: new PublicKey(INVEST_ADDRESS.shareToken),
        })
        .instruction()

      return await this.sendTransaction(provider, wallet, [unboundIx])
    } catch (error: any) {
      console.log("Unbound error:", error)
      return this.handleTransactionError(error)
    }
  }

  async getUnbondingList(wallet: WalletContextState) {
    try {
      const provider = await this.getProvider(wallet)
      if (!provider || !wallet.publicKey) {
        console.log("Wallet not connected")
        return
      }

      const program = this.getProgram<RacksVault>(provider, vaultInterface)
      return program.account.sellShareInfoDetail.all([
        {
          memcmp: { offset: 16, bytes: wallet.publicKey.toBase58() },
        },
      ])
    } catch (error) {
      console.error("Get unbonding list error:", error)
      return []
    }
  }

  async getStakerShare(wallet: WalletContextState) {
    try {
      if (!wallet.publicKey) return 0
      const shareATA = getAssociatedTokenAddressSync(
        new PublicKey(INVEST_ADDRESS.shareToken),
        wallet.publicKey,
      )
      const balance = await this.connection.getTokenAccountBalance(shareATA)
      return balance.value.amount
    } catch (error) {
      console.error("Get staker share error:", error)
      return 0
    }
  }

  async getVault(wallet: WalletContextState) {
    try {
      const provider = await this.getProvider(wallet)
      if (!provider) return this.defaultVaultData()

      const program = this.getProgram<RacksVault>(provider, vaultInterface)
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

      const [vaultAccount, vaultConfigData, mintInfo] = await Promise.all([
        program.account.vault.fetch(vault),
        program.account.vaultConfig.fetch(vault_config),
        getMint(this.connection, new PublicKey(INVEST_ADDRESS.shareToken)),
      ])

      const avgPrice = await Web3Invest.getAvgPrice(wallet, program)

      return {
        nav: vaultAccount.nav,
        aum: vaultAccount.aum,
        avgPrice,
        totalShares: mintInfo.supply,
        highestNav: vaultAccount.highestNav,
        managementFee: vaultConfigData.managementFee,
        performanceFee: vaultConfigData.performanceFee,
        nextTimeTakeManagementFee: vaultAccount.nextTimeTakeManagementFee,
      }
    } catch (error) {
      console.error("Get vault error:", error)
      return this.defaultVaultData()
    }
  }

  private defaultVaultData() {
    return {
      nav: new BN(0),
      aum: new BN(0),
      avgPrice: new BN(0),
      totalShares: new BN(0),
      highestNav: new BN(0),
      managementFee: new BN(0),
      performanceFee: new BN(0),
      nextTimeTakeManagementFee: new BN(0),
    }
  }

  async withdraw(wallet: WalletContextState, id: number) {
    let provider: anchor.AnchorProvider | null = null
    try {
      provider = await this.getProvider(wallet)
      if (!provider || !wallet.publicKey) {
        console.log("Wallet not connected")
        return
      }

      const program = this.getProgram<RacksVault>(provider, vaultInterface)
      const withdrawIx = await program.methods
        .claim(new BN(id))
        .accounts({
          signer: wallet.publicKey,
          manager: new PublicKey(INVEST_ADDRESS.manager),
          shareToken: new PublicKey(INVEST_ADDRESS.shareToken),
          depositToken: new PublicKey(INVEST_ADDRESS.usdc),
        })
        .instruction()

      return await this.sendTransaction(provider, wallet, [withdrawIx])
    } catch (error: any) {
      console.log("Withdraw error:", error)
      return this.handleTransactionError(error)
    }
  }
}
