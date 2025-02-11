import { useEffect, useState } from "react"
import { Web3Dao } from "../web3Dao"
import { useWallet } from "@solana/wallet-adapter-react"
import { useParams } from "react-router-dom"
import { ALL_CONFIGS } from "@pages/Stake/config"

export interface IProposal {
  proposal: string
  creator: string
  vault: string
  createdTime: number
  expirationTime: number
  uri: string
  options: number
  voteCount: number[]
  quorum: number
  threshold: number
  totalStaked: number
}

const useProposals = () => {
  const wallet = useWallet()
  const { agentAddress } = useParams()
  const [proposals, setProposals] = useState<Array<IProposal>>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        if (!agentAddress) return
        setIsLoading(true)
        const web3Dao = new Web3Dao()
        const res = await web3Dao.getProposals({
          wallet,
          unbondingPeriod: ALL_CONFIGS.VOTING_PROPOSAL_PERIOD,
          stakeCurrencyMint: agentAddress,
        })
        if (res) {
          setProposals(
            res.sort(
              (a, b) =>
                new Date(b.createdTime).getTime() -
                new Date(a.createdTime).getTime(),
            ),
          )
        }
      } catch (e) {
        console.log({ e })
      } finally {
        setIsLoading(false)
      }
    })()
  }, [wallet, agentAddress])

  return {
    proposals,
    setProposals,
    isLoading,
  }
}

export default useProposals
