import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { MessageDots } from "@components/Icons/Message"
import { PATH_NAMES, RoleUser, STATUS_AGENT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useInviteUser from "@hooks/useInviteUser"
// import { PinnedIcon } from "@components/Icons/Pin"
import { Button } from "@nextui-org/react"
import { IUser } from "@reducers/user/UserSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchUsers } from "services/chat"

interface PrivateAgentsProps {
  onClose: () => void
}

const PrivateAgents = ({ onClose }: PrivateAgentsProps) => {
  const navigate = useNavigate()
  const { user } = useAuthState()
  const [agents, setAgents] = useState<IUser[]>([])
  const { handleInviteUserLoggedIn } = useInviteUser()

  const handleChatWithAgent = async (agent: IUser) => {
    if (user && user.id === agent.owner) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${agent.id}`)
    } else {
      await handleInviteUserLoggedIn(agent.id)
    }
    onClose()
  }

  useEffect(() => {
    ;(async () => {
      try {
        const payloadData = {
          username: "",
          status: STATUS_AGENT.ACTIVE,
          role: RoleUser.BOT,
        }
        const res = await searchUsers(JSON.stringify(payloadData))
        if (res?.data?.items?.length) {
          setAgents(res?.data?.items)
        }
      } catch (e) {
        console.log("error", e)
      }
    })()
  }, [])

  return (
    <div className="space-y-6">
      {agents.map((agent, index) => (
        <div className="flex justify-between gap-6" key={index}>
          <div className="flex gap-4">
            <AvatarCustom
              badgeClassName="bg-yellow-10"
              src={agent.avatar}
              badgeIcon={<FilledBrainAIIcon size={14} />}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base-b line-clamp-1 text-mercury-800">
                  {agent.username}
                </span>
                {/* <div>
                  <PinnedIcon />
                </div> */}
              </div>
              <p className="max-w-[187px] text-13 font-medium text-mercury-600">
                {agent.description || "Distilled AI Agent"}
              </p>
            </div>
          </div>
          <Button
            className="border-mercury-50 min-w-[52px] rounded-full border bg-mercury-100 px-4 py-2"
            onClick={() => handleChatWithAgent(agent)}
          >
            <MessageDots />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default PrivateAgents
