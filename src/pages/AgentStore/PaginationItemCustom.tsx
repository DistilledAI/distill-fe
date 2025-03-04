import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import {
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

const PaginationItemCustom = ({
  ref,
  key,
  value,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        className={twMerge(
          className,
          "h-8 w-8 min-w-8 -rotate-90 bg-mercury-70",
        )}
        onClick={onNext}
      >
        <ChevronDownIcon />
      </button>
    )
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        className={twMerge(
          className,
          "h-8 w-8 min-w-8 rotate-90 bg-mercury-70",
        )}
        onClick={onPrevious}
      >
        <ChevronDownIcon />
      </button>
    )
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    )
  }

  return (
    <button
      key={key}
      ref={ref}
      className={className}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  )
}

export default PaginationItemCustom
