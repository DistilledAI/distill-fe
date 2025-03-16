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
import { TypeGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { Link, useLocation, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import MoreAction from "./MoreAction"
import OrchestrationHeader from "./OrchestrationHeader"
import { useAppSelector } from "@hooks/useAppRedux"
import { TabKeyAgent } from "@pages/CreateAgent/NavTab"
import { distilledAiPlaceholder } from "@assets/images"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import { getConfigClanValue } from "@utils/clanConfig"
import { getActiveColorRandomById } from "@utils/index"
import useGroupDetail from "@pages/ChatPageOld/hooks/useGroupDetail"
import useGroupDetailByLabel from "@pages/ChatPageOld/hooks/useGroupDetailByLabel"
import useMyAgentClan from "@pages/AgentClans/MyAgentClan/useMyAgentClan"

const ChatInfoCurrent = () => {
  const location = useLocation()
  const { chatId = "" } = useParams()
  const { user } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { group: clan } = useMyAgentClan()

  const { groupDetailByLabel } = useGroupDetailByLabel(
    clan?.status === 1 ? chatId : "",
  )
  const { groupDetail } = useGroupDetail(chatId)

  const newGroupDetail = groupDetailByLabel || groupDetail?.group

  const isGroup = newGroupDetail?.typeGroup === TypeGroup.PRIVATE_GROUP
  const isGroupPublic = newGroupDetail?.typeGroup === TypeGroup.PUBLIC_GROUP
  const isLive = isGroupPublic && newGroupDetail?.live === 1

  const isMyAgentClan = location.pathname.startsWith(PATH_NAMES.MY_AGENT_CLAN)
  const imageUrl = newGroupDetail
    ? getConfigClanValue(newGroupDetail, "imageLive")
    : ""

  const { textColor = "text-mercury-900" } = getActiveColorRandomById(chatId)

  if (!newGroupDetail) return null

  if (location.pathname.includes(PATH_NAMES.ORCHESTRATION)) {
    const conversationInfo = ORCHESTRATION_LIST.find(
      (item: any) => item.conversationId.toString() === chatId,
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
        conversationId={chatId}
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
              publicAddress={newGroupDetail.name}
              userName={newGroupDetail.name}
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
            memberFixed={newGroupDetail?.groupMemberStats?.total}
          />
        )}
        {/* <MoreAction
          groupId={groupDetail.groupId}
          groupType={groupDetail.group.typeGroup}
        /> */}
        <AgentShareButton
          agentInfo={{
            shareLink: `${window.location.origin}${PATH_NAMES.CLAN}/${newGroupDetail?.label}`,
            avatar: newGroupDetail.image,
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
        <AvatarGroup groupName={newGroupDetail.name} />
      ) : (
        <div className="flex items-center gap-2">
          <AvatarCustom
            src={getAvatarGroupChat(
              newGroupDetail?.createBy,
              newGroupDetail.userA,
              newGroupDetail.userB,
            )}
            publicAddress={getPublicAddressGroupChat(
              newGroupDetail?.createBy,
              newGroupDetail.userA,
              newGroupDetail.userB,
            )}
          />
          <span
            className={twMerge(
              "line-clamp-1 max-w-[150px] text-[14px] font-bold md:max-w-[250px] md:text-[16px]",
              textColor,
            )}
          >
            {getNameGroup(user, newGroupDetail.userA, newGroupDetail.userB)}
          </span>
        </div>
      )}
      <MoreAction
        groupId={newGroupDetail.id}
        groupType={newGroupDetail.typeGroup}
      />
    </div>
  )
}

export default ChatInfoCurrent
