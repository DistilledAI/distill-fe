import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import ActiveEffect from "@pages/ChatPage/ChatContainer/LeftBar/ActiveEffect"
import { twMerge } from "tailwind-merge"
import { PATH_NAMES } from "@constants/index"
import { useNavigate } from "react-router-dom"
import useAgentClanData from "./useAgentClanData"
import useWindowSize from "@hooks/useWindowSize"

const MyAgentClanButton = () => {
  const navigate = useNavigate()
  const { imageUrl, nameAgentClan, isSelected, group } = useAgentClanData()
  const { isMobile } = useWindowSize()

  const handleClick = () => {
    if (nameAgentClan) {
      navigate(`${PATH_NAMES.MY_AGENT_CLAN}/${nameAgentClan}`)
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
        "relative flex h-[64px] w-full items-center gap-4 rounded-full px-3 hover:bg-mercury-100",
        isSelected && "md:bg-mercury-100",
      )}
      onClick={handleClick}
    >
      <AvatarClanByList
        avatarUrl={imageUrl || maxAvatarPlaceholder}
        isNameDisplay={false}
        name=""
        className="h-8 w-8"
        member={group?.groupMemberStats?.total || 0}
      />
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
