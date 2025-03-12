import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { Input } from "@nextui-org/react"
import { useCallback, useRef } from "react"
import { ContentDisplayMode, DISPLAY_MODES } from "../PrivateAI"
import useSearch from "./useSearch"
import SearchResult from "./Result"

const SearchContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const inputRef = useRef<any>(null)
  const { data, setQuery, query, debounceSearch } = useSearch(inputRef)

  const onBackToBoxMessage = () => {
    onChangeDisplayMode(DISPLAY_MODES.MESSAGES)
  }

  const handleOnChangeValue = useCallback((value: string) => {
    setQuery(value)
    debounceSearch(value)
  }, [])

  const onClearInputValue = () => {
    setQuery("")
    debounceSearch("")
  }

  return (
    <>
      <div className="flex-items-center mb-4 justify-between gap-2 px-2">
        <div className="cursor-pointer" onClick={() => onBackToBoxMessage()}>
          <ArrowLeftFilledIcon />
        </div>
        <Input
          placeholder="Search"
          labelPlacement="outside"
          startContent={<FilledSearchIcon />}
          endContent={
            query && (
              <div
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-mercury-300 p-[2px]"
                onClick={() => onClearInputValue()}
              >
                <CloseFilledIcon size={18} color="#676767" />
              </div>
            )
          }
          classNames={{
            inputWrapper:
              "!bg-mercury-200 rounded-full focus-visible:ring-opacity-0",
            innerWrapper:
              "!bg-mercury-200 rounded-full focus-visible:ring-opacity-0",
            input:
              "text-18 !text-mercury-950 caret-[#363636] focus-visible:ring-opacity-0 font-medium",
          }}
          onValueChange={handleOnChangeValue}
          value={query}
          ref={inputRef}
        />
      </div>

      <div className="max-h-[calc(100%-270px)] overflow-y-auto">
        <SearchResult data={data} selectedCallback={onBackToBoxMessage} />
      </div>
    </>
  )
}
export default SearchContainer
