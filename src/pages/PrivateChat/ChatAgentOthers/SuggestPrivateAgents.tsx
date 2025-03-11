import { PATH_NAMES, Publish, RoleUser, STATUS_AGENT } from "@constants/index"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { searchUsers } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { useNavigate } from "react-router-dom"
import { distilledAiPlaceholder } from "@assets/images"

interface Props {
  privateAgentsLength: number
}

const SuggestPrivateAgents = ({ privateAgentsLength = 0 }: Props) => {
  const navigate = useNavigate()

  const fetchPrivateAgents = async () => {
    const payloadData = {
      status: STATUS_AGENT.ACTIVE,
      role: RoleUser.BOT,
      publish: Publish.Published,
    }

    const res = await searchUsers({
      filter: payloadData,
      limit: 5,
      offset: 0,
    })
    return {
      agents: res?.data?.items as IUser[],
      total: res?.data?.total,
    }
  }

  const { data } = useQuery({
    queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL, 1],
    queryFn: fetchPrivateAgents,
    refetchOnWindowFocus: false,
    enabled: !privateAgentsLength,
  })

  const handleChatWithAgent = async (agent: IUser) => {
    const inviteUrl = `${PATH_NAMES.INVITE}/${agent?.id}`
    navigate(inviteUrl)
  }

  return (
    <div className="mt-3 space-y-3 overflow-y-auto">
      {data?.agents.map((agent) => (
        <div
          key={agent.id}
          className="flex cursor-pointer items-center gap-3 rounded-full p-2 hover:bg-mercury-100"
          onClick={() => handleChatWithAgent(agent)}
        >
          <div>
            <AvatarCustom
              src={agent.avatar || distilledAiPlaceholder}
              badgeIcon={<FilledBrainAIIcon size={14} />}
              badgeClassName="bg-[#FC0]"
            />
          </div>

          <span className="text-14 font-bold text-mercury-950 md:text-16">
            {agent.username}
          </span>
        </div>
      ))}
    </div>
  )
}

export default SuggestPrivateAgents
