import { Web3Dao } from "@pages/Dao/web3Dao"
import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { toast } from "react-toastify"

const stakeCurrencyMint = "3Ff7yUkQsbMzViXu7aAxAYsgpy31wY8R8TteE39FDuw4"
const unbondingPeriod = 300

const useSubmitVote = () => {
  const [loading, setLoading] = useState(false)
  const wallet = useWallet()

  const handleVote = async (
    proposalPublicKey: string,
    option: number,
    callback?: () => void,
  ) => {
    try {
      if (!wallet.publicKey) return
      setLoading(true)
      const web3Dao = new Web3Dao()
      const res = await web3Dao.voteProposal({
        wallet,
        unbondingPeriod,
        stakeCurrencyMint,
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
