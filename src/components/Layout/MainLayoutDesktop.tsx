import { Suspense, useMemo } from "react"
import ConnectWalletModal from "@components/ConnectWalletModal"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchMe from "@hooks/useFetchMe"
import useInviteAgent from "@hooks/useInviteAgent"
import useMessageSocket from "@pages/ChatPage/ChatContainer/useMessageSocket"
import UserAuthWrapper from "@pages/ChatPage/ChatContainer/UserAuth/UserAuthWrapper"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { Outlet, useLocation, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import Header from "./Header"
import Sidebar from "./Sidebar"

const MainLayoutDesktop = () => {
  const { pathname } = useLocation()
  const { agentId } = useParams()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  useInviteAgent()
  useFetchMe()
  useMessageSocket()

  const isHideLeftBar = useMemo(() => {
    return (
      pathname === PATH_NAMES.TRENDING ||
      pathname === PATH_NAMES.STAKING ||
      pathname.startsWith(PATH_NAMES.DAO) ||
      pathname === `${PATH_NAMES.AGENT_DETAIL}/${agentId}`
    )
  }, [pathname, agentId])

  const renderContent = useMemo(() => {
    if (isHideLeftBar) {
      return (
        <div className="flex bg-white font-barlow">
          <div className="relative w-full pt-[68px]">
            <UserAuthWrapper />
            <Outlet />
          </div>
        </div>
      )
    }

    return (
      <div className="flex bg-white font-barlow">
        <Sidebar />
        <div
          className={twMerge(
            "ml-auto w-[calc(100dvw-84px)] pt-[68px] transition-all duration-200 ease-in-out",
          )}
        >
          <Header />
          <Outlet />
        </div>
      </div>
    )
  }, [isHideLeftBar, sidebarCollapsed])

  return (
    <>
      <StyleSpacingProvider>{renderContent}</StyleSpacingProvider>
      <Suspense fallback={null}>
        <ConnectWalletModal />
      </Suspense>
    </>
  )
}

export default MainLayoutDesktop
