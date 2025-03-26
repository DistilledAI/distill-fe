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
        "flex flex-col justify-between gap-[1px] rounded-lg bg-brown-50 px-3 py-2 md:flex-row md:items-center md:gap-2 md:px-4 md:py-3",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && <div>{icon}</div>}
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className="text-13 font-medium text-brown-600 md:text-16"
            >
              {message}
            </div>
          ))}
        </div>
      </div>

      {extendButton ||
        (links && (
          <div className="flex gap-4">
            {links.map(({ to, label, external, onClick }) => (
              <Link
                key={label}
                to={to}
                target={external ? "_blank" : "_self"}
                onClick={onClick}
                className="whitespace-nowrap text-13 font-bold text-brown-600 hover:underline md:text-16"
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
