import { AsteriskIcon } from "@components/Icons"
import { Slider } from "@nextui-org/react"
import React from "react"

const SliderCustom: React.FC<{
  step: number
  maxValue: number
  minValue: number
  onChange?: (val: number | number[]) => void
  defaultValue?: number
  value?: number
}> = ({ step, minValue, maxValue, defaultValue, value, onChange }) => {
  return (
    <Slider
      aria-label="slider-custom"
      size="lg"
      step={step}
      showSteps={true}
      maxValue={maxValue}
      minValue={minValue}
      defaultValue={defaultValue}
      value={value}
      classNames={{
        track: "border-s-[#F6F5F0] bg-mercury-100 m-0",
        filler: "bg-[#F6F5F0]",
        step: "bg-mercury-300 w-[1px] h-2 data-[in-range=true]:bg-mercury-300",
        trackWrapper: "border-1 border-mercury-300 rounded-full cursor-pointer",
      }}
      onChange={onChange}
      renderThumb={(props) => (
        <div
          {...props}
          className="top-1/2 flex h-full w-10 cursor-pointer items-center justify-center rounded-full border-2 border-brown-500 bg-white"
        >
          <AsteriskIcon />
        </div>
      )}
    />
  )
}

export default SliderCustom
