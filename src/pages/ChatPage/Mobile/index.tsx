import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useOutsideClick from "@hooks/useOutSideClick"
import { Button, ScrollShadow } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SearchResult from "../ChatBox/LeftBar/SearchContainer/Result"
import useSearch from "../ChatBox/LeftBar/SearchContainer/useSearch"
import ChatDetail from "./ChatDetail"
import useGetChatId from "../hooks/useGetChatId"
import ChatList from "./ChatList"
import ChatSearch from "./ChatSearch"
import VideoCustom from "@components/VideoCustom"
import ChatClans from "../ChatBox/LeftBar/Clans"

const ChatPageMobile = () => {
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const { isLogin } = useAuthState()
  const [isSearch, setIsSearch] = useState(false)
  const inputRef = useRef<any>(null)
  const searchRef = useRef<any>(null)
  useOutsideClick(searchRef, () => setIsSearch(false))
  const { data, setQuery, query, debounceSearch } = useSearch(inputRef, false)
  const navigate = useNavigate()
  const groupChatId = chatId || privateChatId

  useEffect(() => {
    if (groupChatId && !isLogin) navigate("/")
  }, [isLogin, groupChatId])

  if (!isLogin) return <StartNewChat />

  return groupChatId ? (
    <ChatDetail />
  ) : (
    <div className="min-h-[calc(100dvh-110px)] bg-mercury-30 font-barlow">
      <div
        ref={searchRef}
        className="fixed left-0 top-[50px] z-10 w-full bg-[rgba(255,255,255,0.85)] px-4 py-1 backdrop-blur-[10px]"
      >
        <ChatSearch
          inputRef={inputRef}
          debounceSearch={debounceSearch}
          query={query}
          setQuery={setQuery}
          setIsSearch={setIsSearch}
        />
        {isSearch && (
          <div className="absolute left-0 top-[100%] max-h-[calc(100dvh-300px)] w-full rounded-b-xl bg-white px-2 shadow-lg">
            <ScrollShadow className="max-h-[calc(100dvh-300px)]">
              <SearchResult data={data} />
            </ScrollShadow>
          </div>
        )}
      </div>
      <div className="flex h-[calc(100dvh-110px)] w-full flex-col bg-[rgba(255,255,255,0.85)] pt-[56px]">
        <div className="px-4 pb-2">
          <ChatClans />
        </div>
        <div className="flex-1">
          <ChatList />
        </div>
      </div>
    </div>
  )
}

export const StartNewChat = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white p-4 text-center">
      <div className="mb-7 w-full overflow-hidden rounded-lg">
        <VideoCustom videoSrc={distilledAiPrivateAgent} />
      </div>
      <p className="mb-2 text-24 font-semibold">Start a new chat</p>
      <p className="text-14">
        Explore the <span className="font-medium">Marketplace</span> to chat
        with a public agent, interact with an AI Companion, or create your own.
      </p>
      <Button
        onPress={() => navigate(PATH_NAMES.MARKETPLACE)}
        className="mt-6 h-[46px] min-w-[200px] rounded-full bg-neutral-950 text-[16px] text-white"
      >
        Go to Marketplace
      </Button>
    </div>
  )
}

export default ChatPageMobile
