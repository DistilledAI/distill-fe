import { maxAvatar } from "@assets/images"
import OrchestrationHeader from "@components/ChatInfoCurrent/OrchestrationHeader"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import { PATH_NAMES } from "@constants/index"
import { useNavigate } from "react-router-dom"

interface Props {
  item: {
    avatarAgent1: string
    avatarAgent2: string
    name: string
    tag: string
    topic: string
    conversationId: number
  }
}

const OrchestrationCard = ({ item }: Props) => {
  const navigate = useNavigate()
  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-2 rounded-[22px] rounded-bl-none bg-mercury-800 p-3"
      style={{
        background: "linear-gradient(71deg, #000 0%, #797676 100%)",
      }}
      onClick={() =>
        navigate(`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`, {
          state: item,
        })
      }
    >
      <div className="flex justify-between">
        <OrchestrationHeader
          agent1={{
            avatarSrc: maxAvatar,
            publicAddress: "orai...Vo5h",
          }}
          agent2={{
            avatarSrc: "",
            publicAddress: "orai...Vo5h",
          }}
          name="Max & Min"
          tag="Orchestration"
          classNames={{
            wrapper: "gap-5",
            avatarWrapper: "z-0",
            name: "text-[16px] font-bold text-white leading-[110%] tracking-[-0.16px] line-clamp-1",
            tag: "bg-white/10 rounded text-[13px] text-white/60 font-medium px-1 leading-[100%] tracking-[-0.325px] line-camp-1",
          }}
        />
        <BroadcastIcon />
      </div>
      <h5 className="text-13 font-bold leading-[140%] tracking-[-0.325px] text-mercury-100">
        {item.topic}
      </h5>
    </div>
  )
}

export default OrchestrationCard
