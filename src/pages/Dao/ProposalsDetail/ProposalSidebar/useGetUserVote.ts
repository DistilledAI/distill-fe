import { Web3Dao } from "@pages/Dao/web3Dao"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

const useGetUserVote = (proposalPublicKey: string | undefined) => {
  const wallet = useWallet()
  const [option, setOption] = useState<number | null>(null)

  const getUserVote = async () => {
    if (!wallet.publicKey || !proposalPublicKey) return
    const web3Dao = new Web3Dao()
    const { option } = await web3Dao.getUserVote({ wallet, proposalPublicKey })
    setOption(option)
  }

  useEffect(() => {
    getUserVote()
  }, [proposalPublicKey, wallet.publicKey])

  return { option, getUserVote }
}

export default useGetUserVote
