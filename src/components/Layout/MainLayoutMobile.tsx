import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { useMemo } from "react"
import Header from "./Header"
import { Outlet, useLocation, useParams } from "react-router-dom"
import NavigationMenu from "./Sidebar/NavigationMenu"
import { PATH_NAMES } from "@constants/index"
import useInviteAgent from "@hooks/useInviteAgent"
import useFetchMe from "@hooks/useFetchMe"
import useReconnectWallet from "@hooks/useReconnectWallet"
import useMessageSocket from "@pages/ChatPageOld/ChatContainer/useMessageSocket"

const MainLayoutMobile = () => {
  const { pathname } = useLocation()
  const { privateChatId, chatId, inviteAgentId } = useParams()
  useInviteAgent()
  useFetchMe()
  useReconnectWallet()
  useMessageSocket()

  const ignoreLayout = useMemo(
    () => [
      `${PATH_NAMES.CHAT}/${chatId}`,
      `${PATH_NAMES.PRIVATE_AGENT}/${privateChatId}`,
      `${PATH_NAMES.INVITE}/${inviteAgentId}`,
      `${PATH_NAMES.CLAN}/${chatId}`,
      `${PATH_NAMES.MY_AGENT_CLAN}/${chatId}`,
      `${PATH_NAMES.MY_AGENT_CLAN}/empty`,
      `${PATH_NAMES.PRIVATE_AGENT}/empty`,
    ],
    [chatId, privateChatId, inviteAgentId],
  )

  const isHideBottomBar = useMemo(
    () => ignoreLayout.some((path) => pathname.startsWith(path)),
    [ignoreLayout, pathname],
  )

  const renderContent = () => {
    return (
      <>
        <Header />
        <div className="pt-[52px]">
          <Outlet />
        </div>
        {!isHideBottomBar ? <NavigationMenu isMobile={true} /> : null}
      </>
    )
  }

  return <StyleSpacingProvider>{renderContent()}</StyleSpacingProvider>
}

export default MainLayoutMobile
