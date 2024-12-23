import MainLayout from "@components/Layout/MainLayout"
import MainLayoutDesktop from "@components/Layout/MainLayoutDesktop"
import ProtectedByAuth from "@components/Layout/ProtectedByAuth"
import { ChatDetailLoadingPage } from "@components/LoadingMobile"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import Account from "@pages/Account"
import AddMyData from "@pages/AddMyData"
import AgentDetail from "@pages/AgentDetail"
import AuthorProfile from "@pages/AuthorProfile"
import ChatBoxLive from "@pages/ChatBoxLive"
import ChatMyAgent from "@pages/ChatMyAgent"
import ChatBox from "@pages/ChatPage/ChatBox"
import AgentInitialization from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization"
import ChatPageMobile from "@pages/ChatPage/Mobile"
import MyPrivateAgentContentMobile from "@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"
import Marketplace from "@pages/Marketplace"
import MyAgentPage from "@pages/MyAgents"
import MyData from "@pages/MyData"
import PageNotFound from "@pages/NotFound"
import RewardsPage from "@pages/Rewards"
import TrendingPage from "@pages/Trending"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Routes>
      <Route
        path={PATH_NAMES.HOME}
        //connect wallet modal
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
        <Route path={`${PATH_NAMES.CLAN}/:chatId`} element={<ChatBoxLive />} />
        <Route path={`${PATH_NAMES.LIVE}/:chatId`} element={<ChatBoxLive />} />
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
        {isMobile && (
          <>
            <Route
              path={PATH_NAMES.PRIVATE_AGENT}
              element={<MyPrivateAgentContentMobile />}
            />
          </>
        )}
        <Route path={PATH_NAMES.TRENDING} element={<TrendingPage />} />

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
  )
}

export default AppRouter
