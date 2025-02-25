import useWindowSize from "@hooks/useWindowSize"
import { twMerge } from "tailwind-merge"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import useJoinGroupLive from "@hooks/useJoinGroupLive"
import { lazy, useLayoutEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

const ChatLiveHeader = lazy(() => import("./ChatLiveHeader"))

const ChatBoxLive = () => {
  const { isMobile } = useWindowSize()
  const { chatId } = useParams()
  const navigate = useNavigate()

  useJoinGroupLive()
  const { groupDetail, isFetched } = useGroupDetail()

  useLayoutEffect(() => {
    if (chatId?.includes(" ")) {
      const newChatId = chatId.replace(/\s/g, "")
      navigate(`${PATH_NAMES.CLAN}/${newChatId}`)
    }
  }, [chatId])

  return (
    <div
      className={twMerge(
        "relative h-[calc(100dvh-50px)] w-full bg-mercury-30 max-md:overflow-hidden md:z-[22] md:h-[calc(100dvh-68px)] md:bg-white md:px-6",
      )}
    >
      {isMobile ? <ChatLiveHeader groupDetail={groupDetail} /> : null}

      <div className="flex h-full w-full gap-2 pb-4 max-lg:flex-col md:gap-5">
        <LeftContent groupDetail={groupDetail} isFetched={isFetched} />
        <RightContent isClan groupDetail={groupDetail} />
      </div>
    </div>
  )
}
export default ChatBoxLive
