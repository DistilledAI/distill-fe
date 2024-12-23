import { maxBTCAvatar, spotlightBg } from "@assets/images"
import { IconTrendingUp } from "@components/Icons/DefiLens"
import { MessagePlusIcon } from "@components/Icons/Message"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { Dexscreener } from "@components/Icons/TrendingPage"
import { TwitterIcon } from "@components/Icons/Twitter"

const AutonomousAgents: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-10 max-md:flex-col-reverse max-md:gap-0">
      <div className="w-[55%] max-md:w-full">
        <div className="flex items-center gap-4">
          <h1 className="bg-lgd-code-hot-ramp bg-clip-text text-[68px] font-bold text-transparent max-md:text-[50px]">
            8
          </h1>
          <span className="text-[22px] font-bold text-mercury-950 max-md:text-18">
            Autonomous agents <br /> managing their own wallets
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <div className="w-full rounded-[22px] bg-mercury-30 px-[18px] py-6">
            <div className="mb-3 flex items-center gap-1.5">
              <IconTrendingUp color="#888888" />
              <span className="text-14 font-medium text-mercury-600">
                Total Market Cap
              </span>
            </div>
            <span className="text-24 font-semibold max-md:text-18">
              $35,183,869
            </span>
          </div>

          <div className="w-full rounded-[22px] bg-mercury-30 px-[18px] py-6">
            <div className="mb-3 flex items-center gap-1.5">
              <MessagePlusIcon />
              <span className="text-14 font-medium text-mercury-600">
                Total Messages
              </span>
            </div>
            <span className="text-24 font-semibold max-md:text-18">
              $35,183,869
            </span>
          </div>
        </div>
      </div>

      <div className="relative min-h-[280px] w-[45%] max-md:w-full">
        <div
          style={{
            backgroundImage: `url(${spotlightBg})`,
          }}
          className="absolute top-1/2 h-[185px] min-w-[400px] -translate-y-1/2 rounded-[22px] bg-cover bg-center bg-no-repeat p-[18px] max-md:min-w-full"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-[32px] font-[800] uppercase text-white">
                max
              </h3>
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
                <Dexscreener />
                <TwitterIcon color="#FFFF" />
                <TelegramOutlineIcon color="#FFFF" />
              </div>
            </div>
          </div>

          <img
            src={maxBTCAvatar}
            className="absolute -top-[28px] right-[50px] h-[239px] w-[180px]"
          />
        </div>
      </div>
    </div>
  )
}
export default AutonomousAgents
