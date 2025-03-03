import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { Input } from "@nextui-org/react"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import useDebounce from "@hooks/useDebounce"

const InputSearchAgent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get("search") || ""
    setSearchValue(searchQuery)
  }, [location.search])

  const handleSearch = useCallback(
    (value: string) => {
      const searchParams = new URLSearchParams(location.search)
      if (value) {
        searchParams.set("search", value)
      } else {
        searchParams.delete("search")
      }
      const newUrl = `${location.pathname}?${searchParams.toString()}`
      navigate(newUrl, { replace: true })
    },
    [location.pathname, location.search, navigate],
  )

  const debouncedHandleSearch = useDebounce(handleSearch, 300)

  const handleInputChange = (value: string) => {
    setSearchValue(value)
    debouncedHandleSearch(value)
  }

  return (
    <Input
      startContent={<FilledSearchIcon size={24} color="#363636" />}
      placeholder="Search Agents.."
      value={searchValue}
      onValueChange={handleInputChange}
      classNames={{
        inputWrapper:
          "!bg-transparent shadow-none w-[60%] md:w-full max-md:pl-0",
        input:
          "text-[16px] md:text-[20px] text-mercury-950 placeholder:text-mercury-800",
      }}
    />
  )
}

export default InputSearchAgent
