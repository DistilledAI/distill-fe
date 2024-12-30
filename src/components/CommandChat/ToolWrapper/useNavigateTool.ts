import { useEffect, useState } from "react"
import { LIST_TOOLS } from "./ChatTools"
import { useCommandActionChat } from "../Providers/CommandActionProvider"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"
import { match } from "ts-pattern"

const useNavigateTool = (tools: typeof LIST_TOOLS) => {
  const commands = tools.flatMap((tool) => tool.commands)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)
  const { setCurrentAction } = useCommandActionChat()
  const { setIsOpenTool } = useCommandMsgChat()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      match(e.key)
        .with("ArrowDown", () =>
          setSelectedCommandIndex((prev) =>
            prev < commands.length - 1 ? prev + 1 : 0,
          ),
        )
        .with("ArrowUp", () =>
          setSelectedCommandIndex((prev) =>
            prev > 0 ? prev - 1 : commands.length - 1,
          ),
        )
        .with("Escape", () => setIsOpenTool(false))
        .with("Enter", () => {
          const selectedCommand = commands[selectedCommandIndex]
          setCurrentAction(selectedCommand.key)
          setIsOpenTool(false)
        })
        .run()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [commands, selectedCommandIndex])

  const isActiveTool = (index: number) => index === selectedCommandIndex

  return { selectedCommandIndex, isActiveTool }
}

export default useNavigateTool
