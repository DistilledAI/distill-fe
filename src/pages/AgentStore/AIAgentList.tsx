import { maxAvatarPlaceholder2 } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { envConfig } from "@configs/env"
import { PATH_NAMES, Publish, RoleUser, STATUS_AGENT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { useNavigate } from "react-router-dom"
import { searchUsers } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
// import AgentSkeleton from "./AgentSkeleton"

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

  const {
    data: agents = [],
    error,
    // isFetching,
  } = useQuery({
    queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL],
    queryFn: fetchPrivateAgents,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (error) {
    console.log({ error })
  }

  // if (isFetching)
  //   return (
  //     <>
  //       <AgentSkeleton />
  //       <AgentSkeleton />
  //       <AgentSkeleton />
  //       <AgentSkeleton />
  //       <AgentSkeleton />
  //       <AgentSkeleton />
  //     </>
  //   )

  return (
    <div className="grid grid-cols-2 gap-3">
      {agents.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer rounded-[22px] border border-mercury-100 bg-mercury-50 p-4 hover:bg-mercury-100"
          onClick={() => handleChatWithAgent(item)}
        >
          <div className="flex gap-4">
            <div
              className="relative h-[120px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${item.avatar || maxAvatarPlaceholder2})`,
              }}
            >
              <div className="absolute inset-0 z-10 rounded-lg border-[2px] border-white/20" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, #000 100%)",
                  opacity: 0.1,
                }}
              />
              <div
                className="absolute inset-0 top-[21.05%] h-[78.95%] w-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)",
                }}
              />
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-16 font-bold text-mercury-950">
                    {item.username}
                  </span>
                  <div className="w-fit rounded-[4px] bg-[#FFCC00] p-[2px]">
                    <FilledBrainAIIcon size={14} />
                  </div>
                </div>

                <p className="line-clamp-3 text-13 font-medium text-mercury-800">
                  {item.description || "-"}
                </p>
              </div>
              <div>
                <div className="w-fit rounded-[4px] border border-brown-400 bg-brown-50 px-2 text-14 font-medium text-brown-600">
                  AI agent
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AIAgentList
