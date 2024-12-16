import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { AGENT_TYPE, updateAgentType } from "@reducers/agentSlice"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import ActiveEffect from "./ActiveEffect"
import AvatarCustom from "@components/AvatarCustom"
import { Skeleton } from "@nextui-org/react"

const MyEcho: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { privateChatId } = useParams()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const fetchStatus = useAppSelector(
    (state) => state.agents.isStatusFetchMyAgent,
  )
  const isFetching = fetchStatus === "fetching"

  const isActive = [
    PATH_NAMES.HOME,
    PATH_NAMES.PRIVATE_AGENT + "/" + privateChatId,
  ].includes(location.pathname)

  const handleChooseMyEcho = () => {
    navigate("/")
    dispatch(updateAgentType(AGENT_TYPE.MY_ECHO))
  }

  if (isFetching)
    return (
      <Skeleton
        className={twMerge("h-14 rounded-full", sidebarCollapsed && "w-14")}
      />
    )

  return (
    <div
      className={twMerge(
        "relative flex h-14 cursor-pointer items-center gap-2 rounded-full border-white bg-mercury-30 px-2 py-4",
        !!isActive && "border-mercury-100 bg-mercury-950 text-mercury-30",
        !isActive && "hover-light-effect",
        sidebarCollapsed && "w-14 justify-center",
      )}
      onClick={() => handleChooseMyEcho()}
    >
      <div
        className={twMerge(
          "flex items-center gap-3",
          sidebarCollapsed && "gap-0",
        )}
      >
        <div className="relative">
          {!myAgent ? (
            <div className="relative h-10 w-10 rounded-full border-1 border-mercury-400 bg-mercury-100">
              <span className="absolute left-1/2 top-1/2 h-[16px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mercury-900"></span>
              <span className="absolute left-1/2 top-1/2 h-[2px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mercury-900"></span>
            </div>
          ) : (
            <AvatarCustom
              src={myAgent?.avatar || undefined}
              publicAddress={myAgent?.publicAddress || myAgent?.username}
            />
          )}
          <div className="absolute bottom-[-3px] right-[-3px] flex h-5 w-5 items-center justify-center rounded-full bg-mercury-950">
            <FilledBrainAIIcon size={15} color="white" />
          </div>
        </div>
        <div>
          <p
            className={twMerge(
              "whitespace-nowrap text-16 font-semibold text-mercury-950 duration-300",
              isActive && "text-white",
              sidebarCollapsed && "hidden",
            )}
          >
            {!myAgent ? "Create AI Agent" : "My Private Agent"}
          </p>
          <p
            className={twMerge(
              "line-clamp-1 max-w-[200px] leading-4 text-mercury-700 duration-300",
              isActive && "text-[rgba(255,255,255,0.7)]",
              sidebarCollapsed && "hidden",
            )}
            style={{ fontSize: 13 }}
          >
            {!myAgent ? "Start your own private agent" : myAgent?.description}
          </p>
        </div>
      </div>

      <ActiveEffect isActive={isActive} className="bg-mercury-950" />
    </div>
  )
}
export default MyEcho
