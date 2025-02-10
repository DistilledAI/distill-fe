import { PATH_NAMES } from "@constants/index"
import { useNavigate, useParams } from "react-router-dom"

const ProposalItem = () => {
  const navigate = useNavigate()
  const { agentAddress } = useParams()

  return (
    <div
      onClick={() => navigate(`${PATH_NAMES.DAO}/${agentAddress}/proposals/A1`)}
      className="flex cursor-pointer items-center gap-4 rounded-full bg-mercury-70 px-4 py-3 hover:bg-mercury-100"
    >
      <span className="text-14 text-mercury-700">A-1</span>
      <div>
        <span className="text-[15px] text-mercury-950">Open</span>
      </div>
      <p className="line-clamp-1 flex-1 text-16 text-mercury-950">
        Improvements on oraix staking interface to show revenue stats
      </p>
      <span className="text-14 text-mercury-700">1 days</span>
    </div>
  )
}

export default ProposalItem
