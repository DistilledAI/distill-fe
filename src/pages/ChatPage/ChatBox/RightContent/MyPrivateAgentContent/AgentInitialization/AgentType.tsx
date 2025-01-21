import { maxAvatar } from "@assets/images"
import {
  DefaiAgentTypeIcon,
  DefaultAgentTypeIcon,
} from "@components/Icons/BrainAIIcon"
import { UserHexagonIcon } from "@components/Icons/UserIcon"
import { Button, Checkbox } from "@nextui-org/react"
import CategoryLabel from "@pages/AgentDetail/CategoryLabel"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

const AGENT_TYPE_KEY = {
  DEFAULT: "DEFAULT",
  DEFAI: "DEFAI",
}

const AGENT_TYPE_OPTIONS = [
  {
    title: "Default Agent",
    desc: [
      "AI Agent trained on your private data",
      "Customizable behaviors",
      "Automation for X and Telegram activities",
    ],
    icon: <DefaultAgentTypeIcon />,
    key: AGENT_TYPE_KEY.DEFAULT,
  },
  {
    title: "DeFAI Agent",
    desc: [
      "Automation DeFi activities",
      "All Default Agent utilities included",
      "Creator does not control the agent wallet.",
    ],
    icon: <DefaiAgentTypeIcon />,
    key: AGENT_TYPE_KEY.DEFAI,
  },
]

const AgentType: React.FC = () => {
  const [agentTypeSelected, setAgentTypeSelected] = useState<string>(
    AGENT_TYPE_KEY.DEFAULT,
  )

  return (
    <div>
      <CategoryLabel text="Agent Type" icon={<UserHexagonIcon />} />
      <div className="mb-2 mt-4 flex items-center gap-3">
        {AGENT_TYPE_OPTIONS.map((item: any) => {
          const isSelected = agentTypeSelected === item.key
          const isDefaiType = item.key === AGENT_TYPE_KEY.DEFAI

          return (
            <div
              className="flex h-[200px] items-start justify-between gap-3 rounded-[14px] border-[2px] border-transparent bg-mercury-30 p-4 hover:cursor-pointer aria-selected:border-brown-500"
              key={item.key}
              aria-selected={isSelected}
              onClick={() => setAgentTypeSelected(item.key)}
            >
              {item.icon}
              <div>
                <span className="text-base-b text-mercury-900">
                  {item.title}
                </span>

                <div className="mt-2">
                  {item.desc.map((record: any, index: number) => {
                    return (
                      <div key={index}>
                        <span
                          className={twMerge(
                            "text-14-base text-mercury-700",
                            isDefaiType &&
                              index === 0 &&
                              "font-semibold text-[#7EB000]",
                          )}
                        >
                          {record}
                        </span>
                      </div>
                    )
                  })}
                </div>
                {isDefaiType && (
                  <Button className="mt-2 h-8 rounded-full bg-mercury-950">
                    <div className="flex items-center gap-1">
                      <img
                        src={maxAvatar}
                        width={16}
                        className="rounded-full"
                      />
                      <span className="font-medium text-[#BCAA88]">
                        <span className="font-bold">5,000 </span>
                        Max
                      </span>
                      <span className="text-14-base-b text-mercury-30">
                        {" "}
                        Play Now*
                      </span>
                    </div>
                  </Button>
                )}
              </div>

              <Checkbox radius="full" isSelected={isSelected} />
            </div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <span className="text-[13px] italic text-mercury-700">
          *Note: You can pay later to activate the DeFAI type.
        </span>
      </div>
    </div>
  )
}
export default AgentType
