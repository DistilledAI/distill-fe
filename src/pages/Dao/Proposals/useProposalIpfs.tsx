import { useEffect, useState } from "react"
import { IDataProposal } from "../CreateProposal/useCreateProposal"

const useProposalIpfs = ({ uri }: { uri: string | undefined }) => {
  const [proposalIpfs, setProposalIpfs] = useState<IDataProposal | null>(null)

  useEffect(() => {
    if (uri) {
      ;(async () => {
        try {
          const res = await fetch(uri)
          const data = await res.json()
          setProposalIpfs(data)
        } catch (e) {
          console.log({ e })
        }
      })()
    }
  }, [uri])

  return {
    proposalIpfs,
  }
}

export default useProposalIpfs
