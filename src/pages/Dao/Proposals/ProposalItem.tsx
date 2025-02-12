import { PATH_NAMES } from "@constants/index"
import { useNavigate, useParams } from "react-router-dom"
import { IProposal } from "./useProposals"

import moment from "moment"
import { getColorProposalStatus, getProposalStatus } from "./helper"
import { twMerge } from "tailwind-merge"
import useProposalIpfs from "./useProposalIpfs"

interface Props {
  proposal: IProposal
  order: number
}

const ProposalItem = ({ proposal, order }: Props) => {
  const navigate = useNavigate()
  const { agentAddress } = useParams()
  const { proposalIpfs } = useProposalIpfs({
    uri: proposal.uri,
  })
  const voteType = proposalIpfs?.vote?.type
  const proposalStatus = getProposalStatus(
    proposal,
    Date.now() / 1000,
    voteType,
  )

  return (
    <div
      key={order}
      onClick={() =>
        navigate(
          `${PATH_NAMES.DAO}/${agentAddress}/proposals/${proposal.proposal}`,
          {
            state: { isHistory: "true" },
          },
        )
      }
      className="flex cursor-pointer items-center gap-4 rounded-full bg-mercury-70 px-4 py-3 hover:bg-mercury-100"
    >
      <span className="min-w-4 text-14 text-mercury-700">{order}</span>
      <div className="min-w-14">
        <span
          className={twMerge(
            "text-[15px] text-mercury-950",
            getColorProposalStatus(proposalStatus).color,
          )}
        >
          {proposalStatus}
        </span>
      </div>
      <p className="line-clamp-1 flex-1 text-16 text-mercury-950">
        {proposalIpfs?.title}
      </p>
      <span className="min-w-24 text-14 text-mercury-700">
        {moment(proposal.createdTime * 1000).fromNow()}
      </span>
    </div>
  )
}

export default ProposalItem
