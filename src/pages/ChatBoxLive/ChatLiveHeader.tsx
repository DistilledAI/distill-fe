import AvatarContainer from "@components/AvatarContainer"
import { LiveIcon } from "@components/Icons"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import ClanShortInfo from "@pages/AgentClan/ClanShortInfo"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import React from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import AgentLiveInfo from "./AgentLiveInfo"

const ChatLiveHeader: React.FC<{
  groupDetail: UserGroup | null
}> = ({ groupDetail }) => {
  const navigate = useNavigate()
  const isLive = groupDetail ? groupDetail.group.live === 1 : false
  const groupId = groupDetail?.groupId as any

  return (
    <>
      <div className="flex w-full items-center gap-3 bg-mercury-30 px-3 py-1 md:hidden">
        <div className="flex flex-1 items-center gap-3">
          <Button
            onPress={() => navigate(PATH_NAMES.HOME)}
            className="h-8 w-8 min-w-8 rotate-90 rounded-full bg-mercury-70 p-0"
          >
            <ChevronDownIcon />
          </Button>
          {groupDetail ? (
            <AvatarContainer
              badgeIcon={<LiveIcon />}
              avatarUrl={groupDetail.group.image}
              publicAddress={groupDetail.group.name}
              userName={groupDetail.group.name}
              badgeClassName={isLive ? "bg-lgd-code-hot-ramp" : ""}
              isLive={isLive}
              usernameClassName={twMerge(
                isLive &&
                  "bg-lgd-code-hot-ramp bg-clip-text text-transparent font-bold text-[16px]",
              )}
              avatarClassName="w-7 h-7"
            />
          ) : (
            <></>
          )}
          {isLive && <TotalMemberBadge groupId={groupId.toString()} />}
        </div>
        <AgentLiveInfo groupDetail={groupDetail} />
      </div>
      <ClanShortInfo />
    </>
  )
}

export default ChatLiveHeader
