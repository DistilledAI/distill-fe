import { distilledAiPlaceholder } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { EditFilledIcon } from "@components/Icons/DefiLens"
import { MessagePlusIcon } from "@components/Icons/Message"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const MyAgentHome = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const { connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous } = useAuthState()
  const navigate = useNavigate()
  const handleCreateAgent = () => {
    if (isLogin && !isAnonymous) {
      return navigate(PATH_NAMES.CREATE_AGENT)
    }
    return connectMultipleWallet()
  }

  return (
    <div className="relative flex w-full flex-1 flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-4 md:p-6">
      <div className="absolute left-6 top-3 max-md:hidden">
        <span className="text-[40px] font-bold text-mercury-200">1</span>
      </div>
      <div className="flex items-center gap-2 md:flex-col">
        <AvatarCustom
          src={myAgent?.avatar || distilledAiPlaceholder}
          alt="avatar"
          badgeIcon={<FilledBrainAIIcon color="#363636" size={14} />}
          badgeClassName="bg-[#FC0] "
          className="h-8 w-8 md:h-10 md:w-10"
        />
        <h3 className="my-2 text-18 font-semibold text-mercury-950 md:text-24">
          {myAgent?.username ? myAgent.username : "Create your new Agent"}
        </h3>
      </div>
      <h4 className="line-clamp-2 min-h-[48px] text-center text-14 text-mercury-800 md:text-16">
        {myAgent?.description ? (
          myAgent.description
        ) : (
          <>
            {" "}
            Train with your private data. <br /> Control or govern the agent
            wallet via DAO.
          </>
        )}
      </h4>
      {myAgent ? (
        <div className="mt-[24px] grid w-full grid-cols-2 gap-3">
          <Button
            onPress={() =>
              navigate(`${PATH_NAMES.PRIVATE_AGENT}/${myAgent.id}`)
            }
            className="h-[56px] w-full rounded-full bg-mercury-100 text-[16px] font-semibold text-mercury-950 max-md:h-[44px] max-md:text-15"
          >
            <MessagePlusIcon color="#363636" />
            Chat
          </Button>
          <Button
            onPress={() => navigate(`${PATH_NAMES.AGENT_DETAIL}/${myAgent.id}`)}
            className="h-[56px] w-full rounded-full bg-mercury-950 text-[16px] font-semibold text-mercury-30 max-md:h-[44px] max-md:text-14"
          >
            <EditFilledIcon color="white" />
            Edit Agent
          </Button>
        </div>
      ) : (
        <Button
          className="mt-4 h-[56px] w-full rounded-full bg-mercury-950 text-[16px] font-semibold text-mercury-30 max-md:h-[44px] max-md:text-15 md:mt-6"
          onPress={handleCreateAgent}
        >
          <>
            <span className="-mt-[2px] text-[24px] font-medium leading-none">
              +
            </span>
            Create Agent
          </>
        </Button>
      )}
    </div>
  )
}

export default MyAgentHome
