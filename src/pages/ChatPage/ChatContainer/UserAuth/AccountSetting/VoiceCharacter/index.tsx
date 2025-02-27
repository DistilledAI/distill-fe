import ComingSoon from "@components/ComingSoon"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Select, SelectItem } from "@nextui-org/react"

const VoiceCharacter = () => {
  return (
    <ComingSoon>
      <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-3 md:p-4">
        <div className="mb-4 flex items-center gap-1 md:gap-2">
          <StarUserIconOutline />
          <span className="text-14 font-medium text-mercury-600 md:text-16">
            Voice Character
          </span>
        </div>
        <Select
          aria-label="Select Voice Character"
          placeholder="Select voice"
          className="w-full"
          classNames={{
            trigger: "rounded-full !bg-mercury-100",
          }}
          defaultSelectedKeys={["natasha"]}
          disableSelectorIconRotation
          selectionMode="single"
        >
          <SelectItem key={"natasha"} className="whitespace-nowrap">
            Natasha-Bristish
          </SelectItem>
        </Select>
      </div>
    </ComingSoon>
  )
}

export default VoiceCharacter
