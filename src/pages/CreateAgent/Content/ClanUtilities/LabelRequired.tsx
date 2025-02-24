import React from "react"

interface Props {
  label: string
}

const LabelRequired = ({ label }: Props) => {
  return (
    <label className="text-16 font-semibold text-mercury-950">
      {label} <span className="text-[#FF3B30]">*</span>
    </label>
  )
}

export default LabelRequired
