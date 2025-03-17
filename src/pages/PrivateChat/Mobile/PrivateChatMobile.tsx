import MyPrivateAgent from "../ChatMyAgent/MyAgentButton"
import ChatAgentOthers from "../ChatAgentOthers/AllMessages"
import DynamicTitleMeta from "@components/DynamicTitleMeta"

const PrivateChatMobile = () => {
  return (
    <>
      <DynamicTitleMeta title="Private Chat" />
      <div className="h-full w-full px-3">
        <h3 className="tex-14 mb-2 font-medium text-mercury-800">
          Chat with My Agent
        </h3>
        <MyPrivateAgent />
        <ChatAgentOthers />
      </div>
    </>
  )
}

export default PrivateChatMobile
