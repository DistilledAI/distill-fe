import { lazy, Suspense } from "react"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"
const ChatTools = lazy(() => import("./ChatTools"))

const ToolWrapper = () => {
  const { isOpenTool } = useCommandMsgChat()

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
