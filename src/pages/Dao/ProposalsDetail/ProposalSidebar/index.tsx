import ProposalInfo from "./ProposalInfo"
import PropsalStatusContent from "./PropsalStatusContent"
import VotingWidget from "./VotingWidget"

const ProposalSidebar = ({
  statusDescription,
}: {
  statusDescription: string
}) => (
  <div className="col-span-1">
    <div className="fixed w-full max-w-[350px]">
      <h2 className="text-24 font-semibold">Proposal</h2>
      <PropsalStatusContent description={statusDescription} />
      <ProposalInfo />
      <VotingWidget />
    </div>
  </div>
)

export default ProposalSidebar
