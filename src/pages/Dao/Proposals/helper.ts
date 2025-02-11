import { IProposal } from "./useProposals"

export enum ProposalStatus {
  OPEN = "Open",
  PASSED = "Passed",
  REJECTED = "Rejected",
}

export function getProposalStatus(proposal: IProposal, currentTime: number) {
  if (currentTime <= proposal.expirationTime) {
    return ProposalStatus.OPEN
  }

  const [yesVotes, noVotes] = proposal.voteCount
  const totalVotes = yesVotes + noVotes

  if (totalVotes === 0 || totalVotes < proposal.quorum) {
    return ProposalStatus.REJECTED
  }

  if (yesVotes / totalVotes >= proposal.threshold) {
    return ProposalStatus.PASSED
  }

  return ProposalStatus.REJECTED
}

export const getColorProposalStatus = (status: string) => {
  switch (status) {
    case ProposalStatus.PASSED:
      return {
        color: "text-green-500",
      }
    case ProposalStatus.REJECTED:
      return {
        color: "text-[#FF3B30]",
      }
    default:
      return {
        color: "text-mercury-950",
      }
  }
}
