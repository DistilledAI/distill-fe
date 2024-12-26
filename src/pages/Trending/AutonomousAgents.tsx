import { spotlightBg } from "@assets/images"
import { IconTrendingUp } from "@components/Icons/DefiLens"
import { MessagePlusIcon } from "@components/Icons/Message"
import {
  DexScreenerIcon,
  TelegramOutlineIcon,
  XIcon,
} from "@components/Icons/SocialLinkIcon"
import { formatNumberWithComma } from "@utils/index"
import { Link } from "react-router-dom"
import useTrendingAgent from "./hooks/useTrendingAgent"

interface Socials {
  telegram: string
  web: string
  x: string
  dexscreener: string
}

const SOCIAL_LINKS: { key: keyof Socials; icon: React.ElementType }[] = [
  { key: "dexscreener", icon: DexScreenerIcon },
  { key: "x", icon: XIcon },
  { key: "telegram", icon: TelegramOutlineIcon },
]

const AutonomousAgents = () => {
  const { totalMarketCap, totalMsg, agent } = useTrendingAgent()

  const renderSocials = () => {
    return (
      <div className="mt-2 flex items-center gap-3">
        {SOCIAL_LINKS.map(({ key, icon: Icon }) =>
          agent.socials[key] ? (
            <Link key={key} to={agent.socials[key]} target="_blank">
              <Icon size={20} color="#FFFF" />
            </Link>
          ) : null,
        )}
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-between gap-10 max-md:flex-col-reverse max-md:gap-0">
      <div className="w-[55%] max-md:w-full">
        <div className="flex items-center gap-4">
          <h1 className="bg-lgd-code-hot-ramp bg-clip-text text-[68px] font-bold text-transparent max-md:text-[50px]">
            8
          </h1>
          <span className="text-18 font-bold text-mercury-950 md:text-22">
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
              ${formatNumberWithComma(totalMarketCap)}
            </span>
          </div>

          <div className="w-full rounded-[22px] bg-mercury-30 px-[18px] py-6">
            <div className="mb-2 flex items-center gap-1.5">
              <MessagePlusIcon size={24} color="#888888" />
              <span className="text-14 font-medium text-mercury-600">
                Total Messages
              </span>
            </div>
            <span className="text-24 font-semibold max-md:text-18">
              {formatNumberWithComma(totalMsg)}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${spotlightBg})`,
        }}
        className="relative h-[183px] w-[39%] rounded-[22px] bg-cover bg-center bg-no-repeat p-[18px] max-md:min-w-full"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className="text-[32px] font-[800] uppercase text-white">
              {agent.images[0]?.title.toUpperCase()}
            </h3>
            <div className="w-fit rounded-[4px] border border-[rgba(255,255,255,0.40)] px-2">
              <span className="text-[13px] font-medium uppercase text-white">
                {agent.images[0]?.des.toLocaleUpperCase()}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[13px] font-medium uppercase text-white">
              $- MKT Cap
            </span>
            {renderSocials()}
          </div>
        </div>

        <img
          src={agent.images[0]?.image}
          className="absolute -top-5 right-6 h-[239px] w-[185px] object-cover"
          alt="agent image"
          loading="lazy"
        />

        <Link
          to={agent.socials.web}
          className="absolute -right-8 -top-4 rounded-full bg-[#363636B2] px-4 py-2 text-16 font-bold text-white backdrop-blur-[10px]"
        >
          Join Me!
        </Link>
      </div>
    </div>
  )
}

export default AutonomousAgents
