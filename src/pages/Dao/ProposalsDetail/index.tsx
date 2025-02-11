import BackButton from "@pages/AuthorProfile/BackButton"
import ProposalSidebar from "./ProposalSidebar"
import ProposalContent from "./ProposalContent"
import useProposalDetail from "./useProposalDetail"

const ProposalsDetail = () => {
  const { proposalDetail } = useProposalDetail()

  return (
    <div className="mx-auto max-w-[1024px] p-6 pt-3">
      <BackButton className="fixed left-0 top-0 h-[50px] max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <div className="grid grid-cols-[350px_1fr] gap-6">
        <ProposalSidebar proposalDetail={proposalDetail} />
        <ProposalContent proposalContent={proposalDetail} />
      </div>
    </div>
  )
}

export default ProposalsDetail
