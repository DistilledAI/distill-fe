import { useMemo } from "react"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchMe from "@hooks/useFetchMe"
import useInviteAgent from "@hooks/useInviteAgent"
import useMessageSocket from "@pages/ChatPageOld/ChatContainer/useMessageSocket"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { Outlet, useLocation, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import Header from "./Header"
import Sidebar from "./Sidebar"
import useAuthState from "@hooks/useAuthState"

const MainLayoutDesktop = () => {
  const { pathname } = useLocation()
  const { agentId } = useParams()
  const { isLogin, isAnonymous } = useAuthState()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  useInviteAgent()
  useFetchMe()
  useMessageSocket()

  const isHideSideBar = useMemo(() => {
    return (
      pathname === PATH_NAMES.TRENDING ||
      pathname === PATH_NAMES.STAKING ||
      (pathname === PATH_NAMES.CREATE_AGENT && isLogin && !isAnonymous) ||
      pathname.startsWith(PATH_NAMES.DAO) ||
      pathname === `${PATH_NAMES.AGENT_DETAIL}/${agentId}`
    )
  }, [pathname, agentId, isLogin, isAnonymous])

  const isHideHeader = useMemo(() => {
    return (
      (pathname === PATH_NAMES.CREATE_AGENT && isLogin && !isAnonymous) ||
      pathname === `${PATH_NAMES.AGENT_DETAIL}/${agentId}`
    )
  }, [pathname, isLogin, isAnonymous])

  const renderContent = useMemo(() => {
    return (
      <div className="flex bg-white font-barlow">
        {!isHideSideBar && <Sidebar />}
        <div
          className={twMerge(
            "ml-auto w-[calc(100dvw-84px)] pt-[68px] transition-all duration-200 ease-in-out",
            isHideSideBar && "w-full",
          )}
        >
          {!isHideHeader && <Header />}
          <Outlet />
        </div>
      </div>
    )
  }, [isHideSideBar, sidebarCollapsed])

  return (
    <>
      <StyleSpacingProvider>{renderContent}</StyleSpacingProvider>
    </>
  )
}

export default MainLayoutDesktop
