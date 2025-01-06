import { bgPrivateRoom } from "@assets/images"
import CommandChat from "@components/CommandChat"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { useNavigate } from "react-router-dom"
// import RoomSetting from "./Settings"
import CmdMessages from "./Messages"
import AgentInfoRoom from "./AgentInfo"
import { CmdMessageProvider } from "./CmdMessageProvider"
import { useAppSelector } from "@hooks/useAppRedux"
import WelcomeAgent from "./WelcomeAgent"

const MyPrivateRoom = () => {
  const navigate = useNavigate()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  return (
    <CmdMessageProvider>
      <div className="min-h-[calc(100dvh-68px)] max-md:h-dvh max-md:pt-[50px]">
        <img
          className="fixed bottom-0 left-0 h-full w-full max-md:hidden"
          src={bgPrivateRoom}
        />
        <div
          onClick={() => navigate(-1)}
          className="fixed left-0 top-0 z-[21] inline-flex h-[68px] cursor-pointer items-center gap-2 px-4 max-md:h-[40px]"
        >
          <ArrowLeftFilledIcon color="#545454" />
          <p className="font-medium">Exit Room</p>
        </div>
        {/* <RoomSetting /> */}
        {myAgent ? (
          <div className="relative z-[1] mx-auto max-w-[800px] px-4">
            <AgentInfoRoom />
            <div className="flex h-[calc(100dvh-140px)] flex-col max-md:h-[calc(100dvh-122px)]">
              <div className="relative flex-1">
                <CmdMessages />
                <div className="absolute inset-x-0 bottom-[-4px] left-0 h-6 w-full bg-fading-white" />
              </div>
              <div className="pb-4 pt-2">
                <CommandChat />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto my-auto flex min-h-[calc(100dvh-200px)] max-w-[460px] items-center px-4">
            <WelcomeAgent />
          </div>
        )}
      </div>
    </CmdMessageProvider>
  )
}

export default MyPrivateRoom
