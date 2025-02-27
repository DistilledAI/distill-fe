// import AvatarContainer from "@components/AvatarContainer"
// import { LiveIcon } from "@components/Icons"
// import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
// import TotalMemberBadge from "@components/TotalMemberBadge"
// import { PATH_NAMES } from "@constants/index"
// import { Button } from "@nextui-org/react"
import ClanShortInfo from "@pages/Rank/ClanShortInfo"
import {
  GroupConfig,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import React from "react"
// import { useNavigate } from "react-router-dom"
// import { twMerge } from "tailwind-merge"
import AgentLiveInfo from "./AgentLiveInfo"
import VaultButton from "./VaultButton"
import { StakeTokenAddress } from "@pages/Stake"
import DaoButton from "./DaoButton"
// import TradeTokenButton from "./TradeTokenButton"
// import { getInfoTokenByAddress } from "@pages/Stake/helpers"

const ChatLiveHeader: React.FC<{
  groupDetail: UserGroup | null
}> = ({ groupDetail }) => {
  // const navigate = useNavigate()
  // const isLive = groupDetail ? groupDetail.group.live === 1 : false
  // const groupId = groupDetail?.groupId as any

  const groupConfig: GroupConfig | null = groupDetail?.group?.config
    ? JSON.parse(groupDetail.group.config)
    : null

  return (
    <>
      <div className="flex w-full items-center justify-end gap-2 bg-mercury-30 p-3 md:hidden">
        {/* <div className="flex flex-1 items-center gap-3">
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
        </div> */}
        <VaultButton
          key={groupConfig?.contractAddress}
          address={groupConfig?.contractAddress as StakeTokenAddress}
          className="mt-0 w-full"
        />
        <DaoButton
          address={groupConfig?.contractAddress as StakeTokenAddress}
        />
        <AgentLiveInfo groupDetail={groupDetail} />
      </div>
      <ClanShortInfo />
    </>
  )
}

export default ChatLiveHeader
