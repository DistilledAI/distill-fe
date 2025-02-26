import { twMerge } from "tailwind-merge"

interface LabelCustomProps {
  text: string
  icon: React.ReactNode
}

interface FieldLabelProps {
  text: string | React.ReactNode
  required?: boolean
  containerClassName?: string
  desc?: string
}

const CategoryLabel: React.FC<LabelCustomProps> = ({ text, icon }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-22 font-bold text-mercury-950 max-sm:text-16">
        {text}
      </span>
    </div>
  )
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  text,
  desc,
  required,
  containerClassName,
}) => {
  return (
    <div className={twMerge("mb-2", containerClassName)}>
      <h4 className="text-16 font-semibold text-mercury-950 max-md:text-14">
        {text} {required && <span className="text-[#FF3B30]">*</span>}
      </h4>
      <p className="text-16 text-mercury-700 max-md:text-14">{desc}</p>
    </div>
  )
}

export const Divider = () => {
  return <div className="my-8 h-[1px] w-full bg-mercury-100" />
}

export default CategoryLabel
