import { lazy, Suspense, useEffect } from "react"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"
import { useCommandActionChat } from "../Providers/CommandActionProvider"
import { CommandActionKey } from "../types"
import {
  LOCK_TIME_OPTIONS,
  TokenKey,
  TOKENS,
} from "@pages/MyPrivateRoom/DexActionCore/constants"
const ChatTools = lazy(() => import("./ChatTools"))

const ToolWrapper = () => {
  const { currentAction } = useCommandActionChat()
  const { isOpenTool, setInfoAction, setMessage } = useCommandMsgChat()

  const initDataTool = (commandKey: CommandActionKey) => {
    switch (commandKey) {
      case CommandActionKey.lock:
        return setInfoAction({
          key: commandKey,
          data: {
            lock: {
              fromToken: TOKENS[TokenKey.MAX].address,
              amount: "",
              duration: LOCK_TIME_OPTIONS[0].value,
            },
          },
        })
      case CommandActionKey.swap:
        return setInfoAction({
          key: commandKey,
          data: {
            swap: {
              fromToken: TOKENS[TokenKey.MAX].address,
              toToken: TOKENS[TokenKey.SOLANA].address,
              amount: "",
            },
          },
        })

      default:
        break
    }
  }

  useEffect(() => {
    if (currentAction) {
      initDataTool(currentAction)
      setMessage("")
    } else {
      setInfoAction(null)
    }
  }, [currentAction])

  if (!isOpenTool) return null

  return (
    <div
      style={{
        boxShadow:
          "0px 16px 40px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(24, 24, 25, 0.05)",
      }}
      className="absolute bottom-[calc(100%+10px)] left-0 w-full rounded-[22px] border-mercury-100 bg-white p-4"
    >
      <div className="max-h-[300px] w-full overflow-y-auto rounded scrollbar-hide">
        <Suspense>
          <ChatTools />
        </Suspense>
      </div>
    </div>
  )
}

export default ToolWrapper
