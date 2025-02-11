import Markdown from "react-markdown"
import VotingStats from "./VotingStats"
import { IProposal } from "../Proposals/useProposals"
import useProposalIpfs from "../Proposals/useProposalIpfs"
import { centerTextEllipsis } from "@utils/index"
import moment from "moment"

interface Props {
  proposalContent: IProposal | null
}

const ProposalContent = ({ proposalContent }: Props) => {
  const { proposalIpfs } = useProposalIpfs({
    uri: proposalContent?.uri,
  })

  return (
    <div className="space-y-6">
      <h2 className="text-28 font-semibold">{proposalIpfs?.title}</h2>

      <div>
        <div className="flex items-center gap-1">
          <span className="text-14 text-mercury-700 underline">
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

      <VotingStats />
    </div>
  )
}

export default ProposalContent
