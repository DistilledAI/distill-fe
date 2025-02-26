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

const BottomBar = () => {
  const navigate = useNavigate()
  const { pathname: currentPath, search: currentSearch } = useLocation()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const MENU = [
    {
      id: "home",
      icon: (color?: string) => <HomeOutlineIcon color={color} />,
      name: "Home",
      pathname: "/",
    },
    {
      id: "my-agent",
      icon: (color?: string) => <BrainOutlineIcon color={color} />,
      name: "My Agent",
      pathname: "/account?tab=my-agent",
    },
    {
      id: "agent-clan",
      icon: (color?: string) => <ClanOutlineIcon color={color} />,
      name: "Clans",
      pathname: "/clan",
    },
    {
      id: "private-agent",
      icon: (color?: string) => <MessageAIOutlineIcon color={color} />,
      name: "Chats",
      pathname: myAgent ? `/private-agent/${myAgent.id}` : "/private-agent",
    },
    {
      id: "vaults",
      icon: (color?: string) => <CoinsOutlineIcon color={color} />,
      name: "Store",
      pathname: "/account?tab=my-vault-holdings",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white shadow-md">
      <div className="flex h-16 items-center justify-around">
        {MENU.map((item, index) => {
          const [itemBasePath, itemQuery] = item.pathname.split("?")
          const expectedSearch = itemQuery ? `?${itemQuery}` : ""

          let isActive =
            currentPath === itemBasePath && currentSearch === expectedSearch

          if (item.id === "agent-clan") {
            isActive = currentPath.includes(item.pathname)
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => navigate(item.pathname)}
              className={twMerge(
                "flex h-full w-full flex-col items-center justify-center text-gray-600 hover:text-gray-800",
                isActive && "text-brown-500", // Highlight item đang active
              )}
            >
              {item.icon(isActive ? "#83664B" : "#6B7280")}
              <span className="mt-1 text-xs font-medium">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomBar
