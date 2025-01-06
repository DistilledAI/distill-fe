import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { twMerge } from "tailwind-merge"
import { useCommandMsgChat } from "./Providers/CommandMessageProvider"
import useSubmit from "./useSubmit"

const SubmitCommandChat = () => {
  const { infoAction } = useCommandMsgChat()
  const { handleSubmit } = useSubmit()

  return (
    <button
      type="button"
      disabled={!infoAction}
      onClick={handleSubmit}
      className={twMerge(
        "h-9 w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2 disabled:border-transparent disabled:bg-mercury-950/60",
      )}
    >
      <ArrowUpFilledIcon bgColor={"#FAFAFA"} />
    </button>
  )
}

export default SubmitCommandChat
