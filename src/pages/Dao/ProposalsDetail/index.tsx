import BackButton from "@pages/AuthorProfile/BackButton"
import ProposalSidebar from "./ProposalSidebar"
import ProposalContent from "./ProposalContent"
import useProposalDetail from "./useProposalDetail"
import useProposalIpfs from "../Proposals/useProposalIpfs"
import { Skeleton } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import { useLocation, useNavigate } from "react-router-dom"

const ProposalsDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { proposalDetail, getProposalsDetail } = useProposalDetail()
  const { proposalIpfs } = useProposalIpfs({
    uri: proposalDetail?.uri,
  })

  const handleBack = () => {
    const daoPath = location.pathname.split("/proposals/")[0]
    navigate(`${daoPath}/proposals`)
  }

  return (
    <div className="mx-auto min-h-dvh max-w-[1024px] p-4 pb-20 pt-14 md:p-6 md:pt-0">
      <BackButton
        className="fixed left-0 top-0 h-[50px] pl-4 max-md:h-[40px] max-md:w-full max-md:bg-white"
        onClick={handleBack}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[350px_1fr] md:gap-10">
        <Skeleton
          isLoaded={!!proposalDetail}
          className={twMerge(
            "h-[58.5dvh] rounded-2xl",
            !!proposalDetail && "h-fit",
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
