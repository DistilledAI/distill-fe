import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
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
    <Button
      className={twMerge(
        "group absolute left-8 top-[22px] z-20 hidden items-center gap-x-3 bg-transparent md:flex",
        className,
      )}
      onPress={() => (onClick ? onClick() : onBack())}
    >
      <div className="rounded-full bg-transparent p-[2px] group-hover:bg-mercury-50">
        <ArrowLeftFilledIcon size={24} />
      </div>
      <span className="text-16 font-bold text-mercury-950">Back</span>
    </Button>
  )
}

export default BackButton
