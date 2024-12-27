import { BoltOutlineIcon } from "@components/Icons"
import {
  PencilBoltIcon,
  PhototBoltIcon,
  RepeatIcon,
} from "@components/Icons/AgentDetailIcon"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, Divider, Select, SelectItem, Switch } from "@nextui-org/react"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { IAgentData } from "types/user"
import BindYourAccount from "./BindYourAccount"
import BindYourBot from "./BindYourBot"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import { AgentConfig } from "./useFetchAgentConfig"

const TWITTER_FEATURE = [
  {
    label: "Auto-Reply",
    icon: <PencilBoltIcon />,
    enabled: true,
  },
  {
    label: "Auto-Follow",
    icon: <PhototBoltIcon />,
    enabled: false,
  },
  {
    label: "Auto-Quote",
    icon: <RepeatIcon />,
    enabled: false,
  },
]

const POST_INTERVAL = [
  { vlaue: "30m", label: "30 minutes" },
  { vlaue: "1h", label: "1 hour" },
  { vlaue: "2h", label: "2 hours" },
  { vlaue: "3h", label: "3 hours" },
  { vlaue: "4h", label: "4 hours" },
  { vlaue: "6h", label: "6 hours" },
  { vlaue: "1d", label: "1 day" },
]

const DATA_SOURCES_BY_CATEGORY = {
  entertainment: ["cnn-news", "twitter"],
  sports: ["cnn-news", "twitter"],
  economic: ["cnn-news", "twitter", "trading-view"],
  crypto: ["coinmarketcap-news", "trading-view", "twitter"],
  btc: ["coinmarketcap-news", "trading-view", "twitter"],
} as any

const CATEGORIES = ["entertainment", "sports", "economic", "crypto", "btc"]

const Functions: React.FC<{
  agentData: IAgentData
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentData, agentConfigs, refetch }) => {
  const { control } = useFormContext()
  const [category, setCategory] = useState<string>("crypto")
  const botWebhooks = agentData?.botWebhooks
  const dataSources = DATA_SOURCES_BY_CATEGORY[category]

  const onSelectCategory = (value: string) => {
    setCategory(value)
  }

  return (
    <div className="">
      <CategoryLabel
        text="Autonomous AI Agent"
        icon={<BoltOutlineIcon color="#A2845E" />}
      />

      <FieldLabel
        text={
          <div className="my-6 flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <TelegramOutlineIcon size={24} />
              <span className="text-base-sb text-mercury-950">
                Autonomous Bot on Telegram Group
              </span>
              <Button className="text-base-14 h-auto rounded-full bg-brown-500 py-[2px] font-bold uppercase text-mercury-30 max-sm:text-12">
                ai gent generate
              </Button>
            </div>
            <div>
              <BindYourBot botWebhooks={botWebhooks} refetch={refetch} />
            </div>
          </div>
        }
      />
      <Divider className="my-6" />
      <FieldLabel
        text={
          <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <TwitterIcon size={20} />
              <span className="text-base-sb text-mercury-950">
                Automated on X (Twitter)
              </span>
              <Button className="text-base-14 h-auto rounded-full bg-brown-500 py-[2px] font-bold uppercase text-mercury-30 max-sm:text-12">
                ai gent generate
              </Button>
            </div>
            <div>
              <BindYourAccount agentConfigs={agentConfigs} refetch={refetch} />
            </div>
          </div>
        }
      />

      <div className="mt-4 flex w-full gap-4">
        <div className="flex w-[40%] flex-col justify-between rounded-[22px] border-1 border-white bg-mercury-30 p-4">
          <div>
            <span className="text-base-sb text-mercury-950">
              Post Interval:
            </span>
            <br />
            <span className="text-mercury-700">
              Choose how often to post tweets.
            </span>
          </div>

          <Controller
            name="post_interval"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              console.log("🚀 ~ value:", value)
              return (
                <div className="flex items-center gap-3">
                  <Select
                    className="max-w-[50%]"
                    defaultSelectedKeys={[value || "30m"]}
                    radius="full"
                    classNames={{
                      trigger: "!bg-mercury-100",
                    }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    {POST_INTERVAL.map((record) => (
                      <SelectItem key={record.vlaue}>{record.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              )
            }}
          />
        </div>

        <div className="pointer-events-none w-[60%] rounded-[22px] bg-mercury-30 p-4 opacity-50">
          <span className="text-base-sb text-mercury-950">Functions</span>
          <div className="mt-4 flex flex-wrap justify-between gap-y-6">
            {TWITTER_FEATURE.map((item, index) => {
              return (
                <div
                  className="flex min-w-[190px] items-center justify-between max-sm:w-full"
                  key={index}
                >
                  <div className="flex items-center gap-1">
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
        </div>
      </div>

      <div className="mt-6">
        <span className="text-mercury-700">
          <span className="text-base-sb text-mercury-950">X Categories </span>
          Your agent will post, follow, quote, and more with the following data
          sources.
        </span>

        <div className="mt-4 flex items-center justify-between gap-2">
          <Controller
            name="category"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <Select
                  defaultSelectedKeys={[value || "crypto"]}
                  className="max-w-[20%]"
                  radius="full"
                  classNames={{
                    trigger: "!bg-mercury-100",
                  }}
                  onChange={(e) => {
                    onChange(e.target.value)
                    onSelectCategory(e.target.value)
                  }}
                >
                  {CATEGORIES.map((value) => (
                    <SelectItem key={`${value}`}>{value}</SelectItem>
                  ))}
                </Select>
              )
            }}
          />

          <div className="flex w-full items-center gap-1 rounded-lg border border-mercury-400 bg-mercury-70 p-2">
            {dataSources.map((item: string) => {
              return (
                <div
                  className="rounded-lg border-[2px] border-brown-500 p-1"
                  key={item}
                >
                  <span className="text-base-b text-mercury-900">{item}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Functions
