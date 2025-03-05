import ProtectedByAuth from "@components/Layout/ProtectedByAuth"
import LoadingFallback from "@components/LoadingFallback"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import AgentStore from "@pages/AgentStore"
import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

// Lazy-loaded components
const PageNotFound = lazy(() => import("@pages/NotFound"))
const MainLayoutMobile = lazy(
  () => import("@components/Layout/MainLayoutMobile"),
)
const MainLayoutDesktop = lazy(
  () => import("@components/Layout/MainLayoutDesktop"),
)
const HomePage = lazy(() => import("@pages/Home"))
const ChatBoxLive = lazy(() => import("@pages/ChatBoxLive"))
const AgentClansPage = lazy(() => import("@pages/AgentClans"))
const AgentClansMobilePage = lazy(
  () => import("@pages/AgentClans/Mobile/AgentClansMobile"),
)

const PrivateChatPage = lazy(() => import("@pages/PrivateChat"))
const PrivateChatMobile = lazy(
  () => import("@pages/PrivateChat/Mobile/PrivateChatMobile"),
)
const PrivateChatBox = lazy(() => import("@pages/PrivateChat/PrivateChatBox"))
const AuthorProfile = lazy(() => import("@pages/AuthorProfile"))
const Orchestration = lazy(() => import("@pages/Orchestration"))
const StakePage = lazy(() => import("@pages/Stake"))
const DaoPage = lazy(() => import("@pages/Dao"))
const CreateProposal = lazy(() => import("@pages/Dao/CreateProposal"))
const ProposalsDetailPage = lazy(() => import("@pages/Dao/ProposalsDetail"))
const Account = lazy(() => import("@pages/Account"))
const AddMyData = lazy(() => import("@pages/AddMyData"))
const AgentDetail = lazy(() => import("@pages/AgentDetail"))
const CreateAgent = lazy(() => import("@pages/CreateAgent"))
const MyAgentPage = lazy(() => import("@pages/MyAgents"))
const MyData = lazy(() => import("@pages/MyData"))
const RewardsPage = lazy(() => import("@pages/Rewards"))
const ChatAgentClanBox = lazy(
  () => import("@pages/AgentClans/ChatAgentClanBox"),
)
const XLoginPage = lazy(() => import("@pages/XLoginPage"))

const AppRouter = () => {
  const { isMobile } = useWindowSize()
  const Layout = isMobile ? MainLayoutMobile : MainLayoutDesktop

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Root Layout Route */}
        <Route path={PATH_NAMES.HOME} element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} /> {/* Home Page */}
          {/*My Clan Routes */}
          <Route path={PATH_NAMES.MY_AGENT_CLAN}>
            <Route
              index
              element={isMobile ? <AgentClansMobilePage /> : <AgentClansPage />}
            />
            <Route
              path=":chatId"
              element={isMobile ? <ChatAgentClanBox /> : <AgentClansPage />}
            />
            <Route
              path="empty"
              element={isMobile ? <ChatAgentClanBox /> : <AgentClansPage />}
            />
          </Route>
          {/* Clan Routes */}
          <Route path={PATH_NAMES.CLAN}>
            <Route
              index
              element={isMobile ? <AgentClansMobilePage /> : <AgentClansPage />}
            />
            <Route
              path=":chatId"
              element={isMobile ? <ChatAgentClanBox /> : <AgentClansPage />}
            />
          </Route>
          {/* Chat Routes */}
          <Route
            path={PATH_NAMES.CHAT_DETAIL}
            element={isMobile ? <PrivateChatBox /> : <PrivateChatPage />}
          />
          <Route
            path={`${PATH_NAMES.LIVE}/:chatId`}
            element={<ChatBoxLive />}
          />
          <Route
            path={`${PATH_NAMES.INVITE}/:inviteAgentId`}
            element={isMobile ? <PrivateChatBox /> : <PrivateChatPage />}
          />
          {/* Private Chat Routes */}
          <Route path={PATH_NAMES.PRIVATE_AGENT}>
            <Route
              index
              element={isMobile ? <PrivateChatMobile /> : <PrivateChatPage />}
            />
            <Route
              path=":privateChatId"
              element={isMobile ? <PrivateChatBox /> : <PrivateChatPage />}
            />
            <Route
              path="empty"
              element={isMobile ? <PrivateChatBox /> : <PrivateChatPage />}
            />
          </Route>
          {/* General Feature Routes */}
          <Route path={PATH_NAMES.MARKETPLACE} element={<AgentStore />} />
          <Route path={PATH_NAMES.ADD_MY_DATA} element={<AddMyData />} />
          <Route
            path={`${PATH_NAMES.AUTHOR_PROFILE}/:authorId`}
            element={<AuthorProfile />}
          />
          <Route
            path={`${PATH_NAMES.ORCHESTRATION}/:chatId`}
            element={<Orchestration />}
          />
          <Route path={PATH_NAMES.STAKING} element={<StakePage />} />
          {/* DAO Routes */}
          <Route path={`${PATH_NAMES.DAO}/:agentAddress`}>
            <Route path="proposals" element={<DaoPage />} />
            <Route path="proposals/create" element={<CreateProposal />} />
            <Route
              path="proposals/:proposalId"
              element={<ProposalsDetailPage />}
            />
          </Route>
          {/* Protected Routes (Requires Authentication) */}
          <Route element={<ProtectedByAuth />}>
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
            <Route path={PATH_NAMES.CREATE_AGENT} element={<CreateAgent />} />
            <Route path={PATH_NAMES.MY_AGENTS} element={<MyAgentPage />} />
            <Route path={PATH_NAMES.REWARDS} element={<RewardsPage />} />
          </Route>
          <Route path={PATH_NAMES.X_LOGIN} element={<XLoginPage />} />
        </Route>

        {/* Fallback Route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
