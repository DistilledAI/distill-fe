import { Connection, TransactionExpiredTimeoutError } from "@solana/web3.js"

export const isTransactionExpiredTimeoutError = (error: any) => {
  return error instanceof TransactionExpiredTimeoutError
}

export const handleTransaction = async ({
  error,
  connection,
}: {
  error: TransactionExpiredTimeoutError
  connection: Connection
}) => {
  try {
    if (isTransactionExpiredTimeoutError(error) || error["signature"]) {
      const result = await connection.getSignatureStatus(error.signature, {
        searchTransactionHistory: true,
      })

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
