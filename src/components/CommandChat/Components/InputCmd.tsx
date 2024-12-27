import React from "react"
import { twMerge } from "tailwind-merge"

const InputCmd: React.FC<{
  value: string
  placeholder?: string
  type?: "text" | "number"
  className?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}> = ({ placeholder, onChange, value, type = "text", className }) => {
  return (
    <input
      className={twMerge(
        "h-9 rounded-lg border-1 border-[#A2845E] bg-brown-50 px-2 text-14 outline-none",
        className,
      )}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default InputCmd
