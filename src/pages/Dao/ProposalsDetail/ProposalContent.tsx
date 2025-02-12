import Markdown from "react-markdown"
import VotingStats from "./VotingStats"
import { IProposal } from "../Proposals/useProposals"
import { centerTextEllipsis } from "@utils/index"
import moment from "moment"
import { IDataProposal } from "../CreateProposal/useCreateProposal"

interface Props {
  proposalContent: IProposal | null
  proposalIpfs: IDataProposal | null
}

const ProposalContent = ({ proposalContent, proposalIpfs }: Props) => {
  return (
    <div className="space-y-6 max-md:order-1">
      <h2 className="text-28 font-semibold">{proposalIpfs?.title}</h2>

      <div>
        <div className="mb-1 flex items-center gap-1">
          <span className="text-14 text-mercury-700">
            {centerTextEllipsis(proposalIpfs?.creator || "")}
          </span>
          {proposalContent?.createdTime && (
            <span className="text-14 text-mercury-700">
              – {moment(proposalContent?.createdTime * 1000).format("ll")}
            </span>
          )}
        </div>
        <Markdown className="text-16 text-mercury-950">
          {proposalIpfs?.description}
        </Markdown>
      </div>

      <VotingStats
        proposalDetail={proposalContent}
        proposalIpfs={proposalIpfs}
      />
    </div>
  )
}

export default ProposalContent
