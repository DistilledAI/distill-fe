import useWindowSize from "@hooks/useWindowSize"
import { twMerge } from "tailwind-merge"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import useJoinGroupLive from "@hooks/useJoinGroupLive"
import { lazy } from "react"

const ChatLiveHeader = lazy(() => import("./ChatLiveHeader"))

const ChatBoxLive = () => {
  const { isMobile } = useWindowSize()
  useJoinGroupLive()
  const { groupDetail, isFetched } = useGroupDetail()

  return (
    <div
      className={twMerge(
        "relative mx-auto h-[calc(100dvh-50px)] max-w-[1232px] bg-mercury-30 max-md:overflow-hidden md:z-[22] md:h-[calc(100dvh-68px)] md:bg-white md:px-6",
      )}
    >
      {isMobile ? <ChatLiveHeader groupDetail={groupDetail} /> : null}

      <div className="flex h-full gap-2 pb-4 max-lg:flex-col md:gap-5">
        <LeftContent groupDetail={groupDetail} isFetched={isFetched} />
        <RightContent isClan groupDetail={groupDetail} />
      </div>
    </div>
  )
}
export default ChatBoxLive
