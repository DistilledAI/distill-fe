import { useAppSelector } from "@hooks/useAppRedux"
import useWindowSize from "@hooks/useWindowSize"
import { IMessageBox } from "@pages/ChatPageOld/ChatContainer/ChatMessages/helpers"
import { IGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { useQuery } from "@tanstack/react-query"
import React, { lazy, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import ListMessage from "./ListMessage"
import SendMessage from "./SendMessage"
import { useGroupConfig } from "./useGroupConfig"
import useGroupDetailByLabel from "@pages/ChatPageOld/hooks/useGroupDetailByLabel"
import { useParams } from "react-router-dom"
import { LikedAgentMessage } from "@pages/AgentClans/ChatBoxLive/LikedAgentMessage"
import { getYouTubeId } from "./helpers"
import { CLAN_CONFIG_KEYS } from "@pages/AgentDetail/AgentContent/ClanUtilities/types"

const ClanShortInfo = lazy(() => import("@pages/Rank/ClanShortInfo"))
const ToggleActionsMobile = lazy(() => import("./ToggleActionsMobile"))
// const InstructionBanner = lazy(() => import("./InstructionBanner"))

const RightContent: React.FC<{
  isClan?: boolean
  groupDetail?: IGroup | null
  groupDetailError?: boolean
}> = ({ isClan = false, groupDetail, groupDetailError }) => {
  const { isMobile } = useWindowSize()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  // const instructBanner = useAppSelector((state) => state.instructBanner)
  const { chatId = " " } = useParams()
  const { groupId } = useGroupDetailByLabel(chatId)
  const [replyUsername, setReplyUsername] = useState<string>("")
  const [replyId, setReplyId] = useState<number>(NaN)
  const [replyTxt, setReplyTxt] = useState<string>("")
  const [hasFocus, setHasFocus] = useState(false)
  const groupConfig = useGroupConfig(groupDetail as IGroup)
  const youtubeId = getYouTubeId(
    groupConfig[CLAN_CONFIG_KEYS.IMAGES_LIVE] || "",
  )

  const resetReply = () => {
    setReplyId(NaN)
    setReplyUsername("")
    setReplyTxt("")
  }

  const { data: isCloseLiveChat = false } = useQuery<boolean>({
    queryKey: [QueryDataKeys.CLOSE_LIVE_CHAT],
    staleTime: 0,
  })
  // const { data: isExpandLiveChat } = useQuery<boolean>({
  //   queryKey: [QueryDataKeys.EXPAND_LIVE_CHAT],
  //   staleTime: 0,
  // })

  return (
    <div
      className={twMerge(
        "relative flex-1",
        "z-[11] bg-white max-md:rounded-[14px] max-md:border-t max-md:border-t-white max-md:shadow-7",
        "md:px-5",
        "max-2xl:px-0",
        "max-md:h-full",
        // !isExpandLiveChat ? "max-md:h-[27%]" : "max-md:h-[89%]",
        // isCloseLiveChat &&
        //   "w-full flex-none max-md:absolute max-md:bottom-0 max-md:h-[115px] md:flex-1",
      )}
    >
      {isMobile && <ToggleActionsMobile groupDetail={groupDetail} />}
      {!isMobile && isClan && <ClanShortInfo />}
      <LikedAgentMessage groupId={groupId} youtubeId={youtubeId} />

      <ListMessage
        onReply={(message: IMessageBox) => {
          setHasFocus(true)
          setReplyId(message.id as number)
          setReplyTxt(message.content)
          setReplyUsername(
            message.username ? `@[${message.username}] ` : "@[Unnamed] ",
          )
        }}
        chatId={groupId}
        isClan={isClan}
        isCloseLiveChat={isCloseLiveChat}
        groupDetailError={groupDetailError}
      />
      <SendMessage
        sidebarCollapsed={sidebarCollapsed}
        tradeLink={groupConfig?.tradeLink as string}
        resetReply={resetReply}
        chatId={groupId}
        replyId={replyId}
        replyTxt={replyTxt}
        replyUsername={replyUsername}
        isClan={isClan}
        hasFocus={hasFocus}
        setHasFocus={setHasFocus}
      />
      {/* {instructBanner && <InstructionBanner />} */}
    </div>
  )
}
export default RightContent
