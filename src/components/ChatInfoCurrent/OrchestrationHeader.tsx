import { AvatarConversation } from "@components/AvatarContainer"
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
  agent1: any
  agent2: any
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
      <AvatarConversation
        avatarAgent1={agent1?.avatar}
        avatarAgent2={agent2?.avatar}
        classNames={{
          avatarWrapper: classNames?.avatarWrapper,
          avatar1: classNames?.avatar1,
          avatar2: classNames?.avatar2,
        }}
      />
      <div className="text-left">
        <h4
          className={twMerge(
            "text-[14px] font-bold text-mercury-950",
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
