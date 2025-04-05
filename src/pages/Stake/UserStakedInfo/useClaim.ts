import { PublicKey } from "@solana/web3.js"
import { useState } from "react"
import { getProofForTokenClaim } from "./helpers"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "react-toastify"
import { Web3Airdrop } from "./web3Airdrop"
import { BN } from "@coral-xyz/anchor"
import { useSearchParams } from "react-router-dom"
import { StakeTokenAddress } from ".."
import { getDurationByAddress } from "../helpers"

const web3Airdrop = new Web3Airdrop()

const useClaim = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const [isLoading, setIsLoading] = useState(false)
  const wallet = useWallet()

  const handleClaim = async ({
    rewardToken,
    randomKp,
    callbackDone,
  }: {
    rewardToken: string
    randomKp: string
    callbackDone?: () => void
  }) => {
    try {
      const stakingVaultAddress = await web3Airdrop.getStakingVaultAddress({
        wallet,
        stakeCurrencyMint: tokenAddress as StakeTokenAddress,
        unbondingPeriod: getDurationByAddress(
          tokenAddress as StakeTokenAddress,
        ),
      })
      if (!wallet.publicKey || !stakingVaultAddress) return
      setIsLoading(true)

      const proofRes = await getProofForTokenClaim({
        stakerAddr: wallet.publicKey?.toBase58(),
        randomKp: randomKp,
        tokenAddr: rewardToken,
      })
      if (!proofRes) throw new Error("Cannot fetch proof for token claim!")

      const res = await web3Airdrop.claim({
        rewardToken: new PublicKey(rewardToken),
        stakingVault: new PublicKey(stakingVaultAddress),
        randomKp: new PublicKey(randomKp),
        index: new BN(proofRes.index),
        amount: new BN(proofRes.amount),
        proof: proofRes.proof,
        wallet,
      })

      if (res) {
        toast.success("Claim successfully!")
        if (callbackDone) callbackDone()
      }
    } catch (error) {
      console.log("claim error", error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleClaim }
}

export default useClaim
