import OrchestrationHeader from "@components/ChatInfoCurrent/OrchestrationHeader"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

interface Props {
  item: {
    avatarAgent1: string
    avatarAgent2: string
    name: string
    tag: string
    topic: string
    conversationId: number
    agent1?: any
    agent2?: any
  }
  index: number
}

const ORCHESTRATION_BG_COLORS = [
  "linear-gradient(71deg, #000 0%, #797676 100%)",
  "linear-gradient(45deg, #5C3F74 -2.49%, #9A7CB4 100%)",
  "linear-gradient(47deg, #353158 0%, #7E7AB8 100%)",
]

const OrchestrationCard = ({ item, index }: Props) => {
  const { chatId: conversationId } = useParams()

  return (
    <div
      className={twMerge(
        "flex h-[126px] w-full cursor-pointer flex-col gap-2 rounded-[22px] rounded-bl-none bg-mercury-800 p-3",
        item.conversationId !== Number(conversationId) &&
          !!conversationId &&
          "opacity-40",
      )}
      style={{
        background: ORCHESTRATION_BG_COLORS[index],
      }}
    >
      <div className="flex justify-between">
        <OrchestrationHeader
          agent1={item?.agent1}
          agent2={item?.agent2}
          name={item.name}
          conversationId={item?.conversationId}
          classNames={{
            wrapper: "gap-5",
            avatarWrapper: "z-0",
            name: "text-[14px] font-bold text-white leading-[110%] tracking-[-0.16px] line-clamp-1",
            tag: "bg-white/10 rounded text-[13px] text-white/60 font-medium px-1 leading-[100%] tracking-[-0.325px] line-camp-1",
            totalMember: "mt-1",
          }}
        />
        <BroadcastIcon />
      </div>
      <h5 className="line-clamp-3 min-h-[36px] text-13 font-bold leading-[140%] tracking-[-0.325px] text-mercury-100">
        {item.topic}
      </h5>
    </div>
  )
}

export default OrchestrationCard
