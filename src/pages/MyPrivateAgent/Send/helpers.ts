import { createTransferCheckedInstruction } from "@solana/spl-token"
import { Connection, Transaction } from "@solana/web3.js"
import { SOLANA_RPC, SOLANA_WS } from "../constants"
import { setComputePriceLimit, setComputeUnitLimit } from "../helpers"
import { TransferParams } from "../interface"

export const sendWithSolNetwork = async ({
  senderTokenAccount,
  token,
  receiverTokenAccount,
  fromWalletAddress,
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
        fromWalletAddress,
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
  transaction.feePayer = fromWalletAddress
  return transaction
}
