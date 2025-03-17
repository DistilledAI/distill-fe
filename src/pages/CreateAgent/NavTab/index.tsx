import DynamicTitleMeta from "@components/DynamicTitleMeta"
import { BoltOutlineIcon } from "@components/Icons"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { BrainOutlineIcon, ClanOutlineIcon } from "@components/Icons/Sidebar"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { UserHexagonIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useWindowSize from "@hooks/useWindowSize"
import React, { useEffect } from "react"
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import { twMerge } from "tailwind-merge"

export enum TabKeyAgent {
  Basic = "basic",
  ClanUtilities = "clan_utilities",
  Autonomous = "autonomous",
  Knowledge = "knowledge",
  AgentType = "agent_type",
  AutonomousX = "autonomous_x",
  AutonomousTG = "autonomous_tg",
}

const AgentNavTab: React.FC<{
  isEdit?: boolean
}> = ({ isEdit = false }) => {
  const { isMobile } = useWindowSize()
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")
  const { state } = useLocation()
  const navigate = useNavigate()
  const { agentId } = useParams()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const LIST = [
    {
      key: TabKeyAgent.AgentType,
      title: "Agent Type",
      icon: <UserHexagonIcon color="#545454" size={24} />,
      iconActive: <UserHexagonIcon color="#83664B" size={24} />,
      isEdit: true,
    },
    {
      key: TabKeyAgent.Basic,
      title: "Basic",
      icon: <ClipboardTextIcon color="#545454" size={24} />,
      iconActive: <ClipboardTextIcon color="#83664B" size={24} />,
      isEdit: true,
      isCreate: true,
    },
    {
      key: TabKeyAgent.Knowledge,
      title: "Knowledge",
      icon: <BrainOutlineIcon color="#545454" size={24} />,
      iconActive: <BrainOutlineIcon color="#83664B" size={24} />,
      isLater: !agentId,
      isCreate: true,
      isEdit: true,
    },
    {
      key: TabKeyAgent.ClanUtilities,
      title: "Clan & Tokenization",
      icon: <ClanOutlineIcon color="#545454" size={24} />,
      iconActive: <ClanOutlineIcon color="#83664B" size={24} />,
      isLater: !agentId,
      isEdit: true,
      isCreate: true,
    },
    {
      key: TabKeyAgent.Autonomous,
      title: "Autonomous",
      icon: <BoltOutlineIcon color="#545454" size={24} />,
      iconActive: <BoltOutlineIcon color="#83664B" size={24} />,
      isLater: !agentId,
      isEdit: false,
      isCreate: true,
    },
    {
      key: TabKeyAgent.AutonomousX,
      title: "Autonomous X",
      icon: <TwitterIcon color="#545454" size={18} />,
      iconActive: <TwitterIcon color="#83664B" size={18} />,
      isEdit: true,
    },
    {
      key: TabKeyAgent.AutonomousTG,
      title: "Autonomous TG",
      icon: <TelegramOutlineIcon color="#545454" size={24} />,
      iconActive: <TelegramOutlineIcon color="#83664B" size={24} />,
      isEdit: true,
    },
  ]

  useEffect(() => {
    if (!tab)
      navigate(
        `${isEdit ? `${PATH_NAMES.AGENT_DETAIL}/${agentId}?tab=${TabKeyAgent.AgentType}` : `${PATH_NAMES.CREATE_AGENT}?tab=${TabKeyAgent.Basic}`}`,
        { state },
      )
  }, [tab, isEdit])

  const onClick = (navKey: string) => {
    if (!isEdit) navigate(`${PATH_NAMES.CREATE_AGENT}?tab=${navKey}`, { state })
    else navigate(`${PATH_NAMES.AGENT_DETAIL}/${agentId}?tab=${navKey}`)
  }

  const listNav = isEdit
    ? LIST.filter((item) => item.isEdit)
    : LIST.filter((item) => item.isCreate)

  const currentTab = LIST.find((item) => item.key === tab)
  const pageTitle = isEdit
    ? myAgent?.username
      ? `${myAgent.username} Agent - Edit ${currentTab?.title || ""}`
      : currentTab
        ? `Edit ${currentTab.title}`
        : "Edit Agent"
    : "Create Agent"

  return (
    <>
      <DynamicTitleMeta title={pageTitle} />
      {isMobile ? (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {listNav.map((nav) => (
            <div
              onClick={() => {
                if (!nav.isLater) onClick(nav.key)
              }}
              className={twMerge(
                "relative flex h-[48px] cursor-pointer items-center gap-2 rounded-full bg-mercury-30 px-3 text-14 font-semibold text-mercury-900 duration-300 hover:bg-brown-50 max-md:h-[40px]",
                nav.key === tab && "bg-brown-50 text-brown-600",
                nav.isLater && "cursor-default !bg-mercury-30",
              )}
              key={nav.key}
            >
              <div
                className={twMerge(
                  "absolute left-0 h-full w-full rounded-full border-1 border-white",
                  nav.key === tab && "border-2 border-brown-500",
                )}
              />
              <div className={nav.isLater ? "opacity-30" : ""}>
                {nav.key === tab ? nav.iconActive : nav.icon}
              </div>
              <span
                className={twMerge(
                  "whitespace-nowrap text-[14px] font-bold text-mercury-900 max-md:text-13",
                  nav.isLater ? "opacity-30" : "",
                )}
              >
                {nav.title}
              </span>
              {nav.isLater && (
                <span className="absolute right-2 rounded-full bg-mercury-200 px-1 py-[2px] text-12 font-bold leading-none text-mercury-900">
                  EDIT LATER
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="fixed top-[95px] w-[260px] rounded-[22px] border-1 border-mercury-100 bg-mercury-70 p-[18px]">
          <ul className="flex flex-col gap-2">
            {listNav.map((nav) => (
              <li
                onClick={() => {
                  if (!nav.isLater) onClick(nav.key)
                }}
                className={twMerge(
                  "relative flex h-[48px] cursor-pointer items-center gap-2 rounded-full bg-mercury-30 px-3 text-14 font-semibold text-mercury-900 duration-300 hover:bg-brown-50",
                  nav.key === tab && "bg-brown-50 text-brown-600",
                  nav.isLater && "cursor-default !bg-mercury-30",
                )}
                key={nav.key}
              >
                <div
                  className={twMerge(
                    "absolute left-0 h-full w-full rounded-full border-1 border-white",
                    nav.key === tab && "border-2 border-brown-500",
                  )}
                />
                <div className={nav.isLater ? "opacity-30" : ""}>
                  {nav.key === tab ? nav.iconActive : nav.icon}
                </div>
                <span
                  className={twMerge(
                    "text-[14px] font-bold text-mercury-900",
                    nav.isLater ? "opacity-30" : "",
                  )}
                >
                  {nav.title}
                </span>
                {nav.isLater && (
                  <span className="absolute right-2 rounded-full bg-mercury-200 px-1 py-[2px] text-12 font-bold leading-none text-mercury-900">
                    EDIT LATER
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default AgentNavTab
