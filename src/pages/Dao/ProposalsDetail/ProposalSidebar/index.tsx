import { IProposal } from "@pages/Dao/Proposals/useProposals"
import ProposalInfo from "./ProposalInfo"
import PropsalStatusContent from "./PropsalStatusContent"
import VotingWidget from "./VotingWidget"
import { IDataProposal } from "@pages/Dao/CreateProposal/useCreateProposal"

interface Props {
  proposalDetail: IProposal | null
  proposalIpfs: IDataProposal | null
  getProposalsDetail: () => void
}

const ProposalSidebar = ({
  proposalDetail,
  proposalIpfs,
  getProposalsDetail,
}: Props) => (
  <div className="col-span-1">
    <div className="fixed w-full max-w-[350px]">
      <h2 className="text-24 font-semibold">Proposal</h2>
      <PropsalStatusContent proposalDetail={proposalDetail} />
      <ProposalInfo proposalDetail={proposalDetail} />
      <VotingWidget
        getProposalsDetail={getProposalsDetail}
        proposalIpfs={proposalIpfs}
        proposalDetail={proposalDetail}
      />
    </div>
  </div>
)

export default ProposalSidebar
