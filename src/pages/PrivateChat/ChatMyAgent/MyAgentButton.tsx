import { maxAvatarPlaceholder } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import ActiveEffect from "@pages/ChatPage/ChatContainer/LeftBar/ActiveEffect"
import { useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MyPrivateAgent = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isSelected = pathname.startsWith(PATH_NAMES.PRIVATE_AGENT)
  const myAgentId = myAgent?.id

  return (
    <button
      type="button"
      className={twMerge(
        "relative flex h-14 w-full items-center gap-3 rounded-full px-2 hover:bg-mercury-100",
        isSelected && "md:bg-mercury-100",
      )}
      onClick={() =>
        myAgentId
          ? navigate(`${PATH_NAMES.PRIVATE_AGENT}/${myAgentId}`)
          : navigate(`${PATH_NAMES.PRIVATE_AGENT}/empty`)
      }
    >
      <div className="relative flex-shrink-0">
        <img
          src={myAgent?.avatar || maxAvatarPlaceholder}
          className="h-10 w-10 rounded-full object-cover"
          alt="avatar placeholder"
        />
        <div className="absolute bottom-[-2px] right-[-2px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FC0]">
          <FilledBrainAIIcon size={14} />
        </div>
      </div>
      <span className="line-clamp-2 text-left text-16 font-bold text-mercury-950">
        {myAgent?.username || "Agent name"}
      </span>
      <ActiveEffect
        isActive={isSelected}
        className="-left-3 hidden bg-lgd-code-agent-3 md:block"
      />
    </button>
  )
}

export default MyPrivateAgent
