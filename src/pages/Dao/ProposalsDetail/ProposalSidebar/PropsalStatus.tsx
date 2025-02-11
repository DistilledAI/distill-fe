import { ChartBarIcon } from "@components/Icons/Chart"

const ProposalStatus = ({ description }: { description: string }) => (
  <>
    <div className="mt-2 flex items-center gap-2">
      <ChartBarIcon />
      <span className="text-16 text-mercury-950">Status</span>
    </div>
    <p className="mt-2 text-16 text-mercury-950">{description}</p>
    <div className="my-6 h-[1px] w-full bg-mercury-100" />
  </>
)

export default ProposalStatus
