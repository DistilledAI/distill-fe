import { PATH_NAMES } from "@constants/index"
import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatBox/LeftBar/OrchestrationSlider"
import { Link } from "react-router-dom"

const MultiChat = () => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center gap-4 bg-[#FC0] px-4 py-1">
      <div className="text-14 font-bold">Multi-agent Chatroom</div>
      <span className="h-[32px] w-[1px] bg-mercury-950 opacity-20"></span>
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-5">
          {ORCHESTRATION_LIST.map((item) => (
            <Link
              to={`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`}
              className="flex items-center gap-1 hover:opacity-70"
              key={item.conversationId}
            >
              <div className="flex w-10">
                <img
                  className="h-6 w-6 rounded-full border-1 border-mercury-400"
                  src={item.agent1.avatar}
                  alt="ava"
                />
                <img
                  className="-ml-3 mt-2 h-6 w-6 rounded-full border-1 border-mercury-400"
                  src={item.agent2.avatar}
                  alt="ava"
                />
              </div>
              <p className="text-nowrap text-14 font-semibold">{item.topic}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MultiChat
