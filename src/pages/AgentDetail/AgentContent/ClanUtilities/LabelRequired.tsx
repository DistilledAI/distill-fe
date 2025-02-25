import { twMerge } from "tailwind-merge"

interface Props {
  label: string
  isRequired?: boolean
}

const LabelRequired = ({ label, isRequired = true }: Props) => {
  return (
    <label className="text-16 font-semibold text-mercury-950">
      {label}{" "}
      <span className={twMerge("text-[#FF3B30]", !isRequired && "hidden")}>
        *
      </span>
    </label>
  )
}

export default LabelRequired
