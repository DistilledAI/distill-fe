import { ProposalType } from "../CreateProposal/useCreateProposal"
import { IProposal } from "./useProposals"

export enum ProposalStatus {
  OPEN = "Open",
  PASSED = "Passed",
  REJECTED = "Rejected",
  CLOSED = "Closed",
}

export function getProposalStatus(
  proposal: IProposal,
  currentTime: number,
  voteType = ProposalType.YesNo,
) {
  if (voteType === ProposalType.YesNo) {
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

  if (currentTime <= proposal.expirationTime) {
    return ProposalStatus.OPEN
  } else {
    return ProposalStatus.CLOSED
  }
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

export const getPercentVotes = (
  voteCounts: number[] = [],
  voteType = ProposalType.YesNo,
) => {
  if (voteCounts.length === 0) return []

  const totalVotes = voteCounts.reduce((acc, count) => acc + count, 0)

  if (totalVotes === 0) {
    if (voteType === ProposalType.Options) {
      return voteCounts
    }
    const equalPercentage = Number((100 / voteCounts.length).toFixed(2))
    const percentages = new Array(voteCounts.length).fill(equalPercentage)
    const sumSoFar = equalPercentage * voteCounts.length
    const diff = Number((100 - sumSoFar).toFixed(2))

    percentages[percentages.length - 1] = Number(
      (percentages[percentages.length - 1] + diff).toFixed(2),
    )
    return percentages
  }

  const percentages = voteCounts.map((count) =>
    Number(((count / totalVotes) * 100).toFixed(2)),
  )

  const sumPercentages = percentages.reduce((acc, p) => acc + p, 0)
  const diff = Number((100 - sumPercentages).toFixed(2))

  if (Math.abs(diff) > 0) {
    const maxIndex = voteCounts.indexOf(Math.max(...voteCounts))
    percentages[maxIndex] = Number((percentages[maxIndex] + diff).toFixed(2))
  }

  return percentages
}

export const getTurnout = (totalVoteCount: number, totalStaked: number) => {
  if (!totalVoteCount && !totalStaked) return 0
  return Number(((totalVoteCount / totalStaked) * 100).toFixed(3))
}
