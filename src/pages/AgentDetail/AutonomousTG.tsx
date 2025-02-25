import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { Button, Input } from "@nextui-org/react"
import { isArray, uniqBy } from "lodash"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import { IAgentData } from "types/user"
import BindYourBot from "./BindYourBot"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import { AgentConfig } from "./useFetchAgentConfig"

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

const AutonomousTG: React.FC<{
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
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-base-sb text-mercury-950">
            Following X Account
          </span>
        </div>

        <span className="text-mercury-700">
          Your agent will follow and reply to this X account:
        </span>

        <div className="my-2 flex items-center justify-between rounded-lg bg-mercury-70 p-2 max-md:flex-col max-md:items-start">
          <div className="mb-2 flex w-1/2 flex-wrap items-center gap-1">
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
    )
  }

  return (
    <div className="">
      <CategoryLabel
        text="Autonomous Bot on Telegram Group"
        icon={<TelegramOutlineIcon size={26} color="#A2845E" />}
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
    </div>
  )
}

export default AutonomousTG
