import { distilledAiPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import PinClanButton from "./PinClanButton"
import { PATH_NAMES } from "@constants/index"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { usePinAgentClans } from "./useAgentPinClans"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"

const PinAgentClans = () => {
  const { chatId } = useParams<{ chatId?: string }>()
  const navigate = useNavigate()
  const { data: pinnedClans = [] } = usePinAgentClans()

  if (!pinnedClans.length) {
    return null
  }

  return (
    <div className="space-y-2 border-b border-dashed border-mercury-200 pb-2">
      {pinnedClans.map((item) => {
        const group = item.group

        const imageUrl = getConfigClanValue(group, "imageLive")

        return (
          <div
            key={group.id}
            className={twMerge(
              "flex w-full flex-1 cursor-pointer items-center justify-between gap-1 rounded-full p-2 hover:bg-mercury-100",
              chatId === group.label && "md:bg-mercury-100",
            )}
          >
            <div
              className="flex flex-1 items-center gap-2"
              onClick={() => navigate(`${PATH_NAMES.CLAN}/${group.label}`)}
            >
              <VideoThumbnailWrapper videoUrl={imageUrl}>
                {(thumbnail) => (
                  <AvatarClanByList
                    avatarUrl={thumbnail || distilledAiPlaceholder}
                    isNameDisplay={false}
                    name=""
                    className="h-8 w-8"
                    member={group.groupMemberStats?.total}
                  />
                )}
              </VideoThumbnailWrapper>
              <span className="line-clamp-1 max-w-[114px] break-all text-16 font-bold text-mercury-950">
                {group.name}
              </span>
            </div>
            <PinClanButton groupId={group.id} />
          </div>
        )
      })}
    </div>
  )
}

export default PinAgentClans
