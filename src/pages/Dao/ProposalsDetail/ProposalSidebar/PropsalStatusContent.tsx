import { ChartBarIcon } from "@components/Icons/Chart"
import {
  IDataProposal,
  ProposalType,
} from "@pages/Dao/CreateProposal/useCreateProposal"
import {
  getPercentVotes,
  getProposalStatus,
  getRatioOfVotes,
  getTurnout,
  ProposalStatus,
} from "@pages/Dao/Proposals/helper"
import { IProposal } from "@pages/Dao/Proposals/useProposals"

interface Props {
  proposalDetail: IProposal | null
  proposalIpfs: IDataProposal | null
}

interface ProposalStatusContent {
  turnout?: number
  ratio?: number
  proposal?: IProposal
  voteType?: ProposalType
}

const proposalStatusTemplates = {
  [ProposalStatus.OPEN]: {
    content: ({ proposal, voteType }: ProposalStatusContent) => {
      if (proposal) {
        const { turnout, totalYesVotes, quorum, threshold } = getRatioOfVotes(
          proposal,
          voteType,
        )
        const turnoutPass = turnout >= quorum

        if (
          (totalYesVotes >= threshold && turnoutPass) ||
          (voteType === ProposalType.Options && turnoutPass)
        ) {
          return "If the current vote stands, this proposal will pass."
        }
      }
      return "If the current vote stands, this proposal will fail due to a lack of voter participation."
    },
  },
  [ProposalStatus.PASSED]: {
    content: ({ turnout, ratio }: ProposalStatusContent) =>
      `This proposal is closed for voting with a turnout of ${turnout}% and ${ratio}% of voters in favor. It was passed.`,
  },
  [ProposalStatus.REJECTED]: {
    content: ({ turnout, ratio }: ProposalStatusContent) =>
      `This proposal is closed for voting with a turnout of ${turnout}% and ${ratio}% of voters in favor. It was rejected.`,
  },
}

const PropsalStatusContent = ({ proposalDetail, proposalIpfs }: Props) => {
  const proposalStatus =
    proposalDetail && getProposalStatus(proposalDetail, Date.now() / 1000)
  const percents = getPercentVotes(proposalDetail?.voteCount)

  const totalVoteCount = proposalDetail?.voteCount
    ? proposalDetail?.voteCount.reduce((total, current) => total + current, 0)
    : 0
  const totalStaked = proposalDetail?.totalStaked || 0
  const voteType = proposalIpfs?.vote?.type

  return (
    <>
      <div className="mt-2 flex items-center gap-2">
        <ChartBarIcon />
        <span className="text-16 text-mercury-950">Status</span>
      </div>
      <p className="mt-2 text-16 text-mercury-950">
        {proposalStatus
          ? proposalStatusTemplates[
              proposalStatus as keyof typeof proposalStatusTemplates
            ].content({
              turnout: getTurnout(totalVoteCount, totalStaked),
              ratio: Math.max(...percents),
              proposal: proposalDetail,
              voteType,
            })
          : "--"}
      </p>
      <div className="my-6 h-[1px] w-full bg-mercury-100" />
    </>
  )
}
export default PropsalStatusContent
