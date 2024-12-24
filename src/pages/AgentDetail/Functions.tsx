import {
  PencilBoltIcon,
  PhototBoltIcon,
  RepeatIcon,
} from "@components/Icons/AgentDetailIcon"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Button, Switch } from "@nextui-org/react"
import { IAgentData } from "types/user"
import BindYourAccount from "./BindYourAccount"
import BindYourBot from "./BindYourBot"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import { AgentConfig } from "./useFetchAgentConfig"

const TWITTER_FEATURE = [
  {
    label: "Auto-Post",
    icon: <PencilBoltIcon />,
    enabled: true,
  },
  {
    label: "Auto-post Image",
    icon: <PhototBoltIcon />,
    enabled: false,
  },
  {
    label: "Auto-Repost",
    icon: <RepeatIcon />,
    enabled: false,
  },
]

const Functions: React.FC<{
  agentData: IAgentData
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentData, agentConfigs, refetch }) => {
  const botWebhooks = agentData?.botWebhooks

  const renderFeature = () => {
    return (
      <div className="pointer-events-none mt-5 flex w-full flex-wrap justify-between gap-5 opacity-50">
        {TWITTER_FEATURE.map((item, index) => {
          return (
            <div
              className="min-w-[240px] rounded-[22px] bg-mercury-30 p-4 max-sm:w-full"
              key={index}
            >
              <div className="mb-4 flex items-center gap-2">
                {item.icon}
                <span className="text-base-md max-sm:text-15">
                  {item.label}
                </span>
              </div>
              <Switch
                isSelected={item.enabled}
                aria-label="Automatic updates"
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="">
      <CategoryLabel
        text="Functions"
        icon={<StarUserIconOutline color="#A2845E" />}
      />

      <FieldLabel
        text={
          <div className="my-6 flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <TelegramOutlineIcon />
              <span className="text-base-sb text-mercury-950">
                Autonomous Bot on Telegram Group
              </span>
              <Button className="text-base-14 h-auto rounded-full bg-brown-500 py-[2px] font-bold uppercase text-mercury-30 max-sm:text-12">
                ai agent generate
              </Button>
            </div>
            <div>
              <BindYourBot botWebhooks={botWebhooks} refetch={refetch} />
            </div>
          </div>
        }
      />

      <FieldLabel
        text={
          <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <TwitterIcon size={20} />
              <span className="text-base-sb text-mercury-950">
                Automate Posting on Twitter
              </span>
              <Button className="text-base-14 h-auto rounded-full bg-brown-500 py-[2px] font-bold uppercase text-mercury-30 max-sm:text-12">
                ai agent generate
              </Button>
            </div>
            <div>
              <BindYourAccount agentConfigs={agentConfigs} refetch={refetch} />
            </div>
          </div>
        }
      />
      {renderFeature()}
    </div>
  )
}

export default Functions
