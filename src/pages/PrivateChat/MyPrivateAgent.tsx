import { maxAvatarPlaceholder } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import ActiveEffect from "@pages/ChatPage/ChatBox/LeftBar/ActiveEffect"
import { useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MyPrivateAgent = () => {
  const { pathname } = useLocation()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isSelected = pathname.startsWith(PATH_NAMES.PRIVATE_AGENT)

  return (
    <button
      type="button"
      className={twMerge(
        "relative flex h-14 w-full items-center gap-3 rounded-full px-2 hover:bg-mercury-100",
        isSelected && "bg-mercury-100",
      )}
      onClick={() =>
        // agentNameJoin
        //   ? navigate(`${PATH_NAMES.CLAN}/@${agentNameJoin}`)
        //   : navigate(PATH_NAMES.CLAN)
        // navigate(PATH_NAMES.CLAN)
        null
      }
    >
      <div className="relative flex-shrink-0">
        <img
          src={myAgent?.avatar || maxAvatarPlaceholder}
          className="h-10 w-10 rounded-full"
          alt="avatar placeholder"
        />
        <div className="absolute bottom-[-2px] right-[-2px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FC0]">
          <FilledBrainAIIcon size={14} />
        </div>
      </div>
      <span className="line-clamp-2 text-left text-16 font-bold text-mercury-950">
        {myAgent?.username || "Clan name"}
      </span>
      <ActiveEffect isActive={true} className="-left-3 bg-lgd-code-agent-3" />
    </button>
  )
}

export default MyPrivateAgent
