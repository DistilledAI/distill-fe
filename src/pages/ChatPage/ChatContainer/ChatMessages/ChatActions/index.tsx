import { twMerge } from "tailwind-merge"
import ClearContext from "./ClearContext"
import DelegatePrivateAgent from "./DelegatePrivateAgent"

interface ChatActionsProps {
  isClearContextBtn?: boolean
  isDelegateBtn?: boolean
  className?: string
}

const ChatActions = ({
  isClearContextBtn = false,
  isDelegateBtn = false,
  className,
}: ChatActionsProps) => {
  return (
    <div
      className={twMerge(
        "absolute bottom-[69px] left-1/2 z-10 mx-auto flex w-full max-w-[768px] -translate-x-1/2 items-center justify-between bg-white px-4 md:bottom-[96px] xl:px-0",
        className,
      )}
    >
      <div className={twMerge(!isClearContextBtn && "hidden")}>
        <ClearContext />
      </div>
      <div
        className={twMerge(
          "ml-auto hidden md:block",
          !isDelegateBtn && "!hidden",
        )}
      >
        <DelegatePrivateAgent />
      </div>
    </div>
  )
}

export default ChatActions
