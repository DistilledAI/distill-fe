import { maxAvatarPlaceholder } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon } from "@components/Icons"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import { centerTextEllipsis, shortenNumber } from "@utils/index"
import React, { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { match } from "ts-pattern"

interface AvatarContainerProps {
  badgeIcon?: ReactNode
  avatarUrl?: string
  userName: string
  badgeClassName?: string
  publicAddress?: string
  avatarClassName?: string
  isLive?: boolean
  usernameClassName?: string
  wrapperClassName?: string
}
const AvatarContainer: React.FC<AvatarContainerProps> = ({
  badgeIcon,
  avatarUrl,
  userName,
  badgeClassName,
  publicAddress,
  avatarClassName,
  isLive = false,
  usernameClassName,
  wrapperClassName,
}) => {
  return (
    <div className={twMerge("flex items-center gap-x-3", wrapperClassName)}>
      <AvatarCustom
        badgeIcon={badgeIcon}
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName={badgeClassName}
        className={avatarClassName}
        isLive={isLive}
      />
      {userName && (
        <span
          className={twMerge(
            "line-clamp-1 text-ellipsis text-16 font-medium text-mercury-950",
            usernameClassName,
          )}
        >
          {userName}
        </span>
      )}
    </div>
  )
}

export default AvatarContainer

export const AvatarClan: React.FC<{
  avatarUrl?: string
  name: string
  publicAddress?: string
  category?: "first" | "second"
  owner?: {
    avatar?: string
    username: string
    publicAddress: string
  }
}> = ({ avatarUrl, publicAddress, name, category = "first", owner }) => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  const renderInfoByCategory = () => {
    return match(category)
      .with("first", () => (
        <div className={twMerge(sidebarCollapsed && "hidden")}>
          <p className="text-13 font-medium leading-[1.4] text-mercury-700">
            Clan
          </p>
          <p className="line-clamp-1 text-16 font-semibold text-mercury-950">
            {name}
          </p>
        </div>
      ))
      .with("second", () => (
        <div>
          <p className="line-clamp-1 text-16 font-semibold text-mercury-950">
            {name}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-14 font-medium text-mercury-600">
              Owned by
            </span>
            {owner && (
              <AvatarContainer
                avatarUrl={owner.avatar}
                publicAddress={owner.publicAddress}
                userName={owner.username || "Unnamed"}
                avatarClassName="w-5 h-5"
                usernameClassName="text-14 text-[#A2845E] font-bold"
              />
            )}
          </div>
        </div>
      ))
      .run()
  }

  return (
    <div className="flex h-full items-center gap-x-3">
      <AvatarCustom
        badgeIcon={<LiveIcon />}
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName="bg-lgd-code-hot-ramp"
        isLive={true}
      />
      {renderInfoByCategory()}
    </div>
  )
}

export const AvatarClanByList: React.FC<{
  avatarUrl?: string
  name: string
  publicAddress?: string
  member?: number
  isNameDisplay?: boolean
  className?: string
}> = ({
  avatarUrl,
  name,
  publicAddress,
  member,
  isNameDisplay = true,
  className,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <AvatarCustom
          src={avatarUrl}
          publicAddress={publicAddress}
          className={className}
          badgeClassName="bg-lgd-code-hot-ramp"
          isLive={true}
        />
        <div className="-mt-[10px] flex h-fit w-fit min-w-[18px] items-center rounded-full bg-[#FF3B30] px-[5px] py-[1px]">
          <FilledUserIcon size={12} color="#FFFFFF" />
          <span className="text-13 font-medium leading-[140%] text-white">
            {shortenNumber(member || 0)}
          </span>
        </div>
      </div>
      {isNameDisplay && (
        <p className="mt-[6px] line-clamp-1 max-w-[60px] text-14 leading-none">
          {name}
        </p>
      )}
      {/* <p className="mt-1 text-14 leading-none">.Clan</p> */}
    </div>
  )
}

export const AvatarMention: React.FC<{
  avatarUrl?: string
  name: string
  publicAddress?: string
}> = ({ avatarUrl, name, publicAddress }) => {
  return (
    <div className="flex h-full items-center gap-x-3">
      <AvatarCustom
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName="bg-lgd-code-hot-ramp"
        className="h-8 w-8"
      />
      <div className="flex items-center gap-2">
        <p className="line-clamp-1 text-14 font-semibold">{name}</p>
        <p className="text-14 text-mercury-600">
          ({centerTextEllipsis(publicAddress ?? "", 4)})
        </p>
      </div>
    </div>
  )
}

export const AvatarConversation: React.FC<{
  avatarAgent1: string
  avatarAgent2: string
  classNames?: {
    avatarWrapper?: string
    avatar1?: string
    avatar2?: string
  }
}> = ({ avatarAgent1, avatarAgent2, classNames }) => {
  return (
    <div className={twMerge("relative", classNames?.avatarWrapper)}>
      <AvatarCustom
        src={avatarAgent1}
        className={twMerge("h-7 w-7", classNames?.avatar1)}
      />
      <AvatarCustom
        className={twMerge(
          "absolute -right-3 top-3 z-[-1] h-7 w-7",
          classNames?.avatar2,
        )}
        src={avatarAgent2}
      />
    </div>
  )
}
