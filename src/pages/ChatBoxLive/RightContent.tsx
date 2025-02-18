import { useAppSelector } from "@hooks/useAppRedux"
import useWindowSize from "@hooks/useWindowSize"
import { IMessageBox } from "@pages/ChatPage/ChatContainer/ChatMessages/helpers"
import {
  GroupConfig,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"
import { useQuery } from "@tanstack/react-query"
import React, { lazy, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import ListMessage from "./ListMessage"
import SendMessage from "./SendMessage"

const ClanShortInfo = lazy(() => import("@pages/Rank/ClanShortInfo"))
const ToggleActionsMobile = lazy(() => import("./ToggleActionsMobile"))
const InstructionBanner = lazy(() => import("./InstructionBanner"))

const RightContent: React.FC<{
  isClan?: boolean
  groupDetail?: UserGroup | null
}> = ({ isClan = false, groupDetail }) => {
  const { isMobile } = useWindowSize()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const instructBanner = useAppSelector((state) => state.instructBanner)
  const { chatId } = useGetChatId()
  const [replyUsername, setReplyUsername] = useState<string>("")
  const [replyId, setReplyId] = useState<number>(NaN)
  const [replyTxt, setReplyTxt] = useState<string>("")
  const [hasFocus, setHasFocus] = useState(false)
  const groupConfig: GroupConfig | null = groupDetail?.group?.config
    ? JSON.parse(groupDetail.group.config)
    : null

  const resetReply = () => {
    setReplyId(NaN)
    setReplyUsername("")
    setReplyTxt("")
  }

  const { data: isCloseLiveChat = false } = useQuery<boolean>({
    queryKey: [QueryDataKeys.CLOSE_LIVE_CHAT],
    staleTime: 0,
  })
  const { data: isExpandLiveChat } = useQuery<boolean>({
    queryKey: [QueryDataKeys.EXPAND_LIVE_CHAT],
    staleTime: 0,
  })

  return (
    <div
      className={twMerge(
        "flex-1",
        "z-[11] bg-white max-md:rounded-[14px] max-md:border-t max-md:border-t-white max-md:shadow-7",
        "md:px-5",
        "max-2xl:px-0",
        !isExpandLiveChat ? "max-md:h-[27%]" : "max-md:h-[89%]",
        isCloseLiveChat &&
          "w-full flex-none max-md:absolute max-md:bottom-0 max-md:h-[115px] md:flex-1",
      )}
    >
      {isMobile && <ToggleActionsMobile />}
      {!isMobile && isClan && <ClanShortInfo />}
      <ListMessage
        onReply={(message: IMessageBox) => {
          setHasFocus(true)
          setReplyId(message.id as number)
          setReplyTxt(message.content)
          setReplyUsername(
            message.username ? `@[${message.username}] ` : "@[Unnamed] ",
          )
        }}
        chatId={chatId}
        isClan={isClan}
        isCloseLiveChat={isCloseLiveChat}
      />
      <SendMessage
        sidebarCollapsed={sidebarCollapsed}
        tradeLink={groupConfig?.tradeLink as string}
        resetReply={resetReply}
        chatId={chatId}
        replyId={replyId}
        replyTxt={replyTxt}
        replyUsername={replyUsername}
        isClan={isClan}
        hasFocus={hasFocus}
        setHasFocus={setHasFocus}
      />
      {instructBanner && <InstructionBanner />}
    </div>
  )
}
export default RightContent
