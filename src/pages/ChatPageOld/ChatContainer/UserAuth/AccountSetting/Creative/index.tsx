import { scaler } from "@assets/images"
import ComingSoon from "@components/ComingSoon"
import { Select, SelectItem } from "@nextui-org/react"

const AgentCreative = () => {
  return (
    <ComingSoon>
      <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-4">
        <div className="flex items-center justify-between">
          <Select
            aria-label="Select Agent Creative"
            placeholder="Select language"
            className="w-[100px]"
            classNames={{
              trigger: "rounded-full !bg-mercury-100",
            }}
            defaultSelectedKeys={["master"]}
            disableSelectorIconRotation
            selectionMode="single"
          >
            <SelectItem key={"master"}>Master</SelectItem>
          </Select>
          <div className="text-mercury-900">Funny, Creative</div>
        </div>
        <img
          className="mt-4 h-auto w-full object-cover"
          src={scaler}
          alt="agent creative"
        />
      </div>
    </ComingSoon>
  )
}

export default AgentCreative
