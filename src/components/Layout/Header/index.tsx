import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import UserAuth from "@pages/ChatPage/ChatBox/UserAuth"
import TitlePathName from "./TitlePathName"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"
import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"

const CLAN_SIDEBAR_PATH_NAMES = [PATH_NAMES.CLAN, PATH_NAMES.PRIVATE_AGENT]

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
        "fixed right-0 top-0 z-40 flex w-[calc(100dvw-280px)] items-center justify-between bg-white px-8 pb-1 pt-5 transition-all duration-200 ease-in-out",
        sidebarCollapsed && "w-[calc(100dvw-84px)]",
        isClanSidebar && "w-[calc(100dvw-334px)]",
      )}
    >
      <TitlePathName />
      <div className="ml-auto w-full">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default Header
