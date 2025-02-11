import { IProposal } from "@pages/Dao/Proposals/useProposals"
import ProposalInfo from "./ProposalInfo"
import PropsalStatusContent from "./PropsalStatusContent"
import VotingWidget from "./VotingWidget"

interface Props {
  proposalDetail: IProposal | null
}

const ProposalSidebar = ({ proposalDetail }: Props) => (
  <div className="col-span-1">
    <div className="fixed w-full max-w-[350px]">
      <h2 className="text-24 font-semibold">Proposal</h2>
      <PropsalStatusContent proposalDetail={proposalDetail} />
      <ProposalInfo proposalDetail={proposalDetail} />
      <VotingWidget proposalDetail={proposalDetail} />
    </div>
  </div>
)

export default ProposalSidebar
