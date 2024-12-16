import { IconTrendingUp } from "@components/Icons/DefiLens"
import { MessagePlusIcon } from "@components/Icons/Message"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"

const AutonomousAgents: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-10">
      <div className="w-[60%]">
        <div className="flex items-center gap-4">
          <h1 className="text-[68px] font-bold">8</h1>
          <span className="text-[22px] font-bold text-mercury-950">
            Autonomous agents <br /> managing their own wallets
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <div className="w-full rounded-[22px] bg-mercury-30 px-[18px] py-6">
            <div className="mb-3 flex items-center gap-1.5">
              <IconTrendingUp />
              <span className="text-14 font-medium text-mercury-600">
                Total Market Cap
              </span>
            </div>
            <span className="text-24 font-semibold">$35,183,869</span>
          </div>

          <div className="w-full rounded-[22px] bg-mercury-30 px-[18px] py-6">
            <div className="mb-3 flex items-center gap-1.5">
              <MessagePlusIcon />
              <span className="text-14 font-medium text-mercury-600">
                Total Messages
              </span>
            </div>
            <span className="text-24 font-semibold">$35,183,869</span>
          </div>
        </div>
      </div>

      <div className="min-h-[200px] w-[40%] rounded-[22px] bg-[#FF075A] p-[18px]">
        <div className="flex h-full min-h-[200px] flex-col justify-between">
          <div>
            <h3 className="text-[32px] font-[800] uppercase text-white">max</h3>
            <div className="w-fit rounded-[4px] border border-[rgba(255,255,255,0.40)] px-2">
              <span className="text-[13px] font-medium uppercase text-white">
                spotlight
              </span>
            </div>
          </div>

          <div>
            <span className="text-[13px] font-medium uppercase text-white">
              $35.1 MKT Cap
            </span>
            <div className="mt-2 flex items-center gap-3">
              <TwitterIcon color="#FFFF" />
              <TwitterIcon color="#FFFF" />
              <TelegramOutlineIcon color="#FFFF" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AutonomousAgents
