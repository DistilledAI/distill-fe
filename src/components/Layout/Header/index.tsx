import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import UserAuth from "@pages/ChatPage/ChatBox/UserAuth"
import TitlePathName from "./TitlePathName"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"

const Header = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { connectMultipleWallet } = useConnectWallet()
  useReconnectWallet()

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-50 flex w-[calc(100dvw-280px)] items-center justify-between pb-1 pl-16 pr-8 pt-5 transition-all duration-200 ease-in-out",
        sidebarCollapsed && "w-[calc(100dvw-84px)]",
      )}
    >
      <TitlePathName />
      <div className="ml-auto">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default Header
