import { CircleCheckFilled } from "@components/Icons"
import {
  BugReportIcon,
  GiftIcon,
  MessageCircleIcon,
} from "@components/Icons/RewardsIcons"
import { TwitterIcon } from "@components/Icons/Twitter"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { checkConnectDistilledX, checkRePostDistilledX } from "services/agent"
import { XDSTL_TASK_KEY } from "."

const WelcomeOnboard: React.FC<{
  listActionTaskSuccess: any
  callGetTaskSuccess: any
  listTaskSuccess: any[]
}> = ({ listActionTaskSuccess, callGetTaskSuccess, listTaskSuccess }) => {
  const navigate = useNavigate()
  const twitterAuthorizeLink = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=V2wzbzlWcDFWZGg2U0l5VkZqRHg6MTpjaQ&redirect_uri=${window.location.origin}/rewards&scope=follows.read+follows.write+offline.access+users.read+tweet.read+tweet.write+like.read+like.write&state=optionalState123&code_challenge=codeChallenge&code_challenge_method=plain`

  const MISSION_LIST = [
    {
      label: (
        <>
          <GiftIcon />
          <span className="text-base-sb text-mercury-950">Welcome Gift</span>
        </>
      ),
      desc: "Log in to Mesh",
      point: "+200 xDSTL",
      key: XDSTL_TASK_KEY.LOGIN,
    },
    {
      label: (
        <>
          <MessageCircleIcon />
          <span className="text-base-sb text-mercury-950">
            Chat with Published Agents
          </span>
        </>
      ),
      desc: "Explore AI Agents on the Marketplace, select an agent, and chat with the ones you’re interested in.",
      point: "+1 xDSTL",
      key: XDSTL_TASK_KEY.CHAT_WITH_AGENT,
      repeatable: 500,
    },
    {
      label: (
        <>
          <BugReportIcon />
          <span className="text-base-sb text-mercury-950">
            Agent Bug Report
          </span>
        </>
      ),
      desc: "Found a logic error or factual inaccuracy? Let us know!",
      point: "+10 xDSTL (Weekly Distributed)",
      key: XDSTL_TASK_KEY.BUG_REPORT,
      repeatable: 20,
    },
    {
      label: (
        <>
          <TwitterIcon size={16} />
          <span className="text-base-sb text-mercury-950">
            Follow Distilled AI
          </span>
        </>
      ),
      desc: (
        <span>
          Follow{" "}
          <a
            href="https://x.com/distilled_AI"
            target="_blank"
            className="text-base text-[#32ADE6]"
          >
            @distilled_AI{" "}
          </a>
          on Twitter for updates and news.
        </span>
      ),
      point: "+10 xDSTL",
      key: XDSTL_TASK_KEY.CONNECT_X,
    },
    {
      label: (
        <>
          <TwitterIcon size={16} />
          <span className="text-base-sb text-mercury-950">
            Repost on Twitter
          </span>
        </>
      ),
      desc: (
        <span>
          Share posts from
          <a
            href="https://x.com/distilled_AI"
            target="_blank"
            className="text-base text-[#32ADE6]"
          >
            @distilled_AI{" "}
          </a>
          with <span className="text-base text-[#32ADE6]">#dstl </span>
          to spread the word!
        </span>
      ),
      point: "+10 xDSTL",
      key: XDSTL_TASK_KEY.RETWEET_X,
    },
  ]
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const isCallingFollowX = localStorage.getItem("isCallingFollowX")
  const isCallingRePostX = localStorage.getItem("isCallingRePostX")

  const onFollowTwitterNext = async () => {
    try {
      if (code) {
        const response = await checkConnectDistilledX({
          code,
          redirectUri: `${window.location.origin}/rewards`,
        })
        if (response?.status === 201) {
          localStorage.removeItem("isCallingFollowX")
          callGetTaskSuccess()
        }
      }
    } catch (error: any) {
      // toast.error(error?.response?.data?.message)
      console.log("error", error)
    }
  }

  const onRePostXNext = async () => {
    try {
      if (code) {
        const response = await checkRePostDistilledX({
          code,
          redirectUri: `${window.location.origin}/rewards`,
          targetId: "1853838286105481575",
        })
        if (response?.status === 201) {
          localStorage.removeItem("isCallingRePostX")
          callGetTaskSuccess()
        }
      }
    } catch (error: any) {
      // toast.error(error?.response?.data?.message)
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (isCallingFollowX && code) {
      onFollowTwitterNext()
    }
    if (isCallingRePostX && code) {
      onRePostXNext()
    }
  }, [isCallingFollowX, isCallingRePostX, code])

  useEffect(() => {
    return () => {
      localStorage.removeItem("isCallingFollowX")
      localStorage.removeItem("isCallingRePostX")
    }
  }, [])

  const onFollowX = async () => {
    localStorage.removeItem("isCallingRePostX")
    localStorage.setItem("isCallingFollowX", "1")
    window.open(twitterAuthorizeLink)
  }

  const onRePostX = async () => {
    localStorage.removeItem("isCallingFollowX")
    localStorage.setItem("isCallingRePostX", "1")
    window.open(twitterAuthorizeLink)
  }

  const handleAction = (actionKey: string) => {
    switch (actionKey) {
      case XDSTL_TASK_KEY.CHAT_WITH_AGENT:
        return navigate(PATH_NAMES.MARKETPLACE)

      case XDSTL_TASK_KEY.BUG_REPORT:
        return window.open("https://forms.gle/482kYyJArVFzpYXR6")

      case XDSTL_TASK_KEY.CONNECT_X:
        return onFollowX()

      case XDSTL_TASK_KEY.RETWEET_X:
        return onRePostX()

      default:
        return
    }
  }

  const renderAction = (actionKey: string, record: any) => {
    const isClaimed = listActionTaskSuccess?.includes(actionKey)

    if (isClaimed && record?.point > 0) {
      return (
        <div className="flex items-center gap-1">
          <CircleCheckFilled size={24} />
          <span className="text-base-14-b text-green-500">Claimed</span>
        </div>
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
        const record = listTaskSuccess.find((task) => task.action === item.key)
        return (
          <div
            className="flex items-center justify-between border-b-1 border-mercury-100 px-4 py-[14px] pr-0 max-md:px-0"
            key={item.key}
          >
            <div className="w-full">
              <div className="flex items-center gap-2">{item.label}</div>
              <span className="text-base text-mercury-700">{item.desc}</span>

              <div className="mt-2 flex items-center gap-2 max-md:flex-col max-md:items-start">
                <div className="flex w-auto items-center justify-center rounded-full bg-brown-500 px-2">
                  <span className="text-[13px] font-bold text-white">
                    {item.point}
                  </span>
                </div>

                {item.repeatable && (
                  <div className="flex items-center gap-1">
                    {/* <RefreshIcon />
                    <span className="text-base-14 text-mercury-950">
                      Repeatable:
                    </span> */}
                    <span className="text-base-14-b text-mercury-950">
                      {record?.point || 0}/{item.repeatable}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>{renderAction(item.key, record)}</div>
          </div>
        )
      })}
    </div>
  )
}
export default WelcomeOnboard
