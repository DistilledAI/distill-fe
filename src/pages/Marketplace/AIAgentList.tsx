import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon } from "@components/Icons"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { MessageDots } from "@components/Icons/Message"
import { envConfig } from "@configs/env"
import { PATH_NAMES, Publish, RoleUser, STATUS_AGENT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { useNavigate } from "react-router-dom"
import { searchUsers } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const AIAgentList = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()

  const handleChatWithAgent = async (agent: IUser) => {
    // invite user to group live
    const isBotLive = agent?.configBot === ConfigBotType.LIVE
    if (isBotLive) {
      const groupId = envConfig.groupIdMax
      return navigate(`${PATH_NAMES.CLAN}/${groupId}`)
    }
    if (user && user.id === agent.owner) {
      navigate(`${PATH_NAMES.HOME}`)
    } else {
      const inviteUrl = `${PATH_NAMES.INVITE}/${agent?.id}`
      navigate(inviteUrl)
    }
  }

  const fetchPrivateAgents = async () => {
    const payloadData = {
      username: "",
      status: STATUS_AGENT.ACTIVE,
      role: RoleUser.BOT,
      publish: Publish.Published,
    }
    const res = await searchUsers(JSON.stringify(payloadData))
    return res?.data?.items as IUser[]
  }

  const { data: agents = [], error } = useQuery({
    queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL],
    queryFn: fetchPrivateAgents,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (error) {
    console.log({ error })
  }

  return agents.map((agent, index) => (
    <div
      className="flex h-fit cursor-pointer justify-between gap-2 rounded-[22px] border-b border-b-mercury-70 p-2 last:border-none hover:bg-mercury-200 md:border-b-[0px]"
      key={index}
      onClick={() => handleChatWithAgent(agent)}
    >
      <div className="flex gap-4">
        <AvatarCustom
          badgeClassName={
            agent.configBot === "live" ? "bg-lgd-code-hot-ramp" : "bg-yellow-10"
          }
          src={agent.avatar}
          publicAddress={agent.publicAddress}
          badgeIcon={
            agent.configBot === "live" ? (
              <LiveIcon />
            ) : (
              <FilledBrainAIIcon size={14} />
            )
          }
          isLive={agent.configBot === "live"}
        />
        <div>
          <h4 className="text-base-b line-clamp-1 text-mercury-800">
            {agent.username}
          </h4>
          <p className="line-clamp-2 text-13 font-medium text-mercury-600">
            {agent.description || "Distilled AI Agent"}
          </p>
        </div>
      </div>
      <Button
        className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2"
        onPress={() => handleChatWithAgent(agent)}
      >
        <MessageDots />
      </Button>
    </div>
  ))
}

export default AIAgentList
