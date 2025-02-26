import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"
import {
  HomeOutlineIcon,
  BrainOutlineIcon,
  ClanOutlineIcon,
  MessageAIOutlineIcon,
  CoinsOutlineIcon,
} from "@components/Icons/Sidebar"
import {
  gnrtAvatar,
  maxAvatar,
  maxAvatarPlaceholder,
  racksAvatar,
} from "@assets/images"
import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"

interface MenuItem {
  id: string
  icon: (color?: string) => JSX.Element
  name: string
  rightContent: ((avatarAgent?: string) => JSX.Element | null) | null
  pathname: string
  isHidden?: boolean
}

const NavigationMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
  const navigate = useNavigate()
  const { pathname: currentPath, search: currentSearch } = useLocation()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const BASE_MENU: MenuItem[] = [
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
      pathname: "/account?tab=my-agent",
    },
    {
      id: "agent-clan",
      icon: (color?: string) => <ClanOutlineIcon color={color} />,
      name: "Clans",
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
      pathname: "/clan",
    },
    {
      id: "private-agent",
      icon: (color?: string) => <MessageAIOutlineIcon color={color} />,
      name: !isMobile ? "Private Chat" : "Chats",
      rightContent: null,
      pathname:
        myAgent && !isMobile
          ? `/private-agent/${myAgent.id}`
          : "/private-agent",
    },
    {
      id: "vaults",
      icon: (color?: string) => <CoinsOutlineIcon color={color} />,
      name: "My Staked Vaults",
      rightContent: null,
      pathname: "/account?tab=my-vault-holdings",
    },
    {
      id: "marketplace",
      icon: (color?: string) => (
        <FilledSquareCircleIcon size={18} color={color} />
      ),
      name: "Store",
      rightContent: null,
      pathname: "/marketplace?tab=agent-clans",
      isHidden: !isMobile,
    },
  ]

  const getMenuOrder = (isMobile: boolean): MenuItem[] => {
    if (isMobile) {
      return [
        BASE_MENU[0], // Home
        BASE_MENU[3], // Chats
        BASE_MENU[5], // Store
        BASE_MENU[2], // Clans
        BASE_MENU[1], // My Agent
      ]
    }
    return BASE_MENU
  }

  const menu = getMenuOrder(isMobile)

  const isActive = (item: MenuItem): boolean => {
    const [itemBasePath, itemQuery] = item.pathname.split("?")
    const expectedSearch = itemQuery ? `?${itemQuery}` : ""
    const normalizedCurrentPath = currentPath.replace(/\/$/, "")
    const normalizedItemBasePath = itemBasePath.replace(/\/$/, "")

    if (item.id === "agent-clan") {
      return currentPath.includes(item.pathname)
    }

    if (item.id === "marketplace") {
      return normalizedCurrentPath === "/marketplace"
    }
    return (
      normalizedCurrentPath === normalizedItemBasePath &&
      currentSearch === expectedSearch
    )
  }

  const renderItem = (item: MenuItem, index: number) => {
    const active = isActive(item)
    const iconColor = active ? "#83664B" : isMobile ? "#999999" : "#545454"
    const textColor = active
      ? "text-brown-500"
      : isMobile
        ? "text-mercury-500"
        : "text-mercury-900"
    const fontSize = isMobile ? "text-[12px]" : "text-[16px]"

    if (isMobile) {
      return (
        <button
          key={index}
          type="button"
          onClick={() => navigate(item.pathname)}
          className={twMerge(
            "flex h-full w-full flex-col items-center justify-center text-gray-600 hover:text-gray-800",
            active && "text-brown-500",
          )}
        >
          <div
            className={twMerge(
              "px-[14px] py-[3px]",
              active && "rounded-full bg-brown-50",
            )}
          >
            {item.icon(iconColor)}
          </div>
          <span className={twMerge(fontSize, "mt-1 font-medium", textColor)}>
            {item.name}
          </span>
        </button>
      )
    }

    return (
      <div
        key={index}
        className={twMerge(
          "group/item flex cursor-pointer items-center gap-2 rounded-full border-[2px] border-white bg-mercury-30 px-4 py-[10px] transition-all duration-200 ease-in-out hover:bg-brown-50",
          active && "h-12 border-brown-500 bg-brown-50",
          sidebarCollapsed && "h-12 justify-center",
          item.isHidden && "hidden",
        )}
        onClick={() => navigate(item.pathname)}
      >
        <div>{item.icon(iconColor)}</div>
        <span
          className={twMerge(
            "flex-1 whitespace-nowrap font-bold",
            fontSize,
            textColor,
            sidebarCollapsed && "hidden",
          )}
        >
          {item.name}
        </span>
        <div className={twMerge("flex-shrink-0", sidebarCollapsed && "hidden")}>
          {item.rightContent && item.rightContent(myAgent?.avatar || "")}
        </div>
      </div>
    )
  }

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white">
          <div className="flex h-[52px] items-center justify-around">
            {menu.map((item, index) => renderItem(item, index))}
          </div>
        </div>
      ) : (
        <nav className="space-y-2">
          {menu.map((item, index) => renderItem(item, index))}
        </nav>
      )}
    </>
  )
}

export default NavigationMenu
