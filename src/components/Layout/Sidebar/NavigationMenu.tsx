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

interface MenuItem {
  id: string
  icon: (color?: string) => JSX.Element
  name: string
  rightContent: ((avatarAgent?: string) => JSX.Element | null) | null
  pathname: string
}

const NavigationMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
  const navigate = useNavigate()
  const { pathname: currentPath, search: currentSearch } = useLocation()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const MENU: MenuItem[] = [
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
      name: "Chats",
      rightContent: null,
      pathname: myAgent ? `/private-agent/${myAgent.id}` : "/private-agent",
    },
    {
      id: "vaults",
      icon: (color?: string) => <CoinsOutlineIcon color={color} />,
      name: "Store",
      rightContent: null,
      pathname: "/account?tab=my-vault-holdings",
    },
  ]

  const renderItem = (item: MenuItem, index: number) => {
    const [itemBasePath, itemQuery] = item.pathname.split("?")
    const expectedSearch = itemQuery ? `?${itemQuery}` : ""

    let isActive =
      currentPath === itemBasePath && currentSearch === expectedSearch

    if (item.id === "agent-clan") {
      isActive = currentPath.includes(item.pathname)
    }

    if (isMobile) {
      return (
        <button
          key={index}
          type="button"
          onClick={() => navigate(item.pathname)}
          className={twMerge(
            "flex h-full w-full flex-col items-center justify-center text-gray-600 hover:text-gray-800",
            isActive && "text-brown-500",
          )}
        >
          <div
            className={twMerge(
              "px-[14px] py-[3px]",
              isActive && "rounded-full bg-brown-50",
            )}
          >
            {item.icon(isActive ? "#83664B" : "#999999")}
          </div>
          <span
            className={twMerge(
              "text-[12px] font-medium text-mercury-500",
              isActive && "text-brown-500",
            )}
          >
            {item.name}
          </span>
        </button>
      )
    } else {
      return (
        <div
          key={index}
          className={twMerge(
            "group/item flex cursor-pointer items-center gap-2 rounded-full border-[2px] border-white bg-mercury-30 px-4 py-[10px] transition-all duration-200 ease-in-out hover:bg-brown-50",
            isActive && "h-12 border-brown-500 bg-brown-50",
            sidebarCollapsed && "h-12 justify-center",
          )}
          onClick={() => navigate(item.pathname)}
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
            {item.rightContent && item.rightContent(myAgent?.avatar || "")}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white">
          <div className="flex h-[52px] items-center justify-around">
            {MENU.map((item, index) => renderItem(item, index))}
          </div>
        </div>
      ) : (
        <nav className="space-y-2">
          {MENU.map((item, index) => renderItem(item, index))}
        </nav>
      )}
    </>
  )
}

export default NavigationMenu
