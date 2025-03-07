import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { PATH_NAMES } from "@constants/index"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const BackButton: React.FC<{
  className?: string
  onClick?: () => void
}> = ({ className, onClick }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHistory = location.state?.isHistory

  const onBack = () => {
    if (isHistory) return navigate(-1)
    return navigate(PATH_NAMES.HOME)
  }

  return (
    <button
      type="button"
      className={twMerge(
        "group absolute left-8 top-[3px] z-[51] flex items-center justify-start gap-x-2 bg-transparent",
        className,
      )}
      onClick={() => (onClick ? onClick() : onBack())}
    >
      <div className="rounded-full bg-transparent p-[2px] group-hover:bg-mercury-50">
        <ArrowLeftFilledIcon size={24} />
      </div>
      <span className="text-16 font-semibold text-mercury-950">Back</span>
    </button>
  )
}

export default BackButton
