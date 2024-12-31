import AvatarCustom from "@components/AvatarCustom"
import { ExternalLinkIcon2 } from "@components/Icons/Share"
import { useAppSelector } from "@hooks/useAppRedux"
import { centerTextEllipsis } from "@utils/index"
import { Link } from "react-router-dom"

const AgentInfoRoom = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <AvatarCustom
          src={myAgent?.avatar as string}
          publicAddress={myAgent?.publicAddress as string}
        />
        <p className="text-[24px] font-semibold text-mercury-950">
          Welcome to your Private Room
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-16 font-semibold text-brown-500">
          {myAgent?.username || "Unnamed"}
        </p>
        <Link to={"#"} className="flex items-center gap-1">
          <p className="text-16 font-semibold text-mercury-800">
            {centerTextEllipsis(myAgent?.publicAddress || "")}
          </p>
          <ExternalLinkIcon2 />
        </Link>
      </div>
    </div>
  )
}

export default AgentInfoRoom
