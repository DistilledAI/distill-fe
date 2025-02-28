import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import UserAuth from "@pages/ChatPage/ChatContainer/UserAuth"
import TitlePathName from "./TitlePathName"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"
import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"

const CLAN_SIDEBAR_PATH_NAMES = [
  PATH_NAMES.CLAN,
  PATH_NAMES.PRIVATE_AGENT,
  PATH_NAMES.CHAT,
  PATH_NAMES.MY_AGENT_CLAN,
]

const Header = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { connectMultipleWallet } = useConnectWallet()
  useReconnectWallet()
  const { pathname } = useLocation()
  const isClanSidebar = !!CLAN_SIDEBAR_PATH_NAMES.find((val) =>
    pathname.startsWith(val),
  )

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-[51] flex w-[calc(100dvw-280px)] items-center justify-between bg-white p-4 pb-1 transition-all duration-200 ease-in-out",
        sidebarCollapsed && "w-[calc(100dvw-84px)]",
        isClanSidebar && "w-[calc(100dvw-334px)]",
        "max-md:h-[52px] max-md:w-full max-md:px-3 max-md:py-[6px]",
      )}
    >
      <TitlePathName />
      <div className="ml-auto md:w-full">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default Header
