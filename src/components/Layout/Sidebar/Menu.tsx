import {
  gnrtAvatar,
  maxAvatar,
  maxAvatarPlaceholder,
  racksAvatar,
} from "@assets/images"
import {
  BrainOutlineIcon,
  ClanOutlineIcon,
  CoinsOutlineIcon,
  HomeOutlineIcon,
  MessageAIOutlineIcon,
} from "@components/Icons/Sidebar"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MENU = [
  {
    id: "home",
    icon: (color?: string) => <HomeOutlineIcon color={color} />,
    name: "Home",
    rightContent: null,
    pathname: "/",
  },
  {
    id: "my-agent",
    icon: (color?: string) => <BrainOutlineIcon color={color} />,
    name: "My Agent",
    rightContent: (avatarAgent?: string) => (
      <img
        src={avatarAgent || maxAvatarPlaceholder}
        alt="avatar placeholder"
        className="h-8 w-8 rounded-full"
      />
    ),
    pathname: PATH_NAMES.MY_AGENTS,
  },
  {
    id: "agent-clan",
    icon: (color?: string) => <ClanOutlineIcon color={color} />,
    name: "Agent Clan",
    rightContent: () => (
      <div className="flex items-center">
        <div className="rounded-full bg-lgd-code-hot-ramp p-[2px]">
          <div className="rounded-full bg-white p-[2px]">
            <img
              src={maxAvatar}
              alt="avatar agent"
              className="h-6 w-6 rounded-full border border-mercury-400"
            />
          </div>
        </div>
        <div className="-ml-2 rounded-full bg-lgd-code-hot-ramp p-[2px]">
          <div className="rounded-full bg-white p-[2px]">
            <img
              src={racksAvatar}
              alt="avatar agent"
              className="h-6 w-6 rounded-full border border-mercury-400"
            />
          </div>
        </div>
        <div className="-ml-2 rounded-full bg-lgd-code-hot-ramp p-[2px]">
          <div className="rounded-full bg-white p-[2px]">
            <img
              src={gnrtAvatar}
              alt="avatar agent"
              className="h-6 w-6 rounded-full border border-mercury-400"
            />
          </div>
        </div>
      </div>
    ),
    pathname: PATH_NAMES.CLAN,
  },
  {
    id: "private-agent",
    icon: (color?: string) => <MessageAIOutlineIcon color={color} />,
    name: "Private Chat",
    rightContent: null,
    pathname: PATH_NAMES.PRIVATE_AGENT,
  },
  {
    id: "vaults",
    icon: (color?: string) => <CoinsOutlineIcon color={color} />,
    name: "My Staked Vaults",
    rightContent: null,
    pathname: PATH_NAMES.STAKING,
  },
]

const Menu = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  return (
    <nav className="space-y-2">
      {MENU.map((item, index) => {
        const isActive = item.pathname === pathname
        return (
          <div
            key={index}
            className={twMerge(
              "group/item flex cursor-pointer items-center gap-2 rounded-full border-[2px] border-white bg-mercury-30 px-4 py-[10px] transition-all duration-300 ease-in-out hover:border-brown-500",
              isActive && "border-brown-500 bg-brown-50",
              sidebarCollapsed && "h-12 justify-center",
            )}
            onClick={() => {
              navigate(item.pathname)
            }}
          >
            <div>{item.icon(isActive ? "#83664B" : "#545454")}</div>
            <span
              className={twMerge(
                "flex-1 whitespace-nowrap text-[16px] font-bold text-mercury-900",
                isActive && "text-brown-600",
                sidebarCollapsed && "hidden",
              )}
            >
              {item.name}
            </span>
            <div
              className={twMerge("flex-shrink-0", sidebarCollapsed && "hidden")}
            >
              {item.rightContent && item.rightContent(myAgent?.avatar)}
            </div>
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
