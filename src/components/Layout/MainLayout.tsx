import { Suspense, lazy, useMemo } from "react"
import { Outlet, useLocation, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import useFetchMe from "@hooks/useFetchMe"
import useInviteAgent from "@hooks/useInviteAgent"
import useReconnectWallet from "@hooks/useReconnectWallet"
import useMessageSocket from "@pages/ChatPage/ChatBox/useMessageSocket"
import useWindowSize from "@hooks/useWindowSize"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"

const ConnectWalletModal = lazy(() => import("@components/ConnectWalletModal"))
const HeaderMobile = lazy(() => import("./HeaderMobile"))
const FooterMobile = lazy(() => import("./FooterMobile"))

const MainLayout = () => {
  useInviteAgent()
  useFetchMe()
  useReconnectWallet()
  useMessageSocket()

  const { screenWidth } = useWindowSize()
  const { pathname } = useLocation()
  const { inviteAgentId, privateChatId } = useParams()
  const { chatId } = useGetChatId()

  const ignoreLayout = useMemo(
    () => [
      `${PATH_NAMES.CHAT}/${chatId}`,
      `${PATH_NAMES.INVITE}/${inviteAgentId}`,
      `${PATH_NAMES.MY_DATA}`,
      `${PATH_NAMES.PRIVATE_AGENT}/${privateChatId}`,
      `${PATH_NAMES.MY_AGENTS}`,
      `${PATH_NAMES.STAKING}`,
      `${PATH_NAMES.DAO}`,
    ],
    [chatId, inviteAgentId, privateChatId],
  )

  const ignoreFooter = useMemo(
    () => [`${PATH_NAMES.CLAN}`, `${PATH_NAMES.ORCHESTRATION}/${chatId}`],
    [],
  )

  const isIgnoreLayout = useMemo(
    () => ignoreLayout.some((path) => pathname.startsWith(path)),
    [ignoreLayout, pathname],
  )

  const isIgnoreFooter = useMemo(
    () => ignoreFooter.some((path) => pathname.startsWith(path)),
    [ignoreFooter, pathname],
  )

  const isHeader = !isIgnoreLayout
  const isFooter = !isIgnoreLayout && !isIgnoreFooter

  const hasHeader = screenWidth < 768 && isHeader
  const hasFooter = screenWidth < 768 && isFooter

  return (
    <>
      <div className="max-md:bg-mercury-30">
        {hasHeader && (
          <Suspense fallback={<div>Loading Header...</div>}>
            <HeaderMobile />
          </Suspense>
        )}
        <div
          aria-checked={hasHeader}
          aria-current={hasFooter}
          className="aria-current:pb-[60px] aria-checked:pt-[50px]"
        >
          <Outlet />
        </div>
        {hasFooter && (
          <Suspense fallback={null}>
            <FooterMobile />
          </Suspense>
        )}
      </div>
      <Suspense fallback={null}>
        <ConnectWalletModal />
      </Suspense>
    </>
  )
}

export default MainLayout
