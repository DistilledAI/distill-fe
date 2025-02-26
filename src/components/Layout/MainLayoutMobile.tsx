import ConnectWalletModal from "@components/ConnectWalletModal"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { Suspense, useMemo } from "react"
import Header from "./Header"
import { Outlet, useLocation, useParams } from "react-router-dom"
import NavigationMenu from "./Sidebar/NavigationMenu"
import { PATH_NAMES } from "@constants/index"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"

const MainLayoutMobile = () => {
  const { pathname } = useLocation()
  const { chatId } = useGetChatId()
  const { privateChatId } = useParams()

  const ignoreLayout = useMemo(
    () => [
      `${PATH_NAMES.CHAT}/${chatId}`,
      `${PATH_NAMES.PRIVATE_AGENT}/${privateChatId}`,
    ],
    [chatId, privateChatId],
  )

  const isHideBottomBar = useMemo(
    () => ignoreLayout.some((path) => pathname.startsWith(path)),
    [ignoreLayout, pathname],
  )

  const renderContent = () => {
    return (
      <>
        <Header />
        <div className="pb-[60px] pt-[52px]">
          <Outlet />
        </div>
        {!isHideBottomBar ? <NavigationMenu isMobile={true} /> : null}
      </>
    )
  }

  return (
    <>
      <StyleSpacingProvider>{renderContent()}</StyleSpacingProvider>
      <Suspense fallback={null}>
        <ConnectWalletModal />
      </Suspense>
    </>
  )
}

export default MainLayoutMobile
