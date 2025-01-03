import { PublicKey, VersionedTransaction } from "@solana/web3.js"
import axios from "axios"

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

  const quoteRes = await axios.request({
    method: "get",
    url: `https://quote-api.jup.ag/v6/quote?inputMint=${assetAddressIn}&outputMint=${assetAddressOut}&amount=${amount}&slippageBps=200`,
  })
  const quoteResponse = quoteRes.data
  const resSwap = await axios.request({
    url: "https://quote-api.jup.ag/v6/swap",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: JSON.stringify({
      quoteResponse,
      userPublicKey: agentAddress,
      wrapAndUnwrapSol: true,
      // prioritizationFeeLamports: 100000,
      computeUnitPriceMicroLamports: 100000,
      dynamicComputeUnitLimit: true,
      // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
      // feeAccount: "fee_account_public_key"
    }),
  })

  const transaction: any = VersionedTransaction.deserialize(
    Buffer.from(resSwap.data.swapTransaction, "base64"),
  )

  transaction.feePayer = agentAddress

  return transaction
}
