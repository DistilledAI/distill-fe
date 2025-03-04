import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import useDebounce from "@hooks/useDebounce"
import { Input } from "@nextui-org/react"
import { useState } from "react"

interface Props {
  onSearch: (value: string) => void
  onClose: () => void
}

const InputSearchClan = ({ onSearch, onClose }: Props) => {
  const [searchValue, setSearchValue] = useState("")

  const debouncedSearch = useDebounce((value) => {
    onSearch(value)
  }, 300)

  const handleInputChange = (value: string) => {
    setSearchValue(value)
    debouncedSearch(value)
  }

  return (
    <Input
      startContent={<FilledSearchIcon size={20} color="#676767" />}
      endContent={
        <button
          type="button"
          onClick={() => {
            handleInputChange("")
            onClose()
          }}
        >
          <CloseFilledIcon size={20} color="#676767" />
        </button>
      }
      placeholder="Search Clans.."
      value={searchValue}
      onValueChange={handleInputChange}
      classNames={{
        inputWrapper:
          "!bg-transparent shadow-none  w-full px-0 min-h-[21px] h-[21px]",
        input: "text-[14px] text-mercury-950 placeholder:text-mercury-800",
      }}
    />
  )
}

export default InputSearchClan
