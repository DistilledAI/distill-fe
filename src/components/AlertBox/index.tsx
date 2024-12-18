import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { MouseEvent, ReactNode } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

interface AlertBoxProps {
  isVisible?: boolean
  messages: ReactNode[]
  links?: {
    to: string
    label: string
    external?: boolean
    onClick?: (event: MouseEvent<any>) => void
  }[]
  className?: string
}

const AlertBox = ({
  isVisible = true,
  messages,
  links,
  className = "",
}: AlertBoxProps) => {
  if (!isVisible) return null

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between gap-1 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3 md:flex-row md:items-center md:gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div>
          <InfoCircleIcon color="#83664B" size={16} />
        </div>
        <div>
          {messages.map((message, index) => (
            <div key={index} className="text-16 font-medium text-brown-600">
              {message}
            </div>
          ))}
        </div>
      </div>
      {links && (
        <div className="flex gap-4 max-md:ml-[22px]">
          {links.map(({ to, label, external, onClick }) => (
            <Link
              key={label}
              to={to}
              target={external ? "_blank" : "_self"}
              onClick={onClick}
              className="whitespace-nowrap text-16 font-bold text-brown-600 hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AlertBox
