import MyAgentButton from "./ChatMyAgent/MyAgentButton"
import AllMessages from "./ChatAgentOthers/AllMessages"
import PrivateChatBox from "./PrivateChatBox"
import DynamicTitleMeta from "@components/DynamicTitleMeta"

const PrivateChat = () => {
  return (
    <>
      <DynamicTitleMeta title="Private Chat" />
      <div className="flex">
        <div className="w-[250px]">
          <div className="fixed -mt-[68px] h-full w-[250px] border-x border-x-mercury-200 px-3 pt-2">
            <h2 className="text-32 font-bold text-mercury-950">Private Chat</h2>
            <div className="mt-4 h-full">
              <h3 className="tex-14 mb-3 font-medium text-mercury-800">
                Chat with My Agent
              </h3>
              <MyAgentButton />
              <AllMessages />
            </div>
          </div>
        </div>
        <div className="relative h-[calc(100dvh-68px)] flex-1 pt-1">
          <PrivateChatBox />
        </div>
      </div>
    </>
  )
}

export default PrivateChat
