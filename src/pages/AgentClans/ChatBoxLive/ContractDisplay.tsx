import { CopyIcon } from "@components/Icons/Copy"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React from "react"
import { twMerge } from "tailwind-merge"

interface ContractDisplayProps {
  label?: string
  icon?: string
  value?: string
  ellipsisLength?: number
  classNames?: {
    wrapper?: string
    label?: string
    icon?: string
    valueWrapper?: string
    value?: string
    contentWrapper?: string
  }
}

const ContractDisplay: React.FC<ContractDisplayProps> = ({
  label = "Contract",
  icon,
  value,
  ellipsisLength = 6,
  classNames,
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-2",
        classNames?.wrapper,
      )}
    >
      {label && (
        <span
          className={twMerge(
            "text-[16px] font-bold text-mercury-950",
            classNames?.label,
          )}
        >
          {label}
        </span>
      )}
      <div
        className={twMerge(
          "flex items-center gap-2 rounded-[22px] bg-mercury-30 px-2 py-[2px] hover:bg-mercury-50",
          !value && "bg-transparent hover:bg-transparent",
          classNames?.contentWrapper,
        )}
      >
        {icon && <img src={icon} alt={`${label} icon`} />}
        {value ? (
          <div
            className={twMerge(
              "flex cursor-pointer items-center gap-2",
              classNames?.valueWrapper,
            )}
            onClick={(e) => copyClipboard(e, value)}
          >
            <span
              className={twMerge(
                "text-[16px] text-mercury-900",
                classNames?.value,
              )}
            >
              {centerTextEllipsis(value, ellipsisLength)}
            </span>
            <CopyIcon />
          </div>
        ) : (
          "--"
        )}
      </div>
    </div>
  )
}

export default ContractDisplay
