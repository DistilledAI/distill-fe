import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

interface Props {
  content?: string
  link?: string
  icon: React.ReactNode | string
  isDisabled?: boolean
  btnClassName?: string
}

const SocialButton = ({
  content,
  link,
  icon,
  isDisabled,
  btnClassName,
}: Props) => {
  return (
    <Button
      as={Link}
      to={link}
      isDisabled={isDisabled}
      target="_blank"
      className={twMerge(
        "h-14 w-full rounded-full bg-mercury-70 text-white md:h-10",
        btnClassName,
      )}
    >
      {typeof icon === "string" ? <img src={icon} /> : icon}
      {content ? (
        <span className="text-base text-mercury-900">{content}</span>
      ) : null}
    </Button>
  )
}

export default SocialButton
