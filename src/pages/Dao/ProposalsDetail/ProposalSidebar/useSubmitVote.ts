import { Web3Dao } from "@pages/Dao/web3Dao"
import { getDurationByAddress } from "@pages/Stake/helpers"
import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const useSubmitVote = () => {
  const { agentAddress } = useParams()
  const [loading, setLoading] = useState(false)
  const wallet = useWallet()

  const handleVote = async (
    proposalPublicKey: string,
    option: number,
    callback?: () => void,
  ) => {
    try {
      if (!wallet.publicKey || !agentAddress) return
      setLoading(true)
      const web3Dao = new Web3Dao()
      const res = await web3Dao.voteProposal({
        wallet,
        unbondingPeriod: getDurationByAddress(agentAddress),
        stakeCurrencyMint: agentAddress,
        proposalPublicKey,
        option,
      })
      if (res) {
        toast.success("Voted successfully!")
        if (callback) callback()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { handleVote, loading }
}

export default useSubmitVote
