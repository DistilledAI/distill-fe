import { distilledAiPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import ActiveEffect from "@pages/ChatPageOld/ChatContainer/LeftBar/ActiveEffect"
import { twMerge } from "tailwind-merge"
import { PATH_NAMES } from "@constants/index"
import { useNavigate } from "react-router-dom"
import useMyAgentClan from "./useMyAgentClan"
import useWindowSize from "@hooks/useWindowSize"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"

const MyAgentClanButton = () => {
  const navigate = useNavigate()
  const { imageUrl, labelAgentClan, isSelected, group } = useMyAgentClan()
  const { isMobile } = useWindowSize()

  const handleClick = () => {
    if (labelAgentClan) {
      navigate(`${PATH_NAMES.MY_AGENT_CLAN}/${labelAgentClan}`)
    } else {
      if (!isMobile) {
        navigate(PATH_NAMES.MY_AGENT_CLAN)
      } else {
        navigate(`${PATH_NAMES.MY_AGENT_CLAN}/empty`)
      }
    }
  }

  return (
    <button
      type="button"
      className={twMerge(
        "relative flex h-[64px] w-full items-center gap-2 rounded-full px-3 hover:bg-mercury-100",
        isSelected && "md:bg-mercury-100",
      )}
      onClick={handleClick}
    >
      <VideoThumbnailWrapper videoUrl={imageUrl} size={32} time={0}>
        {(thumbnail) => (
          <AvatarClanByList
            avatarUrl={thumbnail || distilledAiPlaceholder}
            isNameDisplay={false}
            name=""
            className="h-8 w-8"
            member={group?.groupMemberStats?.total || 0}
          />
        )}
      </VideoThumbnailWrapper>

      <span className="line-clamp-2 text-left text-16 font-bold text-mercury-950">
        {group?.name || "Clan name"}
      </span>
      <ActiveEffect
        isActive={isSelected}
        className="-left-3 hidden bg-lgd-code-hot-ramp md:block"
      />
    </button>
  )
}

export default MyAgentClanButton
