import { CircleRelativeIcon, SyncOutlineIcon } from "@components/Icons"
import { Switch } from "@nextui-org/react"
import React from "react"
import { useFormContext } from "react-hook-form"

const ToneAdaptation: React.FC = () => {
  const { watch, setValue } = useFormContext()
  const toneAdaptationValue = watch("toneAdaptation")

  return (
    <div>
      <p className="font-semibold text-mercury-950">Tone Adaption</p>
      <p className="text-mercury-700">
        Should the Agent adapt its tone depending on the user's mood or input?
      </p>
      <div className="mt-4 max-w-[220px] rounded-[22px] bg-mercury-30 p-4">
        <div className="flex items-center gap-2">
          {toneAdaptationValue ? (
            <>
              <SyncOutlineIcon />
              <p className="font-medium">Adapt</p>
            </>
          ) : (
            <>
              <CircleRelativeIcon />
              <p className="font-medium">No Adapt</p>
            </>
          )}
        </div>
        <div className="mt-11 flex items-center gap-2">
          <Switch
            value={toneAdaptationValue}
            onValueChange={(val) => setValue("toneAdaptation", val)}
            aria-label="Adapt"
          />
        </div>
      </div>
    </div>
  )
}

export default ToneAdaptation
