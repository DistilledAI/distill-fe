import { postDataToIPFS } from "@utils/ipfs"
import { useState } from "react"
import { Web3Dao } from "../web3Dao"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

export const enum ProposalType {
  YesNo = "yes_no",
  Options = "options",
}

export interface IDataProposal {
  title: string
  description: string
  creator: string
  agentAddress: string
  vote: {
    type: ProposalType
    data: string[] | null
  }
}

const useCreateProposal = () => {
  const navigate = useNavigate()
  const wallet = useWallet()
  const { agentAddress } = useParams()
  const [loading, setLoading] = useState(false)

  const stakeCurrencyMint = "3Ff7yUkQsbMzViXu7aAxAYsgpy31wY8R8TteE39FDuw4"
  const unbondingPeriod = 300

  const onSubmit = async (data: IDataProposal) => {
    try {
      setLoading(true)
      const numOptions =
        data.vote.type === ProposalType.YesNo ? 2 : data.vote.data?.length

      const res = await postDataToIPFS(data)
      if (res.IpfsHash) {
        const uri = `https://ipfs.io/ipfs/${res.IpfsHash}`
        const web3Dao = new Web3Dao()

        const resWeb3 = await web3Dao.createProposal({
          unbondingPeriod,
          wallet,
          numOptions: numOptions || 1,
          uri,
          stakeCurrencyMint,
        })

        if (resWeb3 && resWeb3.result && resWeb3.proposal) {
          toast.success("Create Successfully!")
          navigate(
            `${PATH_NAMES.DAO}/${agentAddress}/proposals/${resWeb3.proposal.publicKey}`,
          )
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmit, loading }
}

export default useCreateProposal
