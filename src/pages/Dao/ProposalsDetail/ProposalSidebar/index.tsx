import ProposalInfo from "./ProposalInfo"
import ProposalStatus from "./PropsalStatus"
import VotingWidget from "./VotingWidget"

const ProposalSidebar = ({
  proposalId,
  statusDescription,
}: {
  proposalId?: string
  statusDescription: string
}) => (
  <div className="col-span-1">
    <div className="fixed w-full max-w-[350px]">
      <h2 className="text-24 font-semibold">Proposal {proposalId}</h2>
      <ProposalStatus description={statusDescription} />
      <ProposalInfo />
      <VotingWidget />
    </div>
  </div>
)

export default ProposalSidebar
