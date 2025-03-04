import InputSearchPrivateAgent from "./InputSearchPrivateAgent"
import { useDisclosure } from "@nextui-org/react"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"

interface Props {
  onSearch: (value: string) => void
}

const SearchPrivateAgentWrapper = ({ onSearch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {!isOpen && (
        <div className="flex items-center justify-between">
          <span className="text-14 font-medium text-mercury-800">
            All Messages
          </span>
          <button type="button" onClick={onOpen}>
            <FilledSearchIcon size={20} color="#676767" />
          </button>
        </div>
      )}
      {isOpen && (
        <InputSearchPrivateAgent onSearch={onSearch} onClose={onClose} />
      )}
    </>
  )
}

export default SearchPrivateAgentWrapper
