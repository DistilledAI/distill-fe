import { Connection, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";

export async function createVersionCompiledTransaction(
  connection: Connection,
  instructions: TransactionInstruction[],
  lookupTableAddress: PublicKey,
  payer: PublicKey
) {
  const lookupTableAccount = (
    await connection.getAddressLookupTable(lookupTableAddress)
  ).value;

  if (!lookupTableAccount) {
    throw new Error("Lookup table account not found");
  }

  const message = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: (await connection.getRecentBlockhash()).blockhash,
    instructions: [...instructions],
  }).compileToV0Message([lookupTableAccount])

  const transactionV0 = new VersionedTransaction(message);

  return transactionV0;
}
