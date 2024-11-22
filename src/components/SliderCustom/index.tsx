import { AsteriskIcon } from "@components/Icons"
import { Slider } from "@nextui-org/react"
import React from "react"

const SliderCustom: React.FC<{
  step: number
  maxValue: number
  minValue: number
  defaultValue?: number
}> = ({ step, minValue, maxValue, defaultValue }) => {
  return (
    <Slider
      size="lg"
      step={step}
      showSteps={true}
      maxValue={maxValue}
      minValue={minValue}
      defaultValue={defaultValue}
      classNames={{
        track: "border-s-[#F6F5F0] bg-mercury-100 m-0",
        filler: "bg-[#F6F5F0]",
        step: "bg-mercury-300 w-[1px] h-2 data-[in-range=true]:bg-mercury-300",
        trackWrapper: "border-1 border-mercury-300 rounded-full",
      }}
      renderThumb={(props) => (
        <div
          {...props}
          className="top-1/2 flex h-full w-10 items-center justify-center rounded-full border-2 border-brown-500 bg-white"
        >
          <AsteriskIcon />
        </div>
      )}
    />
  )
}

export default SliderCustom
