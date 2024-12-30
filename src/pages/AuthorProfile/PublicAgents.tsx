import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon } from "@components/Icons"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { MessageDots } from "@components/Icons/Message"
import { envConfig } from "@configs/env"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button, ScrollShadow } from "@nextui-org/react"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { useNavigate, useParams } from "react-router-dom"
import { getPublicAgentsByOwner } from "services/agent"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

const PublicAgents = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()
  const { authorId } = useParams()

  const { data, isFetched } = useQuery({
    queryKey: [QueryDataKeys.PUBLIC_AGENTS_BY_OWNER, authorId],
    queryFn: () => getPublicAgentsByOwner(Number(authorId)),
    enabled: !!authorId,
  })

  const publicAgents = data?.data?.items || []

  const handleChatWithAgent = async (agent: IUser) => {
    // invite user to group live
    const isBotLive = agent?.configBot === ConfigBotType.LIVE
    if (isBotLive) {
      const groupId = envConfig.groupIdMax
      return navigate(`${PATH_NAMES.CLAN}/${groupId}`)
    }

    if (user && user.id === agent.owner) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${agent.id}`)
    } else {
      const inviteUrl = `${PATH_NAMES.INVITE}/${agent?.id}`
      navigate(inviteUrl)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[768px] space-y-3 md:py-6">
      <h4 className="mx-4 space-x-2 text-18 text-mercury-900">
        <span className="font-semibold text-brown-10">
          {publicAgents.length || 0}
        </span>
        <span>Public AI Agent(s)</span>
      </h4>

      <ScrollShadow
        className={twMerge(
          "h-full max-h-[50vh] min-h-[25dvh] overflow-y-auto rounded-[22px] bg-mercury-30 p-4",
          publicAgents.length &&
            "grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-10",
          !publicAgents.length && "flex items-center justify-center",
        )}
      >
        {publicAgents.length && isFetched ? (
          publicAgents.map((agent: IUser, index: number) => (
            <div
              className="flex h-fit cursor-pointer justify-between gap-1 rounded-[22px] border-b border-b-mercury-70 p-2 last:border-none hover:bg-mercury-200 md:border-b-[0px]"
              key={index}
              onClick={() => handleChatWithAgent(agent)}
            >
              <div className="flex gap-4">
                <AvatarCustom
                  badgeClassName={
                    agent.configBot === "live"
                      ? "bg-lgd-code-hot-ramp"
                      : "bg-yellow-10"
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
                className="h-9 min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2"
                onPress={() => handleChatWithAgent(agent)}
              >
                <MessageDots />
              </Button>
            </div>
          ))
        ) : (
          <></>
        )}
        {!publicAgents.length && isFetched && (
          <span className="text-18 text-mercury-900">No Data</span>
        )}
      </ScrollShadow>
    </div>
  )
}

export default PublicAgents
