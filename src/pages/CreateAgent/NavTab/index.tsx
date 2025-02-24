import { BoltOutlineIcon } from "@components/Icons"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { BrainOutlineIcon, ClanOutlineIcon } from "@components/Icons/Sidebar"
import { PATH_NAMES } from "@constants/index"
import { useEffect } from "react"
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
}

const AgentNavTab = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")
  const { state } = useLocation()
  const navigate = useNavigate()
  const { agentId } = useParams()

  const LIST = [
    {
      key: TabKeyAgent.Basic,
      title: "Basic",
      icon: <ClipboardTextIcon color="#545454" size={24} />,
      iconActive: <ClipboardTextIcon color="#83664B" size={24} />,
    },
    {
      key: TabKeyAgent.ClanUtilities,
      title: "Clan & Utilities",
      icon: <ClanOutlineIcon color="#545454" size={24} />,
      iconActive: <ClanOutlineIcon color="#83664B" size={24} />,
      isLater: !agentId,
    },
    {
      key: TabKeyAgent.Autonomous,
      title: "Autonomous",
      icon: <BoltOutlineIcon color="#545454" size={24} />,
      iconActive: <BoltOutlineIcon color="#83664B" size={24} />,
      isLater: !agentId,
    },
    {
      key: TabKeyAgent.Knowledge,
      title: "Knowledge",
      icon: <BrainOutlineIcon color="#545454" size={24} />,
      iconActive: <BrainOutlineIcon color="#83664B" size={24} />,
    },
  ]

  useEffect(() => {
    if (!tab)
      navigate(`${PATH_NAMES.CREATE_AGENT}?tab=${TabKeyAgent.Basic}`, { state })
  }, [tab])

  return (
    <div className="fixed top-[95px] w-[260px] rounded-[22px] border-1 border-mercury-100 bg-mercury-70 p-[18px]">
      <ul className="flex flex-col gap-2">
        {LIST.map((nav) => (
          <li
            onClick={() => {
              if (!nav.isLater)
                navigate(`${PATH_NAMES.CREATE_AGENT}?tab=${nav.key}`, { state })
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
  )
}

export default AgentNavTab
