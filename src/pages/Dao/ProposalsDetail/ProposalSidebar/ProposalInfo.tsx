import { IDataProposal } from "@pages/Dao/CreateProposal/useCreateProposal"
import {
  getColorProposalStatus,
  getProposalStatus,
} from "@pages/Dao/Proposals/helper"
import { IProposal } from "@pages/Dao/Proposals/useProposals"
import { centerTextEllipsis } from "@utils/index"
import moment from "moment"
import { twMerge } from "tailwind-merge"

const InfoRow = ({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) => (
  <div className="flex items-center justify-between">
    <span className="text-16 text-mercury-700">{label}</span>
    <span className={twMerge("text-[16px] text-mercury-950", valueClassName)}>
      {value}
    </span>
  </div>
)

interface Props {
  proposalDetail: IProposal | null
  proposalIpfs: IDataProposal | null
}

const ProposalInfo = ({ proposalDetail, proposalIpfs }: Props) => {
  const voteType = proposalIpfs?.vote?.type
  const proposalStatus =
    proposalDetail &&
    getProposalStatus(proposalDetail, Date.now() / 1000, voteType)

  return (
    <div className="space-y-1">
      <InfoRow
        label="Creator"
        value={centerTextEllipsis(proposalDetail?.creator || "")}
      />
      <InfoRow
        label="Status"
        value={proposalStatus ? proposalStatus : "--"}
        valueClassName={
          proposalStatus ? getColorProposalStatus(proposalStatus).color : ""
        }
      />
      <InfoRow
        label="Expiration Date (UTC)"
        value={
          proposalDetail?.expirationTime
            ? moment(proposalDetail?.expirationTime * 1000)
                .utc()
                .format("lll")
            : "--"
        }
      />
    </div>
  )
}

export default ProposalInfo
