import { CaretUpFilledIcon } from "@components/Icons/TrendingPage"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import React from "react"

const SortAgents = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["text"]))

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  )

  return (
    <Dropdown
      classNames={{
        content: "border border-mercury-100 shadow-11",
      }}
    >
      <DropdownTrigger>
        <button className="flex h-14 w-[180px] items-center justify-center gap-2 rounded-full bg-mercury-30 !outline-[0px]">
          <span className="text-16 font-bold text-mercury-700">
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
        onSelectionChange={setSelectedKeys}
        itemClasses={{
          base: "aria-[checked=true]:!bg-brown-50 data-[hover=true]:!bg-brown-50 data-[selected=true]:!bg-brown-50 data-[focus=true]:!bg-brown-50",
          title: "text-[16px] font-bold text-mercury-900",
          selectedIcon: "text-brown-500 w-4 h-4",
        }}
      >
        <DropdownItem key="trending">Trending</DropdownItem>
        <DropdownItem key="newest">Newest</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SortAgents
