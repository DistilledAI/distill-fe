import AvatarContainer from "@components/AvatarContainer"
import AvatarCustom from "@components/AvatarCustom"
import AvatarGroup from "@components/AvatarGroup"
import { LiveIcon } from "@components/Icons"
import useAuthState from "@hooks/useAuthState"
import {
  getAvatarGroupChat,
  getNameGroup,
  getPublicAddressGroupChat,
} from "@pages/ChatPage/ChatBox/LeftBar/helpers"
import {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import React from "react"
import { twMerge } from "tailwind-merge"
import MoreAction from "./MoreAction"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { useLocation } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import OrchestrationHeader from "./OrchestrationHeader"

const ChatInfoCurrent: React.FC<{
  groupDetail: UserGroup | null
  textColor?: string
}> = ({ groupDetail, textColor = "text-mercury-900" }) => {
  const { user } = useAuthState()
  const isGroup = groupDetail?.group?.typeGroup === TypeGroup.PRIVATE_GROUP
  const isGroupPublic = groupDetail?.group?.typeGroup === TypeGroup.PUBLIC_GROUP
  const isLive = isGroupPublic && groupDetail?.group?.live === 1
  const location = useLocation()

  if (!groupDetail) return null

  if (location.pathname.includes(PATH_NAMES.ORCHESTRATION)) {
    return <OrchestrationHeader />
  }

  if (isGroupPublic)
    return (
      <div className="flex items-center gap-2">
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
        />
        {isLive && (
          <TotalMemberBadge groupId={groupDetail.groupId.toString()} />
        )}
        <MoreAction
          groupId={groupDetail.groupId}
          groupType={groupDetail.group.typeGroup}
        />
      </div>
    )

  return (
    <div className="flex items-center gap-2">
      {isGroup ? (
        <AvatarGroup groupName={groupDetail.group.name} />
      ) : (
        <div className="flex items-center gap-2">
          <AvatarCustom
            src={getAvatarGroupChat(
              groupDetail.userId,
              groupDetail.group.userA,
              groupDetail.group.userB,
            )}
            publicAddress={getPublicAddressGroupChat(
              groupDetail.userId,
              groupDetail.group.userA,
              groupDetail.group.userB,
            )}
            className="h-9 w-9 md:h-10 md:w-10"
          />
          <span
            className={twMerge(
              "line-clamp-1 max-w-[150px] text-[14px] font-semibold md:max-w-[250px] md:text-[16px]",
              textColor,
            )}
          >
            {getNameGroup(
              user,
              groupDetail.group.userA,
              groupDetail.group.userB,
            )}
          </span>
        </div>
      )}
      <MoreAction
        groupId={groupDetail.groupId}
        groupType={groupDetail.group.typeGroup}
      />
    </div>
  )
}

export default ChatInfoCurrent
