import { useEffect, useState } from "react"
import { LIST_TOOLS } from "./ChatTools"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"

const useListTool = () => {
  const [tools, setTools] = useState(LIST_TOOLS)
  const { message } = useCommandMsgChat()

  useEffect(() => {
    if (message.startsWith("/")) {
      const toolFilter = LIST_TOOLS.map((tool) => {
        const toolCmd = tool.commands.filter((command) =>
          command.command.toLowerCase().includes(message.toLowerCase()),
        )
        return {
          ...tool,
          commands: toolCmd,
        }
      })
      setTools(toolFilter)
    }
  }, [message])

  const toolsHaveCmd = tools.filter((item) => item.commands.length > 0)
  const isEmpty = toolsHaveCmd.length === 0

  return {
    tools,
    toolsHaveCmd,
    isEmpty,
  }
}

export default useListTool
