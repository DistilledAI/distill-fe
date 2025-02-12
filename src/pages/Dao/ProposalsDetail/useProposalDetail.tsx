import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Web3Dao } from "../web3Dao"
import { IProposal } from "../Proposals/useProposals"

const useProposalDetail = () => {
  const wallet = useWallet()
  const { proposalId } = useParams()
  const [proposalDetail, setProposalDetail] = useState<IProposal | null>(null)

  const getProposalsDetail = async () => {
    if (proposalId) {
      const web3Dao = new Web3Dao()
      const res = await web3Dao.getProposalsDetail({
        wallet,
        proposalPublicKey: proposalId,
      })
      if (res) {
        setProposalDetail(res)
      }
    }
  }

  useEffect(() => {
    getProposalsDetail()
  }, [wallet, proposalId])

  return {
    proposalDetail,
    getProposalsDetail,
  }
}

export default useProposalDetail
