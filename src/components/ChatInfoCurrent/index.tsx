import AvatarContainer from "@components/AvatarContainer"
import AvatarCustom from "@components/AvatarCustom"
import AvatarGroup from "@components/AvatarGroup"
import { LiveIcon } from "@components/Icons"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import AgentShareButton from "@pages/ChatBoxLive/AgentShareButton"
import {
  getAvatarGroupChat,
  getNameGroup,
  getPublicAddressGroupChat,
} from "@pages/ChatPage/ChatContainer/LeftBar/helpers"
import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatContainer/LeftBar/OrchestrationSlider"
import {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import React from "react"
import { useLocation, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import MoreAction from "./MoreAction"
import OrchestrationHeader from "./OrchestrationHeader"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"

const ChatInfoCurrent: React.FC<{
  groupDetail: UserGroup | null
  textColor?: string
}> = ({ groupDetail, textColor = "text-mercury-900" }) => {
  const { user } = useAuthState()
  const isGroup = groupDetail?.group?.typeGroup === TypeGroup.PRIVATE_GROUP
  const isGroupPublic = groupDetail?.group?.typeGroup === TypeGroup.PUBLIC_GROUP
  const isLive = isGroupPublic && groupDetail?.group?.live === 1
  const location = useLocation()
  const { chatId: conversationId } = useParams()

  if (!groupDetail) return null

  if (location.pathname.includes(PATH_NAMES.ORCHESTRATION)) {
    const conversationInfo = ORCHESTRATION_LIST.find(
      (item: any) => item.conversationId.toString() === conversationId,
    )

    return (
      <OrchestrationHeader
        agent1={{
          avatar: conversationInfo?.agent1.avatar,
          publicAddress: conversationInfo?.agent1.contractAddress,
        }}
        agent2={{
          avatar: conversationInfo?.agent2.avatar,
          publicAddress: conversationInfo?.agent2.contractAddress,
        }}
        name={conversationInfo?.name || "-"}
        tag={conversationInfo?.tag || "-"}
        conversationId={conversationId}
        classNames={{
          textContainer: "flex gap-2",
        }}
      />
    )
  }

  if (isGroupPublic)
    return (
      <div className="flex items-center gap-2">
        <AvatarContainer
          badgeIcon={<LiveIcon />}
          avatarUrl={getConfigClanValue(groupDetail.group, "imageLive")}
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
        <AgentShareButton
          agentInfo={{
            shareLink: `${window.location.origin}${PATH_NAMES.CLAN}/${groupDetail?.group?.label}`,
            avatar: groupDetail.group.image,
          }}
          buttonClassName="w-fit !p-0 !bg-white !min-w-[40px]"
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
          />
          <span
            className={twMerge(
              "line-clamp-1 max-w-[150px] text-[14px] font-bold md:max-w-[250px] md:text-[16px]",
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
