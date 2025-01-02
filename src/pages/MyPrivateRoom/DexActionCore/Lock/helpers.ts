import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { BN, Program } from "@coral-xyz/anchor"
import { SOLANA_RPC, SOLANA_WS } from "../constants"
import { Vault } from "./locking"
import idl from "./locking.json"
import { LockTokenParams } from "../interface"
import { setComputePriceLimit, setComputeUnitLimit } from "../helpers"

export const lockWithSolNetwork = async (params: LockTokenParams) => {
  const { lockAmount, lockPeriod, agentWalletAddress, tokenAddress } = params

  const programInterface = JSON.parse(JSON.stringify(idl)) as Vault

  const connection = new Connection(SOLANA_RPC, {
    commitment: "confirmed",
    wsEndpoint: SOLANA_WS,
  })

  const program = new Program(programInterface, {
    connection,
  }) as Program<Vault>

  const VAULT_SEED = "staking_vault"
  const STAKE_CONFIG_SEED = "staking_config"
  const STAKER_INFO_SEED = "staker_info"
  const STAKE_DETAIL_SEED = "stake_detail"

  const stakeCurrencyMint = new PublicKey(tokenAddress)

  const agentAddress = new PublicKey(agentWalletAddress)

  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from(STAKE_CONFIG_SEED), stakeCurrencyMint.toBytes()],
    program.programId,
  )
  const [vaultPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(VAULT_SEED),
      configPda.toBytes(),
      new BN(lockPeriod).toBuffer("le", 8),
    ],
    program.programId,
  )
  const [stakerInfoPda] = PublicKey.findProgramAddressSync(
    [Buffer.from(STAKER_INFO_SEED), vaultPda.toBytes(), agentAddress.toBytes()],
    program.programId,
  )
  let currentId = 0
  try {
    const stakerInfo = await program.account.stakerInfo.fetch(stakerInfoPda)
    currentId = stakerInfo.currentId.toNumber()
  } catch (e) {
    console.log(`error when get current id ${e}`)
  }

  const [userStakeDetailPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(STAKE_DETAIL_SEED),
      stakerInfoPda.toBytes(),
      new BN(currentId + 1).toBuffer("le", 8),
    ],
    program.programId,
  )

  const tx = new Transaction()
    .add(setComputePriceLimit)
    .add(setComputeUnitLimit)
    .add(
      await program.methods
        .stake(new BN(lockPeriod), new BN(lockAmount))
        .accounts({
          signer: agentAddress,
          stakeCurrencyMint: stakeCurrencyMint,
          stakeDetailPda: userStakeDetailPda,
        })
        .transaction(),
    )

  tx.feePayer = agentAddress
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  return tx
}
