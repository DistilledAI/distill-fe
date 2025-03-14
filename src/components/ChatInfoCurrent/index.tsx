import AvatarContainer from "@components/AvatarContainer"
import AvatarCustom from "@components/AvatarCustom"
import AvatarGroup from "@components/AvatarGroup"
import { LiveIcon } from "@components/Icons"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import AgentShareButton from "@pages/AgentClans/ChatBoxLive/AgentShareButton"
import {
  getAvatarGroupChat,
  getNameGroup,
  getPublicAddressGroupChat,
} from "@pages/ChatPageOld/ChatContainer/LeftBar/helpers"
import { ORCHESTRATION_LIST } from "@pages/ChatPageOld/ChatContainer/LeftBar/OrchestrationSlider"
import {
  IGroup,
  TypeGroup,
} from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import MoreAction from "./MoreAction"
import OrchestrationHeader from "./OrchestrationHeader"
import { useAppSelector } from "@hooks/useAppRedux"
import { TabKeyAgent } from "@pages/CreateAgent/NavTab"
import { distilledAiPlaceholder } from "@assets/images"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import { getConfigClanValue } from "@utils/clanConfig"

const ChatInfoCurrent: React.FC<{
  groupDetail: IGroup | null
  textColor?: string
}> = ({ groupDetail, textColor = "text-mercury-900" }) => {
  const { user } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isGroup = groupDetail?.typeGroup === TypeGroup.PRIVATE_GROUP
  const isGroupPublic = groupDetail?.typeGroup === TypeGroup.PUBLIC_GROUP
  const isLive = isGroupPublic && groupDetail?.live === 1
  const location = useLocation()
  const isMyAgentClan = location.pathname.startsWith(PATH_NAMES.MY_AGENT_CLAN)
  const { chatId: conversationId } = useParams()
  const imageUrl = groupDetail
    ? getConfigClanValue(groupDetail, "imageLive")
    : ""

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
        <VideoThumbnailWrapper videoUrl={imageUrl ?? null} size={32} time={0}>
          {(thumbnail) => (
            <AvatarContainer
              badgeIcon={<LiveIcon />}
              avatarUrl={thumbnail || distilledAiPlaceholder}
              publicAddress={groupDetail.name}
              userName={groupDetail.name}
              badgeClassName={isLive ? "bg-lgd-code-hot-ramp" : ""}
              isLive={isLive}
              usernameClassName={twMerge(
                isLive &&
                  "bg-lgd-code-hot-ramp bg-clip-text text-transparent font-bold text-[16px]",
              )}
            />
          )}
        </VideoThumbnailWrapper>

        {isLive && (
          <TotalMemberBadge
            memberFixed={groupDetail?.groupMemberStats?.total}
          />
        )}
        {/* <MoreAction
          groupId={groupDetail.groupId}
          groupType={groupDetail.group.typeGroup}
        /> */}
        <AgentShareButton
          agentInfo={{
            shareLink: `${window.location.origin}${PATH_NAMES.CLAN}/${groupDetail?.label}`,
            avatar: groupDetail.image,
          }}
          buttonClassName="w-fit !p-0 !bg-white !min-w-[40px]"
        />
        {isMyAgentClan && (
          <Link
            to={`${PATH_NAMES.AGENT_DETAIL}/${myAgent?.id}?tab=${TabKeyAgent.ClanUtilities}`}
            className="inline-flex h-[30px] cursor-pointer items-center rounded-full bg-mercury-950 px-3 text-14 font-bold text-white"
          >
            Edit Clan
          </Link>
        )}
      </div>
    )

  return (
    <div className="flex items-center gap-2">
      {isGroup ? (
        <AvatarGroup groupName={groupDetail.name} />
      ) : (
        <div className="flex items-center gap-2">
          <AvatarCustom
            src={getAvatarGroupChat(
              groupDetail?.userId,
              groupDetail.userA,
              groupDetail.userB,
            )}
            publicAddress={getPublicAddressGroupChat(
              groupDetail?.userId,
              groupDetail.userA,
              groupDetail.userB,
            )}
          />
          <span
            className={twMerge(
              "line-clamp-1 max-w-[150px] text-[14px] font-bold md:max-w-[250px] md:text-[16px]",
              textColor,
            )}
          >
            {getNameGroup(user, groupDetail.userA, groupDetail.userB)}
          </span>
        </div>
      )}
      <MoreAction groupId={groupDetail.id} groupType={groupDetail.typeGroup} />
    </div>
  )
}

export default ChatInfoCurrent
