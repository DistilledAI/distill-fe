import useWindowSize from "@hooks/useWindowSize"
import { twMerge } from "tailwind-merge"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"
import useJoinGroupLive from "@hooks/useJoinGroupLive"
import { lazy, useLayoutEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import HeaderBack from "@components/Layout/Header/HeaderBack"
import DynamicTitleMeta from "@components/DynamicTitleMeta"

const ChatLiveHeader = lazy(() => import("./ChatLiveHeader"))

const ChatBoxLive = () => {
  const { isMobile } = useWindowSize()
  const { chatId } = useParams()
  const navigate = useNavigate()

  const { groupDetailByLabel, isFetched } = useJoinGroupLive()

  useLayoutEffect(() => {
    if (chatId?.includes(" ")) {
      const newChatId = chatId.replace(/\s/g, "")
      navigate(`${PATH_NAMES.CLAN}/${newChatId}`)
    }
  }, [chatId])

  return (
    <>
      <DynamicTitleMeta title={groupDetailByLabel?.name || ""} />
      <div
        className={twMerge(
          "relative w-full bg-mercury-30 max-md:overflow-hidden md:z-[22] md:h-[calc(100dvh-68px)] md:bg-white md:px-6",
        )}
      >
        {isMobile ? (
          <>
            <HeaderBack onBack={() => navigate(PATH_NAMES.MY_AGENT_CLAN)}>
              <span className="line-clamp-1 text-16 font-bold text-mercury-950">
                {groupDetailByLabel?.name}
              </span>
            </HeaderBack>
            <ChatLiveHeader groupDetail={groupDetailByLabel} />
          </>
        ) : null}

        <div className="relative flex h-[calc(100dvh-120px)] w-full gap-2 max-lg:flex-col md:h-full md:gap-5 md:pb-4">
          <LeftContent groupDetail={groupDetailByLabel} isFetched={isFetched} />
          <RightContent isClan groupDetail={groupDetailByLabel} />
        </div>
      </div>
    </>
  )
}
export default ChatBoxLive
