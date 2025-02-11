import BackButton from "@pages/AuthorProfile/BackButton"
import ProposalSidebar from "./ProposalSidebar"
import ProposalContent from "./ProposalContent"
import useProposalDetail from "./useProposalDetail"
import useProposalIpfs from "../Proposals/useProposalIpfs"

const ProposalsDetail = () => {
  const { proposalDetail } = useProposalDetail()
  const { proposalIpfs } = useProposalIpfs({
    uri: proposalDetail?.uri,
  })

  return (
    <div className="mx-auto max-w-[1024px] p-6 pt-3">
      <BackButton className="fixed left-0 top-0 h-[50px] max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <div className="grid grid-cols-[350px_1fr] gap-6">
        <ProposalSidebar
          proposalIpfs={proposalIpfs}
          proposalDetail={proposalDetail}
        />
        <ProposalContent
          proposalIpfs={proposalIpfs}
          proposalContent={proposalDetail}
        />
      </div>
    </div>
  )
}

export default ProposalsDetail
