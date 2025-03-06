// import InputSearchPrivateAgent from "./InputSearchPrivateAgent"
// import { useDisclosure } from "@nextui-org/react"
// import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { PlusIcon } from "@components/Icons/Plus"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

interface Props {
  onSearch?: (value: string) => void
  privateAgentsLength: number
}

const SearchPrivateAgentWrapper = ({ privateAgentsLength = 0 }: Props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  return (
    <>
      {/* {!isOpen && (
        <div className="flex items-center justify-between">
          <span className="text-14 font-medium text-mercury-800">
            {privateAgentsLength ? "All Messages" : "Agent Suggestions"}
          </span>
          <button type="button" onClick={onOpen}>
            <FilledSearchIcon size={20} color="#676767" />
          </button>
        </div>
      )}
      {isOpen && (
        <InputSearchPrivateAgent onSearch={onSearch} onClose={onClose} />
      )} */}

      <div className="flex items-center justify-between">
        <span className="text-14 font-medium text-mercury-800">
          {privateAgentsLength ? "All Messages" : "Agent Suggestions"}
        </span>
        <button
          type="button"
          onClick={() => navigate(`${PATH_NAMES.MARKETPLACE}?tab=ai-agents`)}
        >
          <PlusIcon size={20} color="#676767" />
        </button>
      </div>
    </>
  )
}

export default SearchPrivateAgentWrapper
