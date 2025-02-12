import BackButton from "@pages/AuthorProfile/BackButton"
import ProposalSidebar from "./ProposalSidebar"
import ProposalContent from "./ProposalContent"
import useProposalDetail from "./useProposalDetail"
import useProposalIpfs from "../Proposals/useProposalIpfs"
import { Skeleton } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

const ProposalsDetail = () => {
  const { proposalDetail, getProposalsDetail } = useProposalDetail()
  const { proposalIpfs } = useProposalIpfs({
    uri: proposalDetail?.uri,
  })

  return (
    <div className="mx-auto min-h-dvh max-w-[1024px] p-4 pb-20 pt-14 md:p-6 md:pt-0">
      <BackButton className="fixed left-0 top-0 h-[50px] pl-4 max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[350px_1fr] md:gap-10">
        <Skeleton
          isLoaded={!!proposalDetail}
          className={twMerge(
            "h-[58.5dvh] rounded-2xl",
            !!proposalDetail && "h-auto",
          )}
        >
          <ProposalSidebar
            proposalIpfs={proposalIpfs}
            proposalDetail={proposalDetail}
            getProposalsDetail={getProposalsDetail}
          />
        </Skeleton>
        <ProposalContent
          proposalIpfs={proposalIpfs}
          proposalContent={proposalDetail}
        />
      </div>
    </div>
  )
}

export default ProposalsDetail
