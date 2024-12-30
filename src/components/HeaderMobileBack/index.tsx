import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import React from "react"
import { useNavigate } from "react-router-dom"

const HeaderMobileBack: React.FC<{
  title?: string
  rightContent?: React.ReactNode
}> = ({ title, rightContent }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-4">
      <Button
        onPress={() => navigate(-1)}
        className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
      >
        <ArrowLeftFilledIcon />
      </Button>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-mercury-900">
        {title}
      </div>
      {rightContent}
    </div>
  )
}

export default HeaderMobileBack
