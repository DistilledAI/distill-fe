import { postDataToIPFS } from "@utils/ipfs"
import { useState } from "react"

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
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: IDataProposal) => {
    try {
      setLoading(true)
      console.log("data", data)
      const res = await postDataToIPFS(data)
      console.log("RESSS", res)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmit, loading }
}

export default useCreateProposal
