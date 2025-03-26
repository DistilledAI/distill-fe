import { distilledAiPlaceholder } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import ActiveEffect from "@pages/ChatPageOld/ChatContainer/LeftBar/ActiveEffect"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MyPrivateAgentButton = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { privateChatId } = useParams()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const myAgentId = myAgent?.id

  const isSelected =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) ||
    (!!myAgent?.id && pathname.startsWith(PATH_NAMES.INVITE))

  return (
    <button
      type="button"
      className={twMerge(
        "relative flex h-14 w-full items-center gap-3 rounded-full px-2 hover:bg-mercury-100",
        isSelected && "md:bg-mercury-100",
      )}
      onClick={() => {
        if (!privateChatId) {
          if (myAgentId) {
            return navigate(`${PATH_NAMES.INVITE}/${myAgentId}`)
          }
          navigate(`${PATH_NAMES.PRIVATE_AGENT}/empty`)
        }
      }}
    >
      <div className="relative flex-shrink-0">
        <img
          src={myAgent?.avatar || distilledAiPlaceholder}
          className="h-10 w-10 rounded-full border border-mercury-400 object-cover"
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

export default MyPrivateAgentButton
