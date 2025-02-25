import { AvatarConversation } from "@components/AvatarContainer"
import { MessageDots } from "@components/Icons/Message"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatContainer/LeftBar/OrchestrationSlider"
import { useNavigate } from "react-router-dom"

const Orchestration = () => {
  const navigate = useNavigate()

  return ORCHESTRATION_LIST.map((item) => (
    <div
      className="flex h-fit cursor-pointer justify-between gap-2 rounded-[22px] border-b border-b-mercury-70 p-2 last:border-none hover:bg-mercury-200 md:border-b-[0px]"
      key={item.name}
      onClick={() =>
        navigate(`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`)
      }
    >
      <div className="flex gap-6">
        <AvatarConversation
          avatarAgent1={item.agent1.avatar}
          avatarAgent2={item.agent2.avatar}
          classNames={{
            avatarWrapper: "z-0",
          }}
        />
        <div>
          <h4 className="text-base-b line-clamp-1 text-mercury-800">
            {item.name}
          </h4>
          <p className="line-clamp-2 text-13 font-medium text-mercury-600">
            {item.topic}
          </p>
        </div>
      </div>
      <Button
        className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2"
        onPress={() =>
          navigate(`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`)
        }
      >
        <MessageDots />
      </Button>
    </div>
  ))
}

export default Orchestration
