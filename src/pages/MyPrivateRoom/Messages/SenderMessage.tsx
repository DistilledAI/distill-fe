import React from "react"
import { twMerge } from "tailwind-merge"

const SenderMessage: React.FC<{
  baseClassName?: string
}> = ({ baseClassName }) => {
  return (
    <div
      className={twMerge(
        "bg-mer ml-auto flex w-fit min-w-14 max-w-[90%] items-center justify-center rounded-[20px] bg-mercury-950 px-4 py-2",
        baseClassName,
      )}
    >
      <p className={"text-16 font-medium text-mercury-30"}>
        I want to swap token
      </p>
    </div>
  )
}

export default SenderMessage
