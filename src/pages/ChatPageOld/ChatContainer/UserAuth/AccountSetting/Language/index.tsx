import ComingSoon from "@components/ComingSoon"
import { WorldGlobalIcon } from "@components/Icons/World"
import { Select, SelectItem } from "@nextui-org/react"

const Language = () => {
  return (
    <ComingSoon>
      <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-3 md:p-4">
        <div className="mb-4 flex items-center gap-1 md:gap-2">
          <WorldGlobalIcon />
          <span className="text-14 font-medium text-mercury-600 md:text-16">
            Language
          </span>
        </div>
        <Select
          aria-label="Select Language"
          placeholder="Select language"
          className="w-full"
          classNames={{
            trigger: "rounded-full !bg-mercury-100",
          }}
          defaultSelectedKeys={["english"]}
          disableSelectorIconRotation
          selectionMode="single"
        >
          <SelectItem key={"english"}>English</SelectItem>
        </Select>
      </div>
    </ComingSoon>
  )
}

export default Language
