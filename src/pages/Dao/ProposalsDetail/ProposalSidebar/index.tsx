import { IProposal } from "@pages/Dao/Proposals/useProposals"
import ProposalInfo from "./ProposalInfo"
import PropsalStatusContent from "./PropsalStatusContent"
import VotingWidget from "./VotingWidget"
import { IDataProposal } from "@pages/Dao/CreateProposal/useCreateProposal"
import VotePower from "./VotePower"

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
  <div className="col-span-1 max-md:order-2">
    <div className="w-full md:fixed md:max-w-[350px]">
      <h2 className="text-24 font-semibold">Proposal</h2>
      <PropsalStatusContent
        proposalDetail={proposalDetail}
        proposalIpfs={proposalIpfs}
      />
      <ProposalInfo
        proposalDetail={proposalDetail}
        proposalIpfs={proposalIpfs}
      />
      <VotingWidget
        getProposalsDetail={getProposalsDetail}
        proposalIpfs={proposalIpfs}
        proposalDetail={proposalDetail}
      />
      <VotePower />
    </div>
  </div>
)

export default ProposalSidebar
