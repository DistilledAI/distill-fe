import { CircleCheckFilled } from "@components/Icons"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import {
  CodesanboxIcon,
  PublishIcon,
  TelegramIcon,
} from "@components/Icons/RewardsIcons"
import { TwitterIcon } from "@components/Icons/Twitter"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { XDSTL_TASK_KEY } from "."

const AutonomousAIAgent: React.FC<{ listActionTaskSuccess: any }> = ({
  listActionTaskSuccess,
}) => {
  const navigate = useNavigate()

  const MISSION_LIST = [
    {
      label: (
        <>
          <PublishIcon />
          <span className="text-base-sb text-mercury-950">Publish Agent</span>
        </>
      ),
      desc: "Go to My Agents, set your agents’ behaviors, and publish them on the Marketplace.",
      point: "+300 xDSTL",
      key: XDSTL_TASK_KEY.PUBLISH_BOT,
    },
    {
      label: (
        <>
          <TelegramIcon />
          <span className="text-base-sb text-mercury-950">
            Start your Telegram Autonomous Bot
          </span>
        </>
      ),
      desc: "Bind your AI Agent to the Telegram bot by following our step-by-step instructions.",
      point: "+100 xDSTL",
      key: XDSTL_TASK_KEY.BIND_TELE_FOR_BOT,
    },
    {
      label: (
        <>
          <TwitterIcon size={16} />
          <span className="text-base-sb text-mercury-950">
            Start your Twitter Autonomous Account
          </span>
        </>
      ),
      desc: "Bind your AI Agent to the Twitter account by following our step-by-step instructions.",
      point: "+100 xDSTL",
      key: XDSTL_TASK_KEY.BIND_X_FOR_BOT,
    },
    {
      label: (
        <>
          <CodesanboxIcon />
          <span className="text-base-sb text-mercury-950">
            Tokenize your Agent
          </span>
        </>
      ),
      desc: "Try the Agents.land Launchpad. Graduated tokens will be listed on Raydium and OraiDEX with DAO governance.",
      point: "PROMOTED",
      key: XDSTL_TASK_KEY.TOKENIZE_AGENT,
    },
  ]

  const handleAction = (actionKey: string) => {
    if (actionKey === XDSTL_TASK_KEY.TOKENIZE_AGENT) {
      return
    }

    navigate(PATH_NAMES.MY_AGENTS)
  }

  const renderAction = (actionKey: string) => {
    const isClaimed = listActionTaskSuccess?.includes(actionKey)

    if (isClaimed)
      return (
        <div className="flex items-center gap-1">
          <CircleCheckFilled size={24} />
          <span className="text-base-14-b text-green-500">Claimed</span>
        </div>
      )

    if (actionKey === XDSTL_TASK_KEY.TOKENIZE_AGENT) {
      return (
        <Button
          className="h-[34px] bg-mercury-950 px-6"
          radius="full"
          onPress={() => handleAction(actionKey)}
        >
          <span className="text-base-14 text-mercury-30">Try</span>
        </Button>
      )
    }

    return (
      <Button
        className="h-[34px] bg-mercury-950 px-6"
        radius="full"
        onPress={() => handleAction(actionKey)}
      >
        <span className="text-base-14 text-mercury-30">Go to Earn</span>
      </Button>
    )
  }

  return (
    <div className="w-full">
      {MISSION_LIST.map((item: any) => {
        return (
          <div
            className="flex items-center justify-between gap-2 border-b-1 border-mercury-100 px-4 py-[14px] pr-0 max-md:px-0"
            key={item.key}
          >
            <div className="">
              <div className="flex items-center gap-2">{item.label}</div>
              <span className="text-base text-mercury-700">{item.desc}</span>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex min-w-[44px] items-center justify-center rounded-full bg-brown-500 px-2">
                  <span className="text-[13px] font-bold text-white">
                    {item.point}
                  </span>
                </div>

                {item.repeatable && (
                  <div className="flex items-center gap-1">
                    <RefreshIcon />
                    <span className="text-base-14 text-mercury-950">
                      Repeatable:
                    </span>
                    <span className="text-base-14-b text-mercury-950">
                      {item.repeatable}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>{renderAction(item.key)}</div>
          </div>
        )
      })}
    </div>
  )
}
export default AutonomousAIAgent
