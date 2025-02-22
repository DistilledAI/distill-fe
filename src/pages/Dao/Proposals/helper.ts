import { ProposalType } from "../CreateProposal/useCreateProposal"
import { IProposal } from "./useProposals"

export enum ProposalStatus {
  OPEN = "Open",
  PASSED = "Passed",
  REJECTED = "Rejected",
  CLOSED = "Closed",
}

export const getRatioOfVotes = (
  proposal: IProposal,
  voteType: ProposalType = ProposalType.YesNo,
) => {
  const [yesVotes, noVotes] = proposal.voteCount
  let totalVotes = yesVotes + noVotes
  let turnout = getTurnout(totalVotes, proposal.totalStaked)

  const totalYesVotes = (yesVotes / totalVotes) * 100
  const quorum = proposal.quorum * 100
  const threshold = proposal.threshold * 100

  if (voteType === ProposalType.Options) {
    totalVotes = proposal.voteCount.reduce(
      (total, current) => total + current,
      0,
    )
    turnout = getTurnout(totalVotes, proposal.totalStaked)
  }

  return { turnout, totalYesVotes, quorum, threshold }
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

    const { turnout, totalYesVotes, quorum, threshold } =
      getRatioOfVotes(proposal)

    if (totalYesVotes === 0 || turnout < quorum || totalYesVotes < threshold) {
      return ProposalStatus.REJECTED
    }

    if (totalYesVotes >= threshold && turnout >= quorum) {
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
