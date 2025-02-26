import MainLayoutMobile from "@components/Layout/MainLayoutMobile"
import LoadingFallback from "@components/LoadingFallback"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import ChatClanBox from "@pages/AgentClans/ChatClanBox"
import ChatsAgent from "@pages/PrivateChat/Mobile/ChatsAgent"
import PrivateChatBox from "@pages/PrivateChat/PrivateChatBox"
import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

const MainLayoutDesktop = lazy(
  () => import("@components/Layout/MainLayoutDesktop"),
)
const ProtectedByAuth = lazy(() => import("@components/Layout/ProtectedByAuth"))
const PageNotFound = lazy(() => import("@pages/NotFound"))

const ChatDetailLoadingPage = lazy(() => import("@components/LoadingMobile"))
const Account = lazy(() => import("@pages/Account"))
const AddMyData = lazy(() => import("@pages/AddMyData"))
const AgentDetail = lazy(() => import("@pages/AgentDetail"))
const AuthorProfile = lazy(() => import("@pages/AuthorProfile"))
const ChatBoxLive = lazy(() => import("@pages/ChatBoxLive"))
const HomePage = lazy(() => import("@pages/Home"))
// const ChatMyAgent = lazy(() => import("@pages/ChatMyAgent"))
const ChatBox = lazy(() => import("@pages/ChatPage/ChatContainer"))
const CreateAgent = lazy(() => import("@pages/CreateAgent"))
// const ChatPageMobile = lazy(() => import("@pages/ChatPage/Mobile"))
// const MyPrivateAgentContentMobile = lazy(
//   () => import("@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"),
// )
// const Marketplace = lazy(() => import("@pages/Marketplace"))
const MyAgentPage = lazy(() => import("@pages/MyAgents"))
const MyData = lazy(() => import("@pages/MyData"))
const Orchestration = lazy(() => import("@pages/Orchestration"))
const RewardsPage = lazy(() => import("@pages/Rewards"))
const StakePage = lazy(() => import("@pages/Stake"))
const CreateProposal = lazy(() => import("@pages/Dao/CreateProposal"))
const DaoPage = lazy(() => import("@pages/Dao"))
const ProposalsDetailPage = lazy(() => import("@pages/Dao/ProposalsDetail"))
const AgentClansPage = lazy(() => import("@pages/AgentClans"))
const PrivateChatPage = lazy(() => import("@pages/PrivateChat"))
const AgentStorePage = lazy(() => import("@pages/AgentStore"))
const AgentClansMobilePage = lazy(
  () => import("@pages/AgentClans/Mobile/AgentClansMobile"),
)
// const TrendingPage = lazy(() => import("@pages/Trending"))

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path={PATH_NAMES.HOME}
          element={isMobile ? <MainLayoutMobile /> : <MainLayoutDesktop />}
        >
          <Route path={PATH_NAMES.HOME} element={<HomePage />} />
          {/* <Route
            path={PATH_NAMES.CHAT_DETAIL}
            element={isMobile ? <ChatPageMobile /> : <ChatBox />}
          /> */}
          <Route
            path={`${PATH_NAMES.CLAN}`}
            element={isMobile ? <AgentClansMobilePage /> : <AgentClansPage />}
          />
          <Route
            path={`${PATH_NAMES.CLAN}/:chatId`}
            element={isMobile ? <ChatClanBox /> : <AgentClansPage />}
          />

          <Route path={`${PATH_NAMES.STAKING}`} element={<StakePage />} />
          <Route
            path={`${PATH_NAMES.LIVE}/:chatId`}
            element={<ChatBoxLive />}
          />
          <Route
            path={`${PATH_NAMES.INVITE}/:inviteAgentId`}
            element={isMobile ? <ChatDetailLoadingPage /> : <ChatBox />}
          />
          {/* <Route
            path={`${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`}
            element={isMobile ? <ChatPageMobile /> : <ChatMyAgent />}
          /> */}
          <Route path={PATH_NAMES.MARKETPLACE} element={<AgentStorePage />} />
          <Route path={PATH_NAMES.ADD_MY_DATA} element={<AddMyData />} />
          <Route
            path={`${PATH_NAMES.AUTHOR_PROFILE}/:authorId`}
            element={<AuthorProfile />}
          />
          <Route
            path={`${PATH_NAMES.ORCHESTRATION}/:chatId`}
            element={<Orchestration />}
          />
          <Route
            path={`${PATH_NAMES.DAO}/:agentAddress/proposals`}
            element={<DaoPage />}
          />
          <Route
            path={`${PATH_NAMES.DAO}/:agentAddress/proposals/create`}
            element={<CreateProposal />}
          />
          <Route
            path={`${PATH_NAMES.DAO}/:agentAddress/proposals/:proposalId`}
            element={<ProposalsDetailPage />}
          />

          <Route
            path={PATH_NAMES.PRIVATE_AGENT}
            element={isMobile ? <ChatsAgent /> : <PrivateChatPage />}
          />
          <Route
            path={`${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`}
            element={isMobile ? <PrivateChatBox /> : <PrivateChatPage />}
          />

          <Route
            path={PATH_NAMES.CHAT_DETAIL}
            element={isMobile ? <PrivateChatBox /> : <PrivateChatPage />}
          />

          {/* {isMobile && (
            <Route path={PATH_NAMES.PRIVATE_AGENT} element={<AgentChats />} />
          )} */}
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
            <Route path={PATH_NAMES.CREATE_AGENT} element={<CreateAgent />} />
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
