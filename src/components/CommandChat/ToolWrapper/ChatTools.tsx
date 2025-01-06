// import { xDSTL } from "@assets/images"
import { ChartPieIcon } from "@components/Icons"
import { CommandActionKey } from "../types"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"
import { useCommandActionChat } from "../Providers/CommandActionProvider"
import { twMerge } from "tailwind-merge"
import useNavigateTool from "./useNavigateTool"
import useListTool from "./useListTool"

export const LIST_TOOLS = [
  {
    id: 1,
    category: {
      id: 1,
      name: "DeFi Protocols",
      link: {
        url: "#",
        text: "View Agent's Portfolio",
        icon: <ChartPieIcon />,
      },
    },
    commands: [
      {
        id: 1,
        key: CommandActionKey.swap,
        command: "/swap",
        description: "Instruct the agent to perform a swap transaction.",
        earnPoint: 10,
      },
      {
        id: 2,
        key: CommandActionKey.send,
        command: "/send",
        description: "Instruct agent to send assets.",
        earnPoint: 10,
      },
      {
        id: 3,
        key: CommandActionKey.lock,
        command: "/lock",
        description: "Instruct agent to lock onto Strongbox Vaults.",
        earnPoint: 10,
      },
    ],
  },
]

const ChatTools = () => {
  const { setCurrentAction } = useCommandActionChat()
  const { setIsOpenTool } = useCommandMsgChat()
  const { tools, toolsHaveCmd, isEmpty } = useListTool()
  const { isActiveTool } = useNavigateTool(tools)

  return (
    <div className="flex flex-col gap-5">
      {isEmpty && <div className="py-1 text-mercury-700">No items found</div>}
      {toolsHaveCmd.map((tool) => (
        <div key={tool.id}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-14 text-mercury-700">{tool.category.name}</p>
            {/* <div className="flex cursor-pointer items-center gap-1 hover:opacity-80">
              {tool.category.link.icon}
              <p className="text-14 font-medium text-mercury-900">
                {tool.category.link.text}
              </p>
            </div> */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tool.commands.map((command, index) => (
              <div
                key={command.id}
                onClick={() => {
                  setCurrentAction(command.key)
                  setIsOpenTool(false)
                }}
                className={twMerge(
                  "flex cursor-pointer items-center justify-between rounded-[8px] border-1 border-mercury-100 bg-mercury-30 p-3 duration-300 hover:border-mercury-500",
                  isActiveTool(index) && "border-brown-500 bg-brown-50",
                )}
              >
                <div>
                  <div className="inline-block cursor-pointer rounded-full border-2 border-[#A2845E] bg-[#E9E3D8] px-3 py-1 text-14 font-semibold text-[#83664B]">
                    {command.command}
                  </div>
                  <p className="mt-2 line-clamp-1 text-13 font-medium text-mercury-900">
                    {command.description}
                  </p>
                </div>
                {/* <div className="flex items-center gap-1">
                  <img className="w-[15px]" src={xDSTL} />
                  <span>{command.earnPoint}</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatTools
