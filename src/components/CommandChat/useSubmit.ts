import {
  ICmdMessage,
  useCmdMessageList,
} from "@pages/MyPrivateRoom/CmdMessageProvider"
import { useCommandMsgChat } from "./Providers/CommandMessageProvider"
import { makeId } from "@utils/index"
import { useCommandActionChat } from "./Providers/CommandActionProvider"

const useSubmit = () => {
  const { infoAction } = useCommandMsgChat()
  const { setCurrentAction } = useCommandActionChat()
  const { setMessages } = useCmdMessageList()
  const handleSubmit = () => {
    if (!infoAction) return
    const data: ICmdMessage = {
      id: makeId(),
      lock: {
        tokenAddress: infoAction.data.fromToken,
        amount: infoAction.data.amount,
        duration: infoAction.data.duration,
      },
    }
    setMessages((prev) => (prev ? prev.concat([data]) : [data]))
    setCurrentAction(null)
  }

  return { handleSubmit }
}

export default useSubmit
