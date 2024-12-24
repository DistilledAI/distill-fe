import AvatarCustom from "@components/AvatarCustom"
import { twMerge } from "tailwind-merge"

interface Props {
  classNames?: {
    wrapper?: string
    avatarWrapper?: string
    avatar1?: string
    avatar2?: string
    name?: string
    tag?: string
  }
  name: string
  tag: string
  agent1: {
    avatarSrc: string
    publicAddress: string
  }
  agent2: {
    avatarSrc: string
    publicAddress: string
  }
}

const OrchestrationHeader = ({
  classNames,
  agent1,
  agent2,
  name,
  tag,
}: Props) => {
  return (
    <div className={twMerge("flex gap-6", classNames?.wrapper)}>
      <div className={twMerge("relative", classNames?.avatarWrapper)}>
        <AvatarCustom
          src={agent1?.avatarSrc}
          publicAddress={agent1.publicAddress}
          className={twMerge("h-7 w-7", classNames?.avatar1)}
        />
        <AvatarCustom
          className={twMerge(
            "absolute -right-3 top-3 z-[-1] h-7 w-7",
            classNames?.avatar2,
          )}
          src={agent2?.avatarSrc}
          publicAddress={agent2?.publicAddress}
        />
      </div>
      <div>
        <h4
          className={twMerge(
            "text-left text-[14px] font-bold text-mercury-800",
            classNames?.name,
          )}
        >
          {name}
        </h4>
        <span
          className={twMerge("text-[14px] text-mercury-800", classNames?.tag)}
        >
          {tag}
        </span>
      </div>
    </div>
  )
}

export default OrchestrationHeader
