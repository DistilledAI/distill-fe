import { BriefIcon, DetailedIcon, ModerateIcon } from "@components/Icons"
import SliderCustom from "@components/SliderCustom"
import React from "react"
import { useFormContext } from "react-hook-form"
import { RESPONSE_LENGTH } from "./constants"

const ResponseLength: React.FC = () => {
  const { watch, setValue } = useFormContext()

  return (
    <div>
      <p className="font-semibold text-mercury-950">Response Length</p>
      <p className="text-mercury-700">
        How detailed should the Agent's responses be?
      </p>
      <div className="mt-4 max-w-[300px] rounded-[22px] bg-mercury-30 p-4">
        <div className="grid grid-cols-3">
          <div className="flex flex-col">
            <BriefIcon />
            <span className="text-15 font-medium text-mercury-900">Brief</span>
          </div>
          <div className="flex flex-col items-center">
            <ModerateIcon />
            <span className="text-15 font-medium text-mercury-900">
              Moderate
            </span>
          </div>
          <div className="flex flex-col items-end">
            <DetailedIcon />
            <span className="text-15 font-medium text-mercury-900">
              Detailed
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <SliderCustom
            maxValue={6}
            minValue={0}
            step={3}
            value={
              RESPONSE_LENGTH.find(
                (item) => item.key === watch("response_length"),
              )?.value
            }
            onChange={(val) => {
              const isArray = Array?.isArray(val)
              const currentValue = isArray ? val?.[0] : val
              setValue(
                "response_length",
                RESPONSE_LENGTH.find((item) => item.value === currentValue)
                  ?.key,
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ResponseLength
