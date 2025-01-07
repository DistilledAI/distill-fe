import { envConfig } from "@configs/env.ts"
import * as anchor from "@coral-xyz/anchor"
import { BN } from "@coral-xyz/anchor"
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token"
import { WalletContextState } from "@solana/wallet-adapter-react"
import {
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionExpiredTimeoutError,
} from "@solana/web3.js"
import BigNumber from "bignumber.js"
import { EVENT, EVENT_CONFIG, PUBKEYS } from "program/constants.ts"
import { toast } from "react-toastify"
import { getCurrentPredictRound } from "services/game.ts"
import idl from "../idl/solora_pyth_price.json"
import { SoloraPythPrice } from "../types/solora_pyth_price.ts"

export const commitmentLevel = "confirmed"
export const TOKEN_RESERVES = 1_000_000_000_000_000
export const LAMPORT_RESERVES = 1_000_000_000
export const INIT_BONDING_CURVE = 95

export const SOLANA_RPC =
  envConfig.solanaRpc ||
  "https://devnet.helius-rpc.com/?api-key=791e2c4e-4495-45c4-b873-c8f35344e0c0"
export const SOLANA_WS =
  envConfig.solanaWs ||
  "wss://devnet.helius-rpc.com/?api-key=791e2c4e-4495-45c4-b873-c8f35344e0c0"

export const endpoint = SOLANA_RPC
export const pythProgramId = new PublicKey(idl.address)
export const pythProgramInterface = JSON.parse(JSON.stringify(idl))

export const CHAINLINK_PROGRAM = new PublicKey(
  "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny",
)

export const CHAINLINK_FEED = new PublicKey(
  "Cv4T27XbjVoKUYwP72NQQanvZeA7W4YF9L4EnYT9kx5o",
) // BTC/USD

export class Web3SolanaProgramInteraction {
  constructor(
    private readonly connection = new Connection(endpoint, {
      commitment: commitmentLevel,
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  getEventConfig = async (wallet: WalletContextState) => {
    try {
      const response = await getCurrentPredictRound()
      if (
        response.data &&
        response.data.items?.[0] &&
        response.data.items[0].roundIndex
      ) {
        const nextRoundId = response.data.items[0].roundIndex
        const stringifyConfig = response.data.items[0].config
        const config = JSON.parse(stringifyConfig)
        config.eventDataConfig.nextRoundId = nextRoundId
        const eventConfigPdaPublicKey = new PublicKey(config.eventConfigPda)

        return { ...config, eventConfigPda: eventConfigPdaPublicKey }
      }

      // check the connection
      if (!this.connection) {
        // !wallet.publicKey ||
        console.log("Warning: Connection Notfound")
        return { eventDataConfig: "", eventConfigPda: "" }
      }
      const provider = new anchor.AnchorProvider(
        this.connection,
        wallet as any,
        {
          preflightCommitment: "confirmed",
        },
      )
      anchor.setProvider(provider)
      const program = new anchor.Program(
        pythProgramInterface,
        provider,
      ) as anchor.Program<SoloraPythPrice>

      const [eventConfigPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(EVENT_CONFIG),
          new PublicKey(PUBKEYS.MAINNET.EVENT_AUTHORITY).toBytes(),
          new PublicKey(PUBKEYS.MAINNET.MODERATOR).toBytes(),
          new PublicKey(PUBKEYS.MAINNET.CURRENCY_MINT).toBytes(),
          CHAINLINK_PROGRAM.toBytes(),
          CHAINLINK_FEED.toBytes(),
        ],
        program.programId,
      )

      const eventDataConfig =
        await program.account.eventConfig.fetch(eventConfigPda)

      return { eventDataConfig, eventConfigPda }
    } catch (error) {
      console.log("error: getEventConfig", error)
      return { eventDataConfig: "", eventConfigPda: "" }
    }
  }

  getEventData = async (
    wallet: WalletContextState,
    eventConfigPda: PublicKey,
    currentRound: number,
  ) => {
    // check the connection
    if (!this.connection) {
      console.log("Warning: Connection Notfound")
      return { eventData: "", eventPDA: "" }
    }
    const provider = new anchor.AnchorProvider(this.connection, wallet as any, {
      preflightCommitment: "confirmed",
    })
    anchor.setProvider(provider)

    const program = new anchor.Program(
      pythProgramInterface,
      provider,
    ) as anchor.Program<SoloraPythPrice>

    const [event] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(EVENT),
        eventConfigPda.toBytes(),
        Buffer.from(new BN(currentRound).toArray("le", 8)),
      ],
      program.programId,
    )

    const eventData = await program.account.event.fetch(event)

    return { eventData, eventPDA: event }
  }

