import { Connection, Transaction } from "@solana/web3.js"
import { setComputePriceLimit, setComputeUnitLimit } from "../helpers"
import { createTransferCheckedInstruction } from "@solana/spl-token"
import { TransferParams } from "../interface"
import { SOLANA_RPC, SOLANA_WS } from "../constants"

export const sendWithSolNetwork = async ({
  senderTokenAccount,
  token,
  receiverTokenAccount,
  agentWalletAddress,
  amount,
  decimals,
}: TransferParams) => {
  const transaction = new Transaction()
    .add(setComputePriceLimit)
    .add(setComputeUnitLimit)
    .add(
      createTransferCheckedInstruction(
        senderTokenAccount,
        token,
        receiverTokenAccount,
        agentWalletAddress,
        amount,
        decimals,
      ),
    )
  const connection = new Connection(SOLANA_RPC, {
    commitment: "confirmed",
    wsEndpoint: SOLANA_WS,
  })
  const { blockhash } = await connection.getLatestBlockhash()

  transaction.recentBlockhash = blockhash
  transaction.feePayer = agentWalletAddress
  return transaction
}
