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
  isPrivateChat?: boolean
}

const ReceiverMessage = ({
  content,
  avatar,
  baseClassName,
  contentClassName,
  isTyping,
  isPrivateChat,
}: ReceiverMsgProps) => {
  return (
    <div className={twMerge("flex gap-4", baseClassName)}>
      <div className="flex-shrink-0">
        <AvatarCustom {...avatar} />
      </div>
      <div
        className={twMerge("flex-1 text-[16px] font-medium", contentClassName)}
      >
        {isTyping ? (
          <DotLoading className="mt-2" />
        ) : (
          <MarkdownMessage msg={content} isPrivateChat={isPrivateChat} />
        )}
      </div>
    </div>
  )
}

export default ReceiverMessage
