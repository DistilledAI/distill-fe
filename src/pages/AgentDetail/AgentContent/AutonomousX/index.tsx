import ComingSoon from "@components/ComingSoon"
import { SettingIcon } from "@components/Icons"
// import { WorldIcon } from "@components/Icons/AgentDetailIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import {
  PlayFilledIcon,
  StopFilledIcon,
} from "@components/Icons/SocialLinkIcon"
import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, Input, Select, SelectItem, Switch } from "@nextui-org/react"
import RepliesDashboard from "@pages/AgentDetail/RepliesDashboard"
import { isArray, uniq, uniqBy } from "lodash"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import BindYourAccount from "../../BindXAccount/BindYourAccount"
import CategoryLabel from "../../CategoryLabel"
import { AgentConfig } from "../../useFetchAgentConfig"

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

const AutonomousX: React.FC<{
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentConfigs, refetch }) => {
  const { watch, control, setValue } = useFormContext()
  const [category, setCategory] = useState<string>("crypto")
  const dataSources = DATA_SOURCES_BY_CATEGORY[category]

  const [isShowInput, setIsShowInput] = useState<boolean>(false)
  const [isShowKeywordInput, setIsShowKeywordInput] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const xUserNameValues = JSON.parse(watch("x_user_names") || "[]")
  const xKeywordsValues = JSON.parse(watch("x_keywords") || "[]")
  const autonomousReply = watch("autonomous_reply")
  const xBotData = agentConfigs?.find(
    (agent: any) => agent.key === "bindTwitterKey",
  )
  const categoryInit = agentConfigs?.find(
    (agent: any) => agent.key === "category",
  )

  useEffect(() => {
    if (categoryInit) setCategory(categoryInit.value)
  }, [categoryInit])

  const bindTwitterValue = xBotData?.value ? JSON.parse(xBotData.value) : null
  const twitterUsername =
    bindTwitterValue?.info?.data?.username || bindTwitterValue?.name
  const isUsernameData = isArray(xUserNameValues) && xUserNameValues?.length > 0

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
    setValue("x_user_names", JSON.stringify(newUserNameValues), {
      shouldDirty: true,
    })
  }

  const removeKeyword = (keywordValue: string) => {
    const newKeywordsValues = xKeywordsValues.filter(
      (keyword: string) => keyword !== keywordValue,
    )
    setValue("x_keywords", JSON.stringify(newKeywordsValues), {
      shouldDirty: true,
    })
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
    return (
      <div className="mt-2">
        <div className="h-7 w-4 border-b-1 border-l-1 border-dashed border-mercury-600" />
        <div className="-mt-3 ml-6">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-base-sb text-mercury-950">
              Following X Accounts
            </span>
          </div>

          <div className="h-8 w-4 border-b-1 border-l-1 border-dashed border-mercury-600" />
          <div className="h-14 w-4 border-b-1 border-l-1 border-dashed border-mercury-600" />

          <div className="my-2 -mt-[84px] ml-6 flex items-center justify-between rounded-lg bg-mercury-70 px-2 py-3 max-md:flex-col max-md:items-start">
            <div className="flex w-1/2 flex-wrap items-center gap-1">
              {isUsernameData &&
                xUserNameValues.map((item: any) => {
                  const userName = item?.user_name
                  return (
                    <div
                      className="flex items-center gap-1 rounded-lg border-[2px] border-brown-500 bg-brown-100 p-1"
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

            <div className="w-1/2 max-md:w-full">
              {isShowInput && (
                <Input
                  type="text"
                  placeholder="Enter X (Twitter) profile link or username"
                  className="w-full"
                  classNames={{
                    mainWrapper: "border border-mercury-400 rounded-lg ",
                    inputWrapper: " bg-mercury-70 ",
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
                          { shouldDirty: true },
                        )
                        setInputValue("")
                        toggleShowInput()
                      }}
                    >
                      <span className="text-base text-mercury-30 max-sm:text-[14px]">
                        Add
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
                  className="flex cursor-pointer items-center justify-end gap-1"
                >
                  <TablerPlusIcon color="#A2845E" size={20} />
                  <span className="text-base-md text-brown-10">
                    Add account (Max. 10)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AutonomousMode = () => {
    const onChangeStatus = (status: string | number) => {
      setValue("autonomous_reply", status, { shouldDirty: true })
    }

    if (autonomousReply === "1") {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => onChangeStatus("0")}
        >
          <StopFilledIcon />
          <span className="text-base-b text-brown-600">
            Stop Autonomous Mode
          </span>
        </div>
      )
    }

    return (
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => onChangeStatus("1")}
      >
        <PlayFilledIcon />
        <span className="text-base-b text-brown-600">
          Start Autonomous Mode
        </span>
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <CategoryLabel
          text="Autonomous X Account"
          icon={<TwitterIcon size={24} color="#A2845E" />}
        />
        {/* <div className="flex items-center gap-1 rounded-full bg-[rgba(0,122,255,0.15)] px-2">
          <WorldIcon size={20} color="#007AFF" />
          <span className="font-medium uppercase text-[#007AFF] max-md:text-14">
            public
          </span>
        </div> */}
      </div>
      {twitterUsername && (
        <div className="mt-3 flex justify-end">
          <RepliesDashboard isDisabled={!twitterUsername} />
        </div>
      )}
      <div className="mb-4 mt-4 flex items-center justify-between rounded-lg bg-brown-50 p-4 max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-2">
        <BindYourAccount agentConfigs={agentConfigs} refetch={refetch} />
        {twitterUsername && <AutonomousMode />}
      </div>
      <span className="text-base-sb text-mercury-950">Posting Setup</span>
      <ComingSoon
        childrenClassName={twitterUsername ? "" : "opacity-50"}
        content="You need to bind an X account to use this feature"
        isOffComing={!!twitterUsername}
      >
        <div className="mb-4 mt-4 rounded-[22px] border-1 border-mercury-100 bg-mercury-30 p-4">
          <div className="mb-4 flex w-full justify-between border-b border-dashed border-mercury-400 pb-4 max-md:flex-col max-md:gap-2">
            <div>
              <span className="text-base-sb text-mercury-950">
                Post Interval:
              </span>
              <br />
              <span className="text-mercury-700">
                Set tweet posting frequency
              </span>
            </div>

            <Controller
              name="post_interval"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-[20%] max-md:w-full">
                    <Select
                      aria-labelledby="post interval"
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

          <div className="">
            <div>
              <span className="text-base-sb text-mercury-950">
                Following Categories:
              </span>
              <br />
              <span className="text-mercury-700">
                Your agent will post, follow, and quote from these sources:
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-mercury-70 p-2 max-md:flex-wrap">
              <div className="flex w-full flex-wrap items-center gap-1">
                {dataSources.map((item: string) => {
                  return (
                    <div
                      className="rounded-lg border-[2px] border-mercury-600 p-1"
                      key={item}
                    >
                      <span className="text-base-b text-mercury-900">
                        {item}
                      </span>
                    </div>
                  )
                })}
              </div>

              <Controller
                name="category"
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return (
                    <Select
                      aria-labelledby="category"
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
            </div>
          </div>
        </div>
      </ComingSoon>

      <span className="text-base-sb text-mercury-950">
        Engage Configuration
      </span>

      <div className="mt-4 rounded-[22px] border-1 border-mercury-100 bg-mercury-30 p-4">
        <div className="mb-4 flex w-full items-center justify-between border-b border-dashed border-mercury-400 pb-4">
          <div className="flex flex-col">
            <span className="text-base-sb text-mercury-950">
              Auto-Reply to Mentions:
            </span>
            <span className="text-[15px] font-medium text-mercury-700">
              Allows your agent to automatically reply to users who mention it
              anywhere on X.
            </span>
          </div>
          <Switch isSelected />
        </div>

        <ComingSoon
          childrenClassName={twitterUsername ? "" : "opacity-50"}
          content="You need to bind an X account to use this feature"
          isOffComing={!!twitterUsername}
        >
          <>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base-sb text-mercury-950">
                  Auto-Reply to Posts:
                </span>
                <span className="text-[15px] font-medium text-mercury-700">
                  Continuously follows, quotes, and replies to posts from
                  followed accounts (minimum 5-min interval).
                </span>
              </div>
              <Switch isSelected />
            </div>
            {renderFollowXAccount()}
          </>
        </ComingSoon>

        <ComingSoon
          childrenClassName={
            !!isUsernameData && !!twitterUsername ? "" : "opacity-50"
          }
          content="You need to follow an X account to use this feature"
          isOffComing={!!isUsernameData && !!twitterUsername}
        >
          <div className="ml-12">
            <span className="text-[15px] font-medium text-mercury-700">
              Your agents will reply & quote posts that contain these keywords
              (from followed accounts):
            </span>

            <div className="my-2 flex items-center justify-between rounded-lg bg-mercury-70 p-2 max-md:flex-col max-md:items-start">
              <div className="flex w-1/2 flex-wrap items-center gap-1">
                {isArray(xKeywordsValues) &&
                  xKeywordsValues?.length > 0 &&
                  xKeywordsValues.map((keyword: string) => {
                    return (
                      <div
                        className="flex items-center gap-1 rounded-lg border-[2px] border-[#4986C9] bg-[#D5E9FF] p-1"
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

              <div className="w-1/2 max-md:w-full">
                {isShowKeywordInput && (
                  <Input
                    type="text"
                    placeholder="Enter keywords"
                    className="w-full"
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
                          setValue(
                            "x_keywords",
                            JSON.stringify(uniqueNewXKeywords),
                            { shouldDirty: true },
                          )
                          setInputValue("")
                          toggleShowKeywordInput()
                        }}
                      >
                        <span className="text-base text-mercury-30 max-sm:text-[14px]">
                          Add
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
                    className="flex cursor-pointer items-center justify-end gap-1"
                  >
                    <SettingIcon />
                    <span className="text-base-md text-brown-10">
                      Add Following keywords (Max. 10)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ComingSoon>
      </div>

      <div className="mt-2 flex justify-end">
        <span className="text-[13px] italic text-mercury-700">
          Note: The agent will reply to all posts if no keywords are included.
        </span>
      </div>
    </div>
  )
}

export default AutonomousX
