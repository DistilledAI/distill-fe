import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { useNavigate } from "react-router-dom"
import UserStakedInfo from "./UserStakedInfo"
import WithdrawAll from "./WithdrawAll"
import StakeTable from "./StakeTable"

const Stake = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-[1232px] px-4">
      <div
        onClick={() => navigate(-1)}
        className="fixed left-0 top-0 z-[21] inline-flex h-[68px] cursor-pointer items-center gap-2 px-4 max-md:h-[40px]"
      >
        <ArrowLeftFilledIcon color="#545454" />
        <p className="font-medium">Back</p>
      </div>
      <div>
        <p className="text-[36px] font-semibold">Agent’s Vault</p>
        <p className="text-14 text-mercury-700">
          Stake your holdings today to earn revenue shares and additional
          benefits.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-6">
        <div className="w-[calc(60%-12px)]">
          <UserStakedInfo />
          <WithdrawAll />
          <StakeTable />
        </div>
        <div className="h-5 w-[calc(40%-12px)] bg-green-500"></div>
      </div>
    </div>
  )
}

export default Stake
