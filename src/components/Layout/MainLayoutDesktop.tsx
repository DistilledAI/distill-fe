import ConnectWalletModal from "@components/ConnectWalletModal"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchMe from "@hooks/useFetchMe"
import useInviteAgent from "@hooks/useInviteAgent"
import LeftBar from "@pages/ChatPage/ChatBox/LeftBar"
import useMessageSocket from "@pages/ChatPage/ChatBox/useMessageSocket"
import UserAuthWrapper from "@pages/ChatPage/ChatBox/UserAuth/UserAuthWrapper"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { Outlet, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MainLayoutDesktop = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  useInviteAgent()
  useFetchMe()
  useMessageSocket()
  const { pathname } = useLocation()
  const ignoreSidebarLeft = [`${PATH_NAMES.PRIVATE_ROOM}`]
  const isIgnoreSidebarLeft = ignoreSidebarLeft.some((path) =>
    pathname.startsWith(path),
  )
  const hasLeftBar = !isIgnoreSidebarLeft

  return (
    <>
      <StyleSpacingProvider>
        <div className="flex bg-white font-barlow">
          {hasLeftBar && <LeftBar />}
          <div
            className={twMerge(
              "relative w-[calc(100%-329px)] pt-[68px] transition-all duration-300 ease-in-out",
              sidebarCollapsed && "w-[calc(100%-104px)]",
              !hasLeftBar && "w-full",
            )}
          >
            <UserAuthWrapper hasLeftBar={hasLeftBar} />
            <Outlet />
          </div>
        </div>
      </StyleSpacingProvider>
      <ConnectWalletModal />
    </>
  )
}

export default MainLayoutDesktop
