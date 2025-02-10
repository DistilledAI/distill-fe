import { IconSearch } from "@components/Icons/DefiLens"
import { Input } from "@nextui-org/react"
import ProposalItem from "./ProposalItem"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import ProposalsHistory from "./ProposalsHistory"

const Proposals = () => {
  const navigate = useNavigate()
  const { agentAddress } = useParams()

  return (
    <>
      <div className="mb-4 flex items-center justify-between border-b border-b-mercury-100 pb-6">
        <span className="text-18 font-semibold">Create a proposal</span>
        <button
          onClick={() =>
            navigate(`${PATH_NAMES.DAO}/${agentAddress}/proposals/create`, {
              state: { isHistory: "true" },
            })
          }
          className="btn-primary flex items-center justify-center !bg-mercury-950 px-3 !text-white"
        >
          + New proposal
        </button>
      </div>
      <div className="space-y-6">
        <span className="text-18 font-semibold">Proposals</span>
        <Input
          startContent={<IconSearch color="#7B7B7B" />}
          classNames={{
            base: "!mt-4",
            inputWrapper:
              "!bg-transparent border border-mercury-100 rounded-full group-data-[focus=true]:!border-mercury-300",
            input: "placeholder:text-mercury-700 text-[16px]",
          }}
          placeholder="Search proposals..."
        />
        <ProposalItem />

        <ProposalsHistory />
      </div>
    </>
  )
}

export default Proposals
