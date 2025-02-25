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
  icon?: React.ReactNode
  extendButton?: React.ReactNode
}

const AlertBox = ({
  isVisible = true,
  messages,
  links,
  className = "",
  icon,
  extendButton,
}: AlertBoxProps) => {
  if (!isVisible) return null

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between gap-1 rounded-lg bg-brown-50 px-4 py-3 md:flex-row md:items-center md:gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && icon}
        <div>
          {messages.map((message, index) => (
            <div key={index} className="text-16 font-medium text-brown-600">
              {message}
            </div>
          ))}
        </div>
      </div>

      {extendButton ||
        (links && (
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
        ))}
    </div>
  )
}

export default AlertBox
