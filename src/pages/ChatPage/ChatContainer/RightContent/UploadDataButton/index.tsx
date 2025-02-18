import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface UploadDataButtonProps {
  icon: ReactNode
  label: string
  isDisable?: boolean
  radiusFull?: boolean
  onClick?: any
  customClassName?: string
  textClassName?: string
  children?: React.ReactNode
}

const UploadDataButton: React.FC<UploadDataButtonProps> = ({
  icon,
  label,
  isDisable,
  radiusFull,
  onClick,
  customClassName,
  textClassName,
  children,
}) => {
  if (!radiusFull) {
    return (
      <div
        className={twMerge(
          "broder h-fit rounded-[32px] border-[1px] border-mercury-200 bg-mercury-50 p-1",
          customClassName,
        )}
      >
        <div
          className="flex h-[52px] min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6 aria-selected:opacity-40"
          aria-selected={isDisable}
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span
              className={twMerge("text-base-b mr-2 text-center", textClassName)}
            >
              {label}
            </span>
          </div>
          <TablerPlusIcon />
        </div>
        {children}
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        "flex h-[145px] w-[145px] cursor-pointer flex-col items-center justify-center gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6 aria-selected:opacity-40",
        customClassName,
      )}
      aria-selected={isDisable}
      onClick={onClick}
    >
      {icon}
      <div className={twMerge("text-base-b text-center", textClassName)}>
        {label}
      </div>
    </div>
  )
}
export default UploadDataButton
