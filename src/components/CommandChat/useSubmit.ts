import {
  ICmdMessage,
  useCmdMessageList,
} from "@pages/MyPrivateRoom/CmdMessageProvider"
import { useCommandMsgChat } from "./Providers/CommandMessageProvider"
import { makeId } from "@utils/index"
import { useCommandActionChat } from "./Providers/CommandActionProvider"
import { CommandActionKey, InfoAction } from "./types"
import { match } from "ts-pattern"
import { toast } from "react-toastify"

const useSubmit = () => {
  const { infoAction } = useCommandMsgChat()
  const { setCurrentAction } = useCommandActionChat()
  const { setMessages } = useCmdMessageList()

  const isPassRuleByAction = (infoAction: InfoAction) => {
    const cmdKey = infoAction?.key
    const data = infoAction?.data

    return match(cmdKey)
      .with(CommandActionKey.lock, () => {
        if (!data?.lock?.amount) {
          toast.warning("Please enter amount")
          return false
        }
        return true
      })
      .with(CommandActionKey.swap, () => {
        if (!data?.swap?.amount) {
          toast.warning("Please enter amount")
          return false
        }
        return true
      })
      .otherwise(() => true)
  }

  const getDataMsgByAction = (infoAction: InfoAction): ICmdMessage => {
    const cmdKey = infoAction?.key
    const data = infoAction?.data

    return match(cmdKey)
      .returnType<ICmdMessage>()
      .with(CommandActionKey.lock, () => ({
        id: makeId(),
        lock: {
          tokenAddress: data?.lock?.fromToken as string,
          amount: data?.lock?.amount as string,
          duration: data?.lock?.duration as number,
        },
        swap: null,
      }))
      .with(CommandActionKey.swap, () => ({
        id: makeId(),
        swap: {
          fromToken: data?.swap?.fromToken as string,
          amount: data?.swap?.amount as string,
          toToken: data?.swap?.toToken as string,
        },
        lock: null,
      }))
      .otherwise(() => ({ id: makeId(), lock: null, swap: null }))
  }

  const handleSubmit = () => {
    if (!infoAction) return
    if (!isPassRuleByAction(infoAction)) return
    const data: ICmdMessage = getDataMsgByAction(infoAction)
    setMessages((prev) => (prev ? prev.concat([data]) : [data]))
    setCurrentAction(null)
  }

  return { handleSubmit }
}

export default useSubmit
