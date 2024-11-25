import React from "react"
import { INTERACTION_FREQUENCY, INTERACTION_FREQUENCY_KEY } from "./constants"
import { Button } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"
import { match } from "ts-pattern"

const InteractFrequency: React.FC = () => {
  const { watch, setValue } = useFormContext()
  const interactionFrequencyValue = watch("interactionFrequency")

  const frequencyLength = INTERACTION_FREQUENCY.length
  const frequencyCurrentIndex = INTERACTION_FREQUENCY.findIndex(
    (item) => item.key === interactionFrequencyValue,
  )
  const isMax = frequencyCurrentIndex + 1 === frequencyLength
  const isMin = frequencyCurrentIndex === 0

  const handleClickInteractionFrequency = (type: "up" | "down") => {
    if (type === "up") {
      if (isMax) return
      setValue(
        "interactionFrequency",
        INTERACTION_FREQUENCY[frequencyCurrentIndex + 1]?.key,
      )
    }
    if (type === "down") {
      if (isMin) return
      setValue(
        "interactionFrequency",
        INTERACTION_FREQUENCY[frequencyCurrentIndex - 1]?.key,
      )
    }
  }

  const renderStatusDisplay = () => {
    return match(interactionFrequencyValue)
      .returnType<React.ReactNode>()
      .with(INTERACTION_FREQUENCY_KEY.Frequently, () => (
        <>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
        </>
      ))
      .with(INTERACTION_FREQUENCY_KEY.Occasionally, () => (
        <>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-full w-full rounded-full bg-mercury-900"></span>
          </div>
        </>
      ))
      .otherwise(() => (
        <>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
          <div className="flex h-1 w-1 items-center justify-center">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-300"></span>
          </div>
        </>
      ))
  }

  return (
    <div>
      <p className="font-semibold text-mercury-950">Interaction Frequency</p>
      <p className="min-h-[48px] text-mercury-700">
        How often should the Agent reach out proactively?
      </p>
      <div className="mt-4 max-w-[220px] rounded-[22px] bg-mercury-30 p-4">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-3 gap-[3px]">
            {renderStatusDisplay()}
          </div>
          <p className="font-medium">
            {
              INTERACTION_FREQUENCY.find(
                (item) => item.key === interactionFrequencyValue,
              )?.title
            }
          </p>
        </div>
        <div className="mt-10 flex items-center gap-2">
          <Button
            isDisabled={isMin}
            onClick={() => handleClickInteractionFrequency("down")}
            className="h-[33px] w-[52px] min-w-0 rounded-full bg-mercury-100"
          >
            <span className="h-[2px] w-3 bg-mercury-900"></span>
          </Button>
          <Button
            isDisabled={isMax}
            onClick={() => handleClickInteractionFrequency("up")}
            className="relative h-[33px] w-[52px] min-w-0 rounded-full bg-mercury-100"
          >
            <span className="h-[2px] w-3 bg-mercury-900"></span>
            <span className="absolute left-1/2 h-3 w-[2px] -translate-x-1/2 bg-mercury-900"></span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InteractFrequency
