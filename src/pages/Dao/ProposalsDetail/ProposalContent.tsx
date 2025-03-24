import Markdown from "react-markdown"
import VotingStats from "./VotingStats"
import { IProposal } from "../Proposals/useProposals"
import { centerTextEllipsis } from "@utils/index"
import moment from "moment"
import { IDataProposal } from "../CreateProposal/useCreateProposal"
import { Skeleton } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import "./index.css"

interface Props {
  proposalContent: IProposal | null
  proposalIpfs: IDataProposal | null
}

const ProposalContent = ({ proposalContent, proposalIpfs }: Props) => {
  return (
    <div className="space-y-6 max-md:order-1">
      <Skeleton
        isLoaded={!!proposalContent}
        className={twMerge("h-10 rounded-2xl", !!proposalContent && "h-auto")}
      >
        <h2 className="text-28 font-semibold">{proposalIpfs?.title}</h2>
      </Skeleton>

      <Skeleton
        isLoaded={!!proposalContent}
        className={twMerge(
          "styleReset h-[50dvh] rounded-2xl",
          !!proposalContent && "h-auto",
        )}
      >
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
      </Skeleton>

      <Skeleton
        isLoaded={!!proposalContent}
        className={twMerge(
          "h-[25dvh] rounded-2xl",
          !!proposalContent && "h-auto",
        )}
      >
        <VotingStats
          proposalDetail={proposalContent}
          proposalIpfs={proposalIpfs}
        />
      </Skeleton>
    </div>
  )
}

export default ProposalContent
