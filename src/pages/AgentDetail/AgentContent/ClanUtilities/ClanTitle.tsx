import React from "react"

interface Props {
  title: string
  icon?: React.ReactNode
}

const ClanTitle = ({ title, icon }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-22 font-bold text-mercury-950 max-md:text-18">
        {title}
      </h2>
    </div>
  )
}

export default ClanTitle
