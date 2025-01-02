import { PublicKey, VersionedTransaction } from "@solana/web3.js"
import { createJupiterApiClient } from "@jup-ag/api"

const jupiterQuoteApi = createJupiterApiClient()

export const swapWithJup = async ({
  walletAddress,
  amount,
  assetAddressIn,
  assetAddressOut,
}: {
  walletAddress: string
  amount: number
  assetAddressIn: string
  assetAddressOut: string
}) => {
  const agentAddress = new PublicKey(walletAddress)

  const routes = await jupiterQuoteApi.quoteGet({
    outputMint: assetAddressOut,
    inputMint: assetAddressIn,
    amount,
    autoSlippage: true,
    slippageBps: 200,
    autoSlippageCollisionUsdValue: 1_000,
    maxAutoSlippageBps: 1000,
    minimizeSlippage: true,
    onlyDirectRoutes: false,
    asLegacyTransaction: false,
  })

  const swapTx = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: routes,
      userPublicKey: walletAddress,
      wrapAndUnwrapSol: true,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: "auto",
    },
  })

  const transaction: any = VersionedTransaction.deserialize(
    Buffer.from(swapTx.swapTransaction, "base64"),
  )

  transaction.feePayer = agentAddress

  return transaction
}
