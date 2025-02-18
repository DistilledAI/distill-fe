import MyPrivateAgent from "./MyPrivateAgent"
import PrivateAgentChatContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/PrivateAgentChatContent"

const PrivateChat = () => {
  return (
    <div className="flex">
      <div className="h-full w-[250px]">
        <div className="fixed -mt-[68px] h-full w-[250px] border-x border-x-mercury-200 px-3 pt-2">
          <h2 className="text-32 font-bold text-mercury-950">Private Chat</h2>
          <div className="mt-4 space-y-3">
            <h3 className="tex-14 font-medium text-mercury-800">
              Chat with My Agent
            </h3>
            <MyPrivateAgent />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <PrivateAgentChatContent />
      </div>
    </div>
  )
}

export default PrivateChat
