import AvatarCustom, { AvatarCustomProps } from "@components/AvatarCustom"
import DotLoading from "@components/DotLoading"
import MarkdownMessage from "@components/Markdown"
import { twMerge } from "tailwind-merge"

interface ReceiverMsgProps {
  content: string
  avatar: AvatarCustomProps
  baseClassName?: string
  contentClassName?: string
  isTyping?: boolean
  isDeepThink?: boolean
}

const ReceiverMessage = ({
  content,
  avatar,
  baseClassName,
  contentClassName,
  isTyping,
  isDeepThink,
}: ReceiverMsgProps) => {
  return (
    <div className={twMerge("flex gap-4", baseClassName)}>
      <AvatarCustom {...avatar} />
      <div
        className={twMerge("flex-1 text-[16px] font-medium", contentClassName)}
      >
        {isTyping ? (
          <DotLoading className="mt-2" />
        ) : (
          <MarkdownMessage msg={content} isDeepThink={isDeepThink} />
        )}
      </div>
    </div>
  )
}

export default ReceiverMessage
