import { avaMaxGray } from "@assets/images"
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
      <div className="absolute left-6 top-3">
        <span className="text-[40px] font-bold text-mercury-200">1</span>
      </div>
      <div className="flex items-center gap-2 md:flex-col">
        <div className="relative h-10 w-10 rounded-full border-1 border-mercury-400">
          <img
            className="h-full w-full rounded-full object-cover"
            src={myAgent?.avatar ? myAgent.avatar : avaMaxGray}
            alt="ava"
          />
          <div className="absolute -right-[6px] bottom-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FC0]">
            <FilledBrainAIIcon color="#363636" size={14} />
          </div>
        </div>
        <h3 className="my-2 text-20 font-semibold text-mercury-950 md:text-24">
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
            className="h-[56px] w-full rounded-full bg-mercury-100 text-[16px] font-semibold text-mercury-950"
          >
            <MessagePlusIcon color="#363636" />
            Chat
          </Button>
          <Button
            onPress={() => navigate(`${PATH_NAMES.AGENT_DETAIL}/${myAgent.id}`)}
            className="h-[56px] w-full rounded-full bg-mercury-950 text-[16px] font-semibold text-mercury-30"
          >
            <EditFilledIcon color="white" />
            Edit Agent
          </Button>
        </div>
      ) : (
        <Button
          className="mt-4 h-[56px] w-full rounded-full bg-mercury-950 text-[16px] font-semibold text-mercury-30 md:mt-6"
          onPress={handleCreateAgent}
        >
          {isLogin && !isAnonymous ? (
            <>
              <span className="-mt-[2px] text-[24px] font-medium leading-none">
                +
              </span>
              Create Agent
            </>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}
    </div>
  )
}

export default MyAgentHome
