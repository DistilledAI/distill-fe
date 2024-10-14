import { Avatar, Badge, SlotsToClasses } from "@nextui-org/react"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarCustomProps {
  badgeIcon?: string | ReactNode
  src?: string
  classNames?:
    | SlotsToClasses<"base" | "img" | "name" | "icon" | "fallback">
    | undefined
  badgeClassName?: string
  badgeBaseClassName?: string
  placement?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | undefined
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  badgeIcon,
  src,
  classNames,
  badgeClassName,
  badgeBaseClassName,
  placement = "bottom-right",
}) => {
  if (badgeIcon) {
    return (
      <Badge
        content={badgeIcon}
        placement={placement}
        variant="solid"
        isOneChar
        classNames={{
          base: twMerge("h-fit", badgeBaseClassName),
          badge: twMerge(
            "min-w-[18px] min-h-[18px] w-[18px] h-[18px] right-[15%] bottom-[15%]",
            badgeClassName,
          ),
        }}
        showOutline={false}
      >
        <Avatar
          src={src}
          className="border border-mercury-400"
          disableAnimation={true}
        />
      </Badge>
    )
  }

  return (
    <Avatar
      classNames={classNames}
      src={src}
      className="border border-mercury-400"
      disableAnimation={true}
    />
  )
}
export default AvatarCustom
