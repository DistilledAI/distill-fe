import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { Spinner } from "@nextui-org/react"
import React from "react"
import { twMerge } from "tailwind-merge"

const AgentStatus: React.FC<{
  isAgentActive: boolean
  classNames?: {
    wrapper?: string
    textWrapper?: string
  }
}> = ({ isAgentActive, classNames }) => {
  return (
    <div
      className={twMerge(
        "flex flex-1 flex-col items-center gap-1",
        classNames?.wrapper,
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FC0] md:h-10 md:w-10">
        <FilledBrainAIIcon color="#363636" size={24} />
        <div
          className={twMerge(
            "absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white shadow-8",
            isAgentActive && "bg-green-500",
          )}
        >
          {!isAgentActive ? (
            <Spinner
              classNames={{
                wrapper: "w-3 h-3",
                circle1: "border-[#E7E0D7] border-b-brown-500",
                circle2: "border-b-brown-500",
              }}
            />
          ) : (
            <CheckFilledIcon color="white" size={12} />
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "flex flex-col items-center",
          classNames?.textWrapper,
        )}
      >
        <span className="text-14 font-semibold text-mercury-950 md:text-18">
          {isAgentActive ? "Your Agent created" : "Creating your"}
        </span>
        <span className="text-14 font-semibold text-mercury-950 md:text-18">
          {isAgentActive ? "with Private Intelligence" : "Private Agent..."}
        </span>
      </div>
    </div>
  )
}

export default AgentStatus
