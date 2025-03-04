import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import InputSearchClan from "./InputSearchClan"
import { useDisclosure } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

interface Props {
  onSearch: (value: string) => void
}

const SearchClanWrapper = ({ onSearch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      {!isOpen && (
        <div className="flex items-center justify-between">
          <span className="text-14 font-medium text-mercury-800">
            All Clans
          </span>
          <button type="button" onClick={onOpen} className={twMerge()}>
            <FilledSearchIcon size={20} color="#676767" />
          </button>
        </div>
      )}
      {isOpen && <InputSearchClan onSearch={onSearch} onClose={onClose} />}
    </div>
  )
}

export default SearchClanWrapper
