import MarkdownMessage from "@components/Markdown"
import { twMerge } from "tailwind-merge"

interface SenderMsgProps {
  content: string
  baseClassName?: string
  contentClassName?: string
}

const SenderMessage = ({
  content,
  baseClassName,
  contentClassName,
}: SenderMsgProps) => {
  return (
    <div
      className={twMerge(
        "ml-auto flex w-fit min-w-14 max-w-[90%] items-center justify-center rounded-[20px] bg-mercury-950 px-4 py-2",
        baseClassName,
      )}
    >
      <div
        className={twMerge("text-base-md text-mercury-30", contentClassName)}
      >
        <MarkdownMessage msg={content} isSenderMessage />
      </div>
    </div>
  )
}

export default SenderMessage
