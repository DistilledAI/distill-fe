import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"
import {
  HomeOutlineIcon,
  BrainOutlineIcon,
  ClanOutlineIcon,
  MessageAIOutlineIcon,
} from "@components/Icons/Sidebar"
import {
  FilledSquareCircleIcon,
  SquareCircleIcon,
} from "@components/Icons/FilledSquareCircleIcon"
import {
  distilledAiPlaceholder,
  gnrtAvatar,
  maxAvatar,
  racksAvatar,
} from "@assets/images"
import { STATUS_AGENT } from "@constants/index"
import { useState, useEffect } from "react" // Thêm useState và useEffect

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

  const [lastClanPath, setLastClanPath] = useState<string>("/my-agent-clan")

  useEffect(() => {
    if (
      currentPath.includes("/clan") ||
      currentPath.includes("/my-agent-clan")
    ) {
      setLastClanPath(currentPath + currentSearch)
    }
  }, [currentPath, currentSearch])

  const getPathnameMyAgent = () => {
    if (!myAgent) return "/create-agent"
    if (myAgent.status !== STATUS_AGENT.ACTIVE) return "/account"
    return `/agent/${myAgent.id}`
  }

  const BASE_MENU: MenuItem[] = [
    {
      id: "home",
      icon: (color) => <HomeOutlineIcon color={color} />,
      name: "Home",
      rightContent: null,
      pathname: "/",
    },
    {
      id: "my-agent",
      icon: (color) => <BrainOutlineIcon color={color} />,
      name: "My Agent",
      rightContent: (avatarAgent) => (
        <img
          src={avatarAgent || distilledAiPlaceholder}
          alt="avatar placeholder"
          className="h-8 w-8 rounded-full object-cover"
        />
      ),
      pathname: getPathnameMyAgent(),
    },
    {
      id: "agent-clan",
      icon: (color) => <ClanOutlineIcon color={color} />,
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
      pathname: lastClanPath, // Sử dụng lastClanPath thay vì hardcode "/my-agent-clan"
    },
    {
      id: "private-agent",
      icon: (color) => <MessageAIOutlineIcon color={color} />,
      name: !isMobile ? "Private Chat" : "Chats",
      rightContent: null,
      pathname:
        myAgent?.id && !isMobile ? `/invite/${myAgent?.id}` : "/private-agent",
    },
    {
      id: "marketplace",
      icon: (color) =>
        !isMobile ? (
          <SquareCircleIcon />
        ) : (
          <FilledSquareCircleIcon size={20} color={color} />
        ),
      name: isMobile ? "Store" : "Agent Store",
      rightContent: null,
      pathname: "/marketplace?tab=agent-clans",
    },
  ]

  const getMenuOrder = (isMobile: boolean): MenuItem[] =>
    isMobile
      ? [BASE_MENU[0], BASE_MENU[3], BASE_MENU[4], BASE_MENU[2], BASE_MENU[1]]
      : BASE_MENU

  const menu = getMenuOrder(isMobile)

  const isActive = (item: MenuItem): boolean => {
    const [itemBasePath, itemQuery] = item.pathname.split("?")
    const expectedSearch = itemQuery ? `?${itemQuery}` : ""
    const normalizedCurrentPath = currentPath.replace(/\/$/, "")
    const normalizedItemBasePath = itemBasePath.replace(/\/$/, "")

    switch (item.id) {
      case "agent-clan":
        return (
          normalizedCurrentPath.includes("/clan") ||
          normalizedCurrentPath.includes("/my-agent-clan")
        )
      case "private-agent":
      case "invite":
        return (
          normalizedCurrentPath.includes("/invite") ||
          normalizedCurrentPath.includes("/private-agent") ||
          normalizedCurrentPath.startsWith("/chat")
        )
      case "marketplace":
        return normalizedCurrentPath === "/marketplace"
      default:
        return (
          normalizedCurrentPath === normalizedItemBasePath &&
          currentSearch === expectedSearch
        )
    }
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
            "flex h-full w-full flex-col items-center justify-center",
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
          "group/item flex h-12 cursor-pointer items-center gap-2 rounded-full border-[2px] border-white bg-mercury-30 px-4 py-[10px] transition-all duration-200 ease-in-out hover:bg-brown-50",
          active && "border-brown-500 bg-brown-50",
          sidebarCollapsed && "justify-center",
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
            {menu.map(renderItem)}
          </div>
        </div>
      ) : (
        <nav className="space-y-2">{menu.map(renderItem)}</nav>
      )}
    </>
  )
}

export default NavigationMenu
