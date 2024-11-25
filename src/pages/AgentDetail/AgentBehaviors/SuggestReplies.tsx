import { Stack2Icon, Stack3Icon, Stack5Icon } from "@components/Icons"
import SliderCustom from "@components/SliderCustom"
import React from "react"

const SuggestReplies: React.FC = () => {
  return (
    <div className="pointer-events-none opacity-50">
      <p className="font-semibold text-mercury-950">
        Suggest Replies{" "}
        <span className="rounded-full bg-mercury-950 px-2 py-[2px] text-14 text-white">
          COMING SOON
        </span>
      </p>
      <p className="text-mercury-700">How many suggestions per message?</p>
      <div className="mt-4 max-w-[300px] rounded-[22px] bg-mercury-30 p-4">
        <div className="grid grid-cols-3">
          <div className="flex flex-col">
            <Stack2Icon />
            <span className="w-[20px] text-center text-15 font-medium text-mercury-900">
              0
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Stack3Icon />
            <span className="w-[20px] text-center text-15 font-medium text-mercury-900">
              3
            </span>
          </div>
          <div className="flex flex-col items-end">
            <Stack5Icon />
            <span className="w-[20px] text-center text-15 font-medium text-mercury-900">
              5
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <SliderCustom defaultValue={3} maxValue={6} minValue={0} step={3} />
        </div>
      </div>
    </div>
  )
}

export default SuggestReplies
