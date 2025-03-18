import ContextCleared from "@components/ContextCleared"
import { ChatResumeIcon } from "@components/Icons/Chat"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { Button } from "@nextui-org/react"
import { getActiveColorRandomById } from "@utils/index"
import { useParams } from "react-router-dom"

const MessageCleared = () => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)

  return (
    <div className="flex w-full flex-col px-3 md:px-0">
      <div className="flex w-full flex-wrap items-center justify-end gap-2 md:justify-between">
        <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-mercury-100 py-1 pl-2 pr-1 text-mercury-950 md:w-auto md:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-14">Oct 24, 3:12 PM</span>
            <p className="text-14 font-bold">Context’s generated name</p>
          </div>
          <Button className="h-auto min-w-0 rounded-md border-1 border-mercury-400 bg-mercury-300 p-0 px-1 py-[2px] text-14 font-bold md:rounded-lg md:px-2">
            <span className="hidden md:block">Show Chat</span>
            <div className="scale-75 md:hidden">
              <ChevronDownIcon />
            </div>
          </Button>
        </div>
        <div className="flex cursor-pointer items-center gap-1 hover:opacity-75">
          <span className="text-14 font-semibold text-mercury-950">
            Resume Chat
          </span>
          <ChatResumeIcon />
        </div>
      </div>
      <div className="w-full py-4">
        <ContextCleared textClassName={textColor} />
      </div>
    </div>
  )
}

export default MessageCleared
