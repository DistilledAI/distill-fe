import { ChartBarIcon } from "@components/Icons/Chart"
import {
  getPercentVotes,
  getProposalStatus,
  getTurnout,
  ProposalStatus,
} from "@pages/Dao/Proposals/helper"
import { IProposal } from "@pages/Dao/Proposals/useProposals"

interface Props {
  proposalDetail: IProposal | null
}

const proposalStatusTemplates = {
  [ProposalStatus.OPEN]: {
    content: () =>
      "If the current vote stands, this proposal will fail due to a lack of voter participation.",
  },
  [ProposalStatus.PASSED]: {
    content: (turnout: number, ratio: number) =>
      `This proposal is closed for voting with a turnout of ${turnout}% and ${ratio}% of voters in favor. It was passed and now needs to be executed.`,
  },
  [ProposalStatus.REJECTED]: {
    content: (turnout: number, ratio: number) =>
      `This proposal is closed for voting with a turnout of ${turnout}% and ${ratio}% of voters in favor. It was rejected and now needs to be closed.`,
  },
}

const PropsalStatusContent = ({ proposalDetail }: Props) => {
  const proposalStatus =
    proposalDetail && getProposalStatus(proposalDetail, Date.now() / 1000)
  const percents = getPercentVotes(proposalDetail?.voteCount)

  const totalVoteCount = proposalDetail?.voteCount
    ? proposalDetail?.voteCount.reduce((total, current) => total + current, 0)
    : 0
  const totalStaked = proposalDetail?.totalStaked || 0

  return (
    <>
      <div className="mt-2 flex items-center gap-2">
        <ChartBarIcon />
        <span className="text-16 text-mercury-950">Status</span>
      </div>
      <p className="mt-2 text-16 text-mercury-950">
        {proposalStatus
          ? proposalStatusTemplates[proposalStatus].content(
              getTurnout(totalVoteCount, totalStaked),
              Math.max(...percents),
            )
          : "--"}
      </p>
      <div className="my-6 h-[1px] w-full bg-mercury-100" />
    </>
  )
}
export default PropsalStatusContent
