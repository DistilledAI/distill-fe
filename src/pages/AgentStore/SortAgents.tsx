import { CaretUpFilledIcon } from "@components/Icons/TrendingPage"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SharedSelection,
} from "@nextui-org/react"
import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SortOptions } from "./types"

const SortAgents: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set([SortOptions.OLDEST]),
  )
  const searchParams = new URLSearchParams(location.search)
  const sortByFromUrl = searchParams.get("sortBy")
  const tabByFromUrl = searchParams.get("tab")

  useEffect(() => {
    const validOptions = Object.values(SortOptions)

    if (
      tabByFromUrl !== "agent-clans" &&
      sortByFromUrl === SortOptions.TRENDING
    ) {
      setSelectedKeys(new Set([SortOptions.OLDEST]))
      searchParams.set("sortBy", SortOptions.OLDEST)
      return navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      })
    }

    if (sortByFromUrl && validOptions.includes(sortByFromUrl as SortOptions)) {
      setSelectedKeys(new Set([sortByFromUrl]))
    } else {
      setSelectedKeys(new Set([SortOptions.OLDEST]))
    }
  }, [sortByFromUrl, tabByFromUrl])

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  )

  const handleSelectionChange = (keys: SharedSelection) => {
    const newSelectedKeys: Set<string> =
      keys instanceof Set
        ? new Set(Array.from(keys).map((key) => String(key)))
        : new Set([String(keys)])

    setSelectedKeys(newSelectedKeys)
    const selectedSortBy = Array.from(newSelectedKeys)[0]
    searchParams.set("sortBy", selectedSortBy)
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    })
  }

  return (
    <Dropdown
      classNames={{
        content: "border border-mercury-100 shadow-11",
      }}
    >
      <DropdownTrigger>
        <button className="flex h-14 items-center justify-center gap-1 rounded-full bg-mercury-30 !outline-[0px] max-md:px-2 md:w-[180px] md:gap-2">
          <span className="text-14 font-bold text-mercury-700 md:text-16">
            Sort by: <span className="text-mercury-950">{selectedValue}</span>
          </span>
          <div className="rotate-180">
            <CaretUpFilledIcon size={20} color="#545454" />
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={handleSelectionChange}
        itemClasses={{
          base: "aria-[checked=true]:!bg-brown-50 data-[hover=true]:!bg-brown-50 data-[selected=true]:!bg-brown-50 data-[focus=true]:!bg-brown-50",
          title: "text-[16px] font-bold text-mercury-900",
          selectedIcon: "text-brown-500 w-4 h-4",
        }}
      >
        <DropdownItem key={SortOptions.OLDEST}>Oldest</DropdownItem>
        <DropdownItem key={SortOptions.NEWEST}>Newest</DropdownItem>
        {tabByFromUrl === "agent-clans" ? (
          <DropdownItem key={SortOptions.TRENDING}>Trending</DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  )
}

export default SortAgents
