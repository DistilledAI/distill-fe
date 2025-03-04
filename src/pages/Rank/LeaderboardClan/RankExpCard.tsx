import AvatarContainer from "@components/AvatarContainer"
import { twMerge } from "tailwind-merge"

interface RankCardProps {
  rank: number
  avatarUrl?: string
  publicAddress?: string
  username: string
  exp: number | string
  xDSTL: number | string
  classNames?: {
    wrapper?: string
    rank?: string
    avatar?: string
    username?: string
    value1?: string
    value2?: string
  }
}

const RankExpCard = ({
  rank,
  avatarUrl,
  publicAddress,
  username,
  exp,
  xDSTL,
  classNames,
}: RankCardProps) => {
  const rankColors: { [key: number]: string } = {
    1: "bg-[#E2C60E] border-transparent text-white",
    2: "bg-[#999] border-transparent text-white",
    3: "bg-[#A2845E] border-transparent text-white",
  }

  const rankColor = rankColors[rank] || ""

  return (
    <div
      className={twMerge(
        "flex items-center justify-between rounded-lg p-2",
        classNames?.wrapper,
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={twMerge(
            "flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-mercury-300 bg-white px-1 text-[13px] font-bold leading-[140%] text-mercury-900",
            rankColor,
            classNames?.rank,
          )}
        >
          {rank}
        </div>
        <AvatarContainer
          avatarUrl={avatarUrl}
          publicAddress={publicAddress}
          wrapperClassName="gap-x-1"
          avatarClassName={twMerge("h-6 w-6", classNames?.avatar)}
          usernameClassName={twMerge(
            "text-[14px] text-mercury-900",
            classNames?.username,
          )}
          userName={username}
        />
      </div>
      <div className="flex flex-col items-end">
        <span
          className={twMerge(
            "text-[14px] font-bold text-mercury-950",
            classNames?.value1,
          )}
        >
          {exp} EXP
        </span>
        <span
          className={twMerge("text-[14px] text-brown-500", classNames?.value2)}
        >
          +{xDSTL} xDSTL
        </span>
      </div>
    </div>
  )
}

export default RankExpCard
