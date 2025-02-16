import ComingSoon from "@components/ComingSoon"
import { BoltOutlineIcon, SettingIcon } from "@components/Icons"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { isArray, uniq, uniqBy } from "lodash"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import { IAgentData } from "types/user"
import BindYourAccount from "./BindYourAccount"
import BindYourBot from "./BindYourBot"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import { AgentConfig } from "./useFetchAgentConfig"

// const TWITTER_FEATURE = [
//   {
//     label: "Auto-Reply",
//     icon: <PencilBoltIcon />,
//     enabled: true,
//   },
//   {
//     label: "Auto-Follow",
//     icon: <PhototBoltIcon />,
//     enabled: false,
//   },
//   {
//     label: "Auto-Quote",
//     icon: <RepeatIcon />,
//     enabled: false,
//   },
// ]

const POST_INTERVAL = [
  { value: "30m", label: "30 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "2h", label: "2 hours" },
  { value: "3h", label: "3 hours" },
  { value: "4h", label: "4 hours" },
  { value: "6h", label: "6 hours" },
  { value: "1d", label: "1 day" },
]

const DATA_SOURCES_BY_CATEGORY = {
  entertainment: ["cnn-news", "twitter"],
  sports: ["cnn-news", "twitter"],
  economic: ["cnn-news", "twitter", "trading-view"],
  crypto: ["coinmarketcap-news", "trading-view", "twitter"],
  btc: ["coinmarketcap-news", "trading-view", "twitter"],
  gamefi: ["coinmarketcap-news", "trading-view", "twitter"],
  political: ["reddit", "twitter", "cnn-news"],
} as any

const CATEGORIES = [
  "entertainment",
  "sports",
  "economic",
  "crypto",
  "btc",
  "political",
  "gamefi",
]

const Functions: React.FC<{
  agentData: IAgentData
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentData, agentConfigs, refetch }) => {
  const { watch, control, setValue } = useFormContext()
  const [category, setCategory] = useState<string>("crypto")
  const botWebhooks = agentData?.botWebhooks
  const dataSources = DATA_SOURCES_BY_CATEGORY[category]

  const [isShowInput, setIsShowInput] = useState<boolean>(false)
  const [isShowKeywordInput, setIsShowKeywordInput] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const xUserNameValues = JSON.parse(watch("x_user_names") || "[]")
  const xKeywordsValues = JSON.parse(watch("x_keywords") || "[]")

  const xBotData = agentConfigs?.find(
    (agent: any) => agent.key === "bindTwitterKey",
  )
  const bindTwitterValue = xBotData?.value ? JSON.parse(xBotData.value) : null
  const twitterUsername = bindTwitterValue?.info?.data?.username

  const toggleShowInput = () => {
    setIsShowInput(!isShowInput)
  }

  const toggleShowKeywordInput = () => {
    setIsShowKeywordInput(!isShowKeywordInput)
  }

  const onSelectCategory = (value: string) => {
    setCategory(value)
  }

  const removeUserFollow = (userName: string) => {
    const newUserNameValues = xUserNameValues.filter(
      (item: any) => item?.user_name !== userName,
    )
    setValue("x_user_names", JSON.stringify(newUserNameValues))
  }

  const removeKeyword = (keywordValue: string) => {
    const newKeywordsValues = xKeywordsValues.filter(
      (keyword: string) => keyword !== keywordValue,
    )
    setValue("x_keywords", JSON.stringify(newKeywordsValues))
  }

  const getUserName = (url: string) => {
    if (!url) return ""

    const match = url.match(/x\.com\/([^/]+)/)

    if (match && match[1] !== "home") {
      return match[1]
    }

    return url
  }

  const renderFollowXAccount = () => {
    const isUsernameData =
      isArray(xUserNameValues) && xUserNameValues?.length > 0
    return (
      <div className="mt-6">
        <span className="text-base-sb text-mercury-950">
          Following X Account <br />
        </span>
        <span className="text-mercury-700">
          Your agent will subscribe to and reply to posts from the following X
          account:
        </span>
        <div className="my-2 rounded-lg bg-mercury-70 p-2">
          {isUsernameData && (
            <div className="mb-2 flex flex-wrap items-center gap-1">
              {xUserNameValues.map((item: any) => {
                const userName = item?.user_name
                return (
                  <div
                    className="flex items-center gap-1 rounded-lg border-[2px] border-brown-500 p-1"
                    key={userName}
                  >
                    <span className="text-base-b text-mercury-900">
                      @{userName}
                    </span>
                    <div
                      className="cursor-pointer"
                      onClick={() => removeUserFollow(userName)}
                    >
                      <CloseFilledIcon size={20} color="#A2845E" />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {isShowInput && (
            <Input
              type="text"
              placeholder="Enter X (Twitter) profile link or username"
              className="w-1/2 max-md:w-full"
              classNames={{
                mainWrapper: "border border-mercury-400 rounded-lg",
                inputWrapper: " bg-mercury-70",
              }}
              endContent={
                <Button
                  className="h-[30px] rounded-full border border-mercury-50 bg-mercury-950 max-sm:h-[38px]"
                  onPress={() => {
                    if (!inputValue) return
                    const newXUserNames = [
                      ...xUserNameValues,
                      { user_name: inputValue },
                    ]
                    const uniqueNewXUserNames = uniqBy(
                      newXUserNames,
                      "user_name",
                    )
                    if (uniqueNewXUserNames.length > 10)
                      return toast.warning(
                        "You have reached the limit for following X accounts",
                      )
                    setValue(
                      "x_user_names",
                      JSON.stringify(uniqueNewXUserNames),
                    )
                    setInputValue("")
                    toggleShowInput()
                  }}
                >
                  <span className="text-base text-mercury-30 max-sm:text-[14px]">
                    Save
                  </span>
                </Button>
              }
              onChange={(e) => {
                const value = e.target.value
                const newValue = getUserName(value)
                setInputValue(newValue)
              }}
            />
          )}
          {!isShowInput && (
            <div
              onClick={() => toggleShowInput()}
              className="flex cursor-pointer items-center gap-1"
            >
              <TablerPlusIcon color="#A2845E" size={20} />
              <span className="text-base-md text-brown-10">
                Add account (Max. 10)
              </span>
            </div>
          )}
        </div>
      </div>
    )
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
                ai agent generate
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
                ai agent generate
              </Button>
            </div>
            <div>
              <BindYourAccount agentConfigs={agentConfigs} refetch={refetch} />
            </div>
          </div>
        }
      />

      <ComingSoon
        childrenClassName={!!twitterUsername ? "" : "opacity-50"}
        content="You need to bind an X account to use this feature"
        isOffComing={!!twitterUsername}
      >
        <div>
          <div className="mt-4 flex w-full gap-4 max-md:flex-wrap">
            <div className="flex w-[40%] flex-col justify-between rounded-[22px] border-1 border-white bg-mercury-30 p-4 max-md:w-full">
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
                  return (
                    <div className="flex items-center gap-3">
                      <Select
                        className="max-w-[50%]"
                        radius="full"
                        classNames={{
                          trigger: "!bg-mercury-100",
                        }}
                        onChange={(e) => onChange(e.target.value)}
                        selectedKeys={value ? [value] : ""}
                      >
                        {POST_INTERVAL.map((record) => (
                          <SelectItem key={record.value}>
                            {record.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )
                }}
              />
            </div>

            {/* <div className="pointer-events-none w-[60%] rounded-[22px] bg-mercury-30 p-4 opacity-50 max-md:w-full">
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
            </div> */}
          </div>
          <div className="mt-6">
            <span className="text-mercury-700">
              <span className="text-base-sb text-mercury-950">
                X Categories{" "}
              </span>
              Your agent will post, follow, quote, and more with the following
              data sources.
            </span>

            <div className="mt-4 flex items-center justify-between gap-2 max-md:flex-wrap">
              <Controller
                name="category"
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return (
                    <Select
                      className="max-w-[20%] max-md:max-w-full"
                      radius="full"
                      classNames={{
                        trigger: "!bg-mercury-100",
                      }}
                      onChange={(e) => {
                        onChange(e.target.value)
                        onSelectCategory(e.target.value)
                      }}
                      selectedKeys={value ? [value] : ""}
                    >
                      {CATEGORIES.map((value) => (
                        <SelectItem key={`${value}`}>{value}</SelectItem>
                      ))}
                    </Select>
                  )
                }}
              />

              <div className="flex w-full flex-wrap items-center gap-1 rounded-lg border border-mercury-400 bg-mercury-70 p-2">
                {dataSources.map((item: string) => {
                  return (
                    <div
                      className="rounded-lg border-[2px] border-brown-500 p-1"
                      key={item}
                    >
                      <span className="text-base-b text-mercury-900">
                        {item}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {renderFollowXAccount()}
        </div>
      </ComingSoon>

      {/* keywords */}

      <ComingSoon
        childrenClassName={
          !!isArray(xUserNameValues) && xUserNameValues?.length > 0
            ? ""
            : "opacity-50"
        }
        content="You need to follow an X account to use this feature"
        isOffComing={!!isArray(xUserNameValues) && xUserNameValues?.length > 0}
      >
        <>
          <span className="text-mercury-700">
            Your agent will reply to posts containing these keywords:
          </span>

          <div className="my-2 rounded-lg bg-mercury-70 p-2">
            {isArray(xKeywordsValues) && xKeywordsValues?.length > 0 && (
              <div className="mb-2 flex flex-wrap items-center gap-1">
                {xKeywordsValues.map((keyword: string) => {
                  return (
                    <div
                      className="flex items-center gap-1 rounded-lg border-[2px] border-[#4986C9] p-1"
                      key={keyword}
                    >
                      <span className="text-base-b text-mercury-900">
                        {keyword}
                      </span>
                      <div
                        className="cursor-pointer"
                        onClick={() => removeKeyword(keyword)}
                      >
                        <CloseFilledIcon size={20} color="#4986C9" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {isShowKeywordInput && (
              <Input
                type="text"
                placeholder="Enter keywords"
                className="w-[65%] max-md:w-full"
                classNames={{
                  mainWrapper: "border border-mercury-400 rounded-lg",
                  inputWrapper: " bg-mercury-70",
                }}
                endContent={
                  <Button
                    className="h-[30px] rounded-full border border-mercury-50 bg-mercury-950 max-sm:h-[38px]"
                    onPress={() => {
                      if (!inputValue) return
                      const newXKeywords = [...xKeywordsValues, inputValue]
                      const uniqueNewXKeywords = uniq(newXKeywords)
                      if (uniqueNewXKeywords.length > 10)
                        return toast.warning(
                          "You have reached the limit for keywords",
                        )
                      setValue("x_keywords", JSON.stringify(uniqueNewXKeywords))
                      setInputValue("")
                      toggleShowKeywordInput()
                    }}
                  >
                    <span className="text-base text-mercury-30 max-sm:text-[14px]">
                      Save
                    </span>
                  </Button>
                }
                onChange={(e) => {
                  const value = e.target.value
                  setInputValue(value)
                }}
              />
            )}
            {!isShowKeywordInput && (
              <div
                onClick={() => toggleShowKeywordInput()}
                className="flex cursor-pointer items-center gap-1"
              >
                <SettingIcon />
                <span className="text-base-md text-brown-10">
                  Add Following keywords (Max. 10)
                </span>
              </div>
            )}
          </div>
        </>
      </ComingSoon>

      <div className="flex justify-end">
        <span className="text-[13px] italic text-mercury-700">
          Note: The agent will reply to all posts if no keywords are included.
        </span>
      </div>
    </div>
  )
}

export default Functions
