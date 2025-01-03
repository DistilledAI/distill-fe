import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import MainLayout from "@components/Layout/MainLayout"
import MainLayoutDesktop from "@components/Layout/MainLayoutDesktop"
import ProtectedByAuth from "@components/Layout/ProtectedByAuth"
import useWindowSize from "@hooks/useWindowSize"
import { PATH_NAMES } from "@constants/index"
import PageNotFound from "@pages/NotFound"
import LoadingFallback from "@components/LoadingFallback"

const ChatDetailLoadingPage = lazy(() => import("@components/LoadingMobile"))
const Account = lazy(() => import("@pages/Account"))
const AddMyData = lazy(() => import("@pages/AddMyData"))
const AgentDetail = lazy(() => import("@pages/AgentDetail"))
const AuthorProfile = lazy(() => import("@pages/AuthorProfile"))
const ChatBoxLive = lazy(() => import("@pages/ChatBoxLive"))
const ChatMyAgent = lazy(() => import("@pages/ChatMyAgent"))
const ChatBox = lazy(() => import("@pages/ChatPage/ChatBox"))
const AgentInitialization = lazy(
  () =>
    import(
      "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization"
    ),
)
const ChatPageMobile = lazy(() => import("@pages/ChatPage/Mobile"))
const MyPrivateAgentContentMobile = lazy(
  () => import("@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"),
)
const Marketplace = lazy(() => import("@pages/Marketplace"))
const MyAgentPage = lazy(() => import("@pages/MyAgents"))
const MyData = lazy(() => import("@pages/MyData"))
const Orchestration = lazy(() => import("@pages/Orchestration"))
const RewardsPage = lazy(() => import("@pages/Rewards"))
// const TrendingPage = lazy(() => import("@pages/Trending"))

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path={PATH_NAMES.HOME}
          element={isMobile ? <MainLayout /> : <MainLayoutDesktop />}
        >
          <Route
            path={PATH_NAMES.HOME}
            element={isMobile ? <ChatPageMobile /> : <ChatBox />}
          />
          <Route
            path={PATH_NAMES.CHAT_DETAIL}
            element={isMobile ? <ChatPageMobile /> : <ChatBox />}
          />
          <Route
            path={`${PATH_NAMES.CLAN}/:chatId`}
            element={<ChatBoxLive />}
          />
          <Route
            path={`${PATH_NAMES.LIVE}/:chatId`}
            element={<ChatBoxLive />}
          />
          <Route
            path={`${PATH_NAMES.INVITE}/:inviteAgentId`}
            element={isMobile ? <ChatDetailLoadingPage /> : <ChatBox />}
          />
          <Route
            path={`${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`}
            element={isMobile ? <ChatPageMobile /> : <ChatMyAgent />}
          />
          <Route path={PATH_NAMES.MARKETPLACE} element={<Marketplace />} />
          <Route path={PATH_NAMES.ADD_MY_DATA} element={<AddMyData />} />
          <Route
            path={`${PATH_NAMES.AUTHOR_PROFILE}/:authorId`}
            element={<AuthorProfile />}
          />
          <Route
            path={`${PATH_NAMES.ORCHESTRATION}/:chatId`}
            element={<Orchestration />}
          />
          {isMobile && (
            <Route
              path={PATH_NAMES.PRIVATE_AGENT}
              element={<MyPrivateAgentContentMobile />}
            />
          )}
          {/* <Route path={PATH_NAMES.TRENDING} element={<TrendingPage />} /> */}

          {/* Route Protected By Auth */}
          <Route path={PATH_NAMES.HOME} element={<ProtectedByAuth />}>
            <Route path={PATH_NAMES.MY_DATA} element={<MyData />} />
            <Route path={PATH_NAMES.ACCOUNT} element={<Account />} />
            <Route
              path={`${PATH_NAMES.AGENT_DETAIL}/:agentId`}
              element={<AgentDetail />}
            />
            <Route
              path={`${PATH_NAMES.ADD_MY_DATA}/:botId`}
              element={<AddMyData />}
            />
            <Route
              path={PATH_NAMES.CREATE_AGENT}
              element={<AgentInitialization />}
            />
            <Route path={PATH_NAMES.MY_AGENTS} element={<MyAgentPage />} />
            <Route path={PATH_NAMES.REWARDS} element={<RewardsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