  getBetInfoByUser = async (wallet: WalletContextState, event: PublicKey) => {
    try {
      // check the connection
      if (!wallet.publicKey || !this.connection) {
        console.log("Warning: Wallet not connected")
        return ""
      }
      const provider = new anchor.AnchorProvider(
        this.connection,
        wallet as any,
        {
          preflightCommitment: "confirmed",
        },
      )
      anchor.setProvider(provider)

      const program = new anchor.Program(
        pythProgramInterface,
        provider,
      ) as anchor.Program<SoloraPythPrice>
      const [order] = PublicKey.findProgramAddressSync(
        [Buffer.from("order"), event.toBytes(), wallet.publicKey.toBytes()],
        program.programId,
      )
      const fetchedOrder = await program.account.order.fetch(order)

      return fetchedOrder
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null
    }
  }

  createOrder = async (
    wallet: WalletContextState,
    betAmount: string,
    side: any,
  ) => {
    try {
      const currencyMint = new PublicKey(PUBKEYS.MAINNET.CURRENCY_MINT)
      // check the connection
      if (!wallet.publicKey || !this.connection) {
        console.log("Warning: Wallet not connected")
        return ""
      }
      const provider = new anchor.AnchorProvider(
        this.connection,
        wallet as any,
        {
          preflightCommitment: "confirmed",
        },
      )
      anchor.setProvider(provider)

      const program = new anchor.Program(
        pythProgramInterface,
        provider,
      ) as anchor.Program<SoloraPythPrice>

      const [eventConfigPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(EVENT_CONFIG),
          new PublicKey(PUBKEYS.MAINNET.EVENT_AUTHORITY).toBytes(),
          new PublicKey(PUBKEYS.MAINNET.MODERATOR).toBytes(),
          currencyMint.toBytes(),
          CHAINLINK_PROGRAM.toBytes(),
          CHAINLINK_FEED.toBytes(),
        ],
        program.programId,
      )

      const eventConfig =
        await program.account.eventConfig.fetch(eventConfigPda)

      const [event] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("event"),
          eventConfigPda.toBytes(),
          // new BN(eventConfig.nextRoundId.toNumber() - 1).toBuffer("le", 8),
          Buffer.from(
            new BN(eventConfig.nextRoundId.toNumber() - 1).toArray("le", 8),
          ),
        ],
        program.programId,
      )
      const currentRound = await program.account.event.fetch(event)

      const currentTime = Math.floor(Date.now() / 1000)

      console.log(
        "200",
        eventConfig.nextRoundId.toNumber() - 1,
        currentRound.startTime.toNumber(),
        currentTime,
        currentRound.lockTime.toNumber(),
        betAmount,
        side,
      )

      // FIXME: update check time
      if (
        currentRound.startTime.toNumber() <= currentTime &&
        currentTime <= currentRound.lockTime.toNumber()
      ) {
        // const betAmount = new BN(100000)
        // const side = { up: {} }

        const [order] = PublicKey.findProgramAddressSync(
          [Buffer.from("order"), event.toBytes(), wallet.publicKey.toBuffer()],
          program.programId,
        )

        const eventCurrencyAccount = getAssociatedTokenAddressSync(
          currencyMint,
          event,
          true,
        )
        const userCurrencyAccount = getAssociatedTokenAddressSync(
          currencyMint,
          wallet.publicKey,
        )

        const transaction = new Transaction()
        const updateCpIx = ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 1_000_000,
        })
        const updateCuIx = ComputeBudgetProgram.setComputeUnitLimit({
          units: 4_000_000,
        })
        const createIx = await program.methods
          .createOrder(side, new BN(betAmount))
          .accountsStrict({
            authority: wallet.publicKey,
            order,
            event,
            eventConfig: eventConfigPda,
            systemProgram: SystemProgram.programId,
          })
          .remainingAccounts([
            {
              isWritable: false,
              isSigner: false,
              pubkey: currencyMint,
            },
            {
              isWritable: true,
              isSigner: false,
              pubkey: eventCurrencyAccount,
            },
            {
              isWritable: true,
              isSigner: false,
              pubkey: userCurrencyAccount,
            },
            {
              isWritable: false,
              isSigner: false,
              pubkey: TOKEN_PROGRAM_ID,
            },
            {
              isWritable: false,
              isSigner: false,
              pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
            },
            {
              isWritable: false,
              isSigner: false,
              pubkey: SYSVAR_RENT_PUBKEY,
            },
          ])
          .instruction()

        console.log("createIx", createIx)

        transaction.add(updateCpIx, updateCuIx, createIx)

        transaction.feePayer = wallet.publicKey
        const blockhash = await this.connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash.blockhash

        console.log("--------------------------------------")
        console.log(transaction)

        if (wallet.signTransaction) {
          const signedTx = await wallet.signTransaction(transaction)
          const sTx = signedTx.serialize()
          console.log(
            "---- simulate tx",
            await this.connection.simulateTransaction(signedTx),
          )
          const signature = await this.connection.sendRawTransaction(sTx, {
            preflightCommitment: "confirmed",
            skipPreflight: false,
          })
          const res = await this.connection.confirmTransaction(
            {
              signature,
              blockhash: blockhash.blockhash,
              lastValidBlockHeight: blockhash.lastValidBlockHeight,
            },
            "finalized",
          )
          console.log("Successfully initialized.\n Signature: ", signature)
          toast.success("Transaction successfully!")
          return {
            result: res,
          }
        }
      } else {
        throw Error("Round was locked")
      }
    } catch (error: any) {
      console.log("Error Create Order :>>", error, error.error)
      const { transaction = "", result } =
        (await this.handleTransaction({
          error,
        })) || {}

      if (result?.value?.confirmationStatus) {
        console.log("----confirm----Exprired----", { transaction, result })
        toast.success("Transaction successfully!")
        return { transaction, result }
      }
      toast.error("Transaction failed!")
      return false
    }
  }

  claimOrder = async (
    wallet: WalletContextState,
    eventID?: any,
    eventAddr?: string,
  ) => {
    try {
      const currencyMint = new PublicKey(PUBKEYS.MAINNET.CURRENCY_MINT)
      // check the connection
      if (!wallet.publicKey || !this.connection) {
        console.log("Warning: Wallet not connected")
        return ""
      }
      const provider = new anchor.AnchorProvider(
        this.connection,
        wallet as any,
        {
          preflightCommitment: "confirmed",
        },
      )
      anchor.setProvider(provider)

      const program = new anchor.Program(
        pythProgramInterface,
        provider,
      ) as anchor.Program<SoloraPythPrice>

      const [eventConfigPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(EVENT_CONFIG),
          new PublicKey(PUBKEYS.MAINNET.EVENT_AUTHORITY).toBytes(),
          new PublicKey(PUBKEYS.MAINNET.MODERATOR).toBytes(),
          currencyMint.toBytes(),
          CHAINLINK_PROGRAM.toBytes(),
          CHAINLINK_FEED.toBytes(),
        ],
        program.programId,
      )

      const eventConfig =
        await program.account.eventConfig.fetch(eventConfigPda)

      const [event] = eventAddr
        ? [new PublicKey(eventAddr)]
        : PublicKey.findProgramAddressSync(
            [
              Buffer.from("event"),
              eventConfigPda.toBytes(),
              // new BN(eventConfig.nextRoundId.toNumber() - 1).toBuffer("le", 8),

              Buffer.from(new BN(eventID).toArray("le", 8)),
            ],
            program.programId,
          )
      const currentRound = await program.account.event.fetch(event)
      console.log(currentRound.id.toNumber())

      const [order] = PublicKey.findProgramAddressSync(
        [Buffer.from("order"), event.toBytes(), wallet.publicKey.toBytes()],
        program.programId,
      )

      const currentTime = Math.floor(Date.now() / 1000)
      if (
        currentRound.lockTime.toNumber() + currentRound.waitPeriod >
        currentTime
      ) {
        throw new Error(`This round is not over yet.`)
      }
      console.log(order)

      const eventDetail = await program.account.event.fetch(event)
      // const orderDetail = await program.account.order.fetch(order)

      if (eventDetail.outcome.undrawn) {
        console.log("This round is not over yet.")
      }
      // if (
      //   !eventDetail.outcome.invalid &&
      //   !eventDetail.outcome.same &&
      //   eventDetail.outcome != orderDetail.outcome
      // ) {
      //   console.log("You lose!")
      //   return
      // }

      const eventCurrencyAccount = getAssociatedTokenAddressSync(
        currencyMint,
        event,
        true,
      )

      const userCurrencyAccount = getAssociatedTokenAddressSync(
        currencyMint,
        wallet.publicKey,
      )
      const feeCurrencyAccount = getAssociatedTokenAddressSync(
        currencyMint,
        eventConfig.feeAccount,
      )

      const transaction = new Transaction()
      const updateCpIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1_000_000,
      })
      const updateCuIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 4_000_000,
      })
      const createIx = await program.methods
        .settleOrder()
        .accountsStrict({
          authority: wallet.publicKey,
          eventConfig: eventConfigPda,
          event,
          order,
          feeAccount: eventConfig.feeAccount,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .remainingAccounts([
          {
            isWritable: false,
            isSigner: false,
            pubkey: currencyMint,
          },
          {
            isWritable: true,
            isSigner: false,
            pubkey: eventCurrencyAccount,
          },
          {
            isWritable: true,
            isSigner: false,
            pubkey: userCurrencyAccount,
          },
          {
            isWritable: true,
            isSigner: false,
            pubkey: feeCurrencyAccount,
          },
          {
            isWritable: false,
            isSigner: false,
            pubkey: TOKEN_PROGRAM_ID,
          },
          {
            isWritable: false,
            isSigner: false,
            pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
          },
        ])
        .instruction()

      // console.log("createIx", createIx)

      transaction.add(updateCpIx, updateCuIx, createIx)

      transaction.feePayer = wallet.publicKey
      const blockhash = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash.blockhash

      console.log("--------------------------------------")
      console.log(transaction)

      if (wallet.signTransaction) {
        const signedTx = await wallet.signTransaction(transaction)
        const sTx = signedTx.serialize()
        console.log(
          "---- simulate tx",
          await this.connection.simulateTransaction(signedTx),
        )
        const signature = await this.connection.sendRawTransaction(sTx, {
          preflightCommitment: "confirmed",
          skipPreflight: false,
        })
        const res = await this.connection.confirmTransaction(
          {
            signature,
            blockhash: blockhash.blockhash,
            lastValidBlockHeight: blockhash.lastValidBlockHeight,
          },
          "finalized",
        )
        console.log("Successfully initialized.\n Signature: ", signature)
        toast.success("Transaction successfully!")
        return {
          result: res,
        }
      }
    } catch (error: any) {
      console.log("Error Create Order :>>", error, error.error)
      const { transaction = "", result } =
        (await this.handleTransaction({
          error,
        })) || {}

      if (result?.value?.confirmationStatus) {
        console.log("----confirm----Exprired----", { transaction, result })
        toast.success("Transaction successfully!")
        return { transaction, result }
      }
      toast.error("Transaction failed!")
      return false
    }
  }

  getTokenBalance = async (walletAddress: string, tokenMintAddress: string) => {
    if (!walletAddress) return 0
    const wallet = new PublicKey(walletAddress)
    const tokenMint = new PublicKey(tokenMintAddress)

    // Fetch the token account details
    const response = await this.connection.getTokenAccountsByOwner(wallet, {
      mint: tokenMint,
    })

    if (response.value.length == 0) {
      console.log("No token account found for the specified mint address.")
      return
    }

    // Get the balance
    const tokenAccountInfo = await this.connection.getTokenAccountBalance(
      response.value[0].pubkey,
    )

    return tokenAccountInfo.value.uiAmount
  }

  getSolanaBalance = async (publicKey: PublicKey) => {
    const balance = await this.connection.getBalance(publicKey)
    const balanceSolana = new BigNumber(balance)
      .dividedBy(LAMPORTS_PER_SOL)
      .toNumber()

    return balanceSolana
  }

  isTransactionExpiredTimeoutError(error: any) {
    return error instanceof TransactionExpiredTimeoutError
  }

  handleTransaction = async ({
    error,
  }: {
    error: TransactionExpiredTimeoutError
  }) => {
    try {
      if (this.isTransactionExpiredTimeoutError(error) || error["signature"]) {
        const result = await this.connection.getSignatureStatus(
          error.signature,
          {
            searchTransactionHistory: true,
          },
        )

        if (result?.value?.confirmationStatus) {
          console.log(result)

          return { transaction: error.signature, result }
        }
      }

      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
