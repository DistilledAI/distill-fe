import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import ActiveEffect from "@pages/ChatPage/ChatContainer/LeftBar/ActiveEffect"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MyAgentClan = () => {
  const navigate = useNavigate()
  const agent = useAppSelector((state) => state.agents.myAgent)
  const { chatId } = useParams()
  const agentNameJoin = agent?.username?.split(" ")?.join("")
  const isSelected = chatId === `@${agentNameJoin}` || !chatId

  return (
    <button
      type="button"
      className={twMerge(
        "relative flex h-[64px] w-full items-center gap-4 rounded-full px-3 hover:bg-mercury-100",
        isSelected && "md:bg-mercury-100",
      )}
      onClick={() =>
        // agentNameJoin
        //   ? navigate(`${PATH_NAMES.CLAN}/@${agentNameJoin}`)
        //   : navigate(PATH_NAMES.CLAN)
        navigate(PATH_NAMES.CLAN)
      }
    >
      <AvatarClanByList
        avatarUrl={agent?.avatar || maxAvatarPlaceholder}
        isNameDisplay={false}
        name=""
        className="h-8 w-8"
      />
      <span className="line-clamp-2 text-left text-16 font-bold text-mercury-950">
        {agent?.username || "Clan name"}
      </span>
      <ActiveEffect
        isActive={isSelected}
        className="-left-3 hidden bg-lgd-code-hot-ramp md:block"
      />
    </button>
  )
}

export default MyAgentClan
