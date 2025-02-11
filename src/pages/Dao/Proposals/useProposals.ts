import { useEffect, useState } from "react"
import { Web3Dao } from "../web3Dao"
import { useWallet } from "@solana/wallet-adapter-react"

export const stakeCurrencyMint = "3Ff7yUkQsbMzViXu7aAxAYsgpy31wY8R8TteE39FDuw4"
const unbondingPeriod = 300

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
}

const useProposals = () => {
  const wallet = useWallet()
  const [proposals, setProposals] = useState<Array<IProposal>>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const web3Dao = new Web3Dao()
        const res = await web3Dao.getProposals({
          wallet,
          unbondingPeriod,
          stakeCurrencyMint,
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
  }, [wallet])

  return {
    proposals,
    setProposals,
    isLoading,
  }
}

export default useProposals
