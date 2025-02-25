import { WorldIcon } from "@components/Icons/AgentDetailIcon"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { IAgentData } from "types/user"
import BindYourBot from "../../BindYourBot"
import CategoryLabel, { FieldLabel } from "../../CategoryLabel"

const AutonomousTG: React.FC<{
  agentData: IAgentData
  refetch: any
}> = ({ agentData, refetch }) => {
  const botWebhooks = agentData?.botWebhooks

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <CategoryLabel
          text="Autonomous Bot on Telegram Group"
          icon={<TelegramOutlineIcon size={26} color="#A2845E" />}
        />
        <div className="flex items-center gap-1 rounded-full bg-[rgba(0,122,255,0.15)] px-2">
          <WorldIcon size={20} color="#007AFF" />
          <span className="font-medium uppercase text-[#007AFF]">public</span>
        </div>
      </div>

      <FieldLabel
        text={
          <div className="mt-6 flex items-center justify-between gap-3 rounded-lg bg-[#F6F4EC] p-4">
            <BindYourBot botWebhooks={botWebhooks} refetch={refetch} />
          </div>
        }
      />
    </div>
  )
}

export default AutonomousTG
