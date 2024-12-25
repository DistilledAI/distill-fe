import { spotlightBg } from "@assets/images"
import { IconTrendingUp } from "@components/Icons/DefiLens"
import { MessagePlusIcon } from "@components/Icons/Message"
import {
  DexScreenerIcon,
  TelegramOutlineIcon,
  XIcon,
} from "@components/Icons/SocialLinkIcon"
import { formatNumberWithComma } from "@utils/index"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTrendingAgent } from "services/trending"

interface Image {
  title: string
  des: string
  image: string
}

interface Socials {
  telegram: string
  web: string
  x: string
  dexscreener: string
}

interface Agent {
  images: Image[]
  socials: Socials
}

interface TrendingAgentState {
  totalMarketCap: number
  totalMsg: number
  agent: Agent
}

const SOCIAL_LINKS: { key: keyof Socials; icon: React.ElementType }[] = [
  { key: "dexscreener", icon: DexScreenerIcon },
  { key: "x", icon: XIcon },
  { key: "telegram", icon: TelegramOutlineIcon },
]

const AutonomousAgents = () => {
  const [trendingAgent, setTrendingAgent] = useState<TrendingAgentState>({
    totalMarketCap: 0,
    totalMsg: 0,
    agent: {
      images: [
        {
          title: "",
          des: "",
          image: "",
        },
      ],
      socials: {
        dexscreener: "",
        telegram: "",
        web: "",
        x: "",
      },
    },
  })

  const { totalMarketCap, totalMsg, agent } = trendingAgent

  useEffect(() => {
    const fetchTrendingAgent = async () => {
      try {
        const res = await getTrendingAgent()
        const stats = res?.data?.stats || []
        const agent = res?.data?.banner?.[0] || {}

        const findValueByKey = (key: string, defaultValue = 0) => {
          return Number(
            stats.find((item: any) => item.key === key)?.value || defaultValue,
          )
        }

        setTrendingAgent({
          totalMarketCap: Math.round(findValueByKey("totalMarketCap")),
          totalMsg: findValueByKey("totalMsg"),
          agent: {
            images:
              agent.image?.map(({ tile = "", des = "", image = "" }: any) => ({
                title: tile,
                des,
                image,
              })) || [],
            socials: {
              telegram: agent.telegram,
              web: agent.web,
              x: agent.x,
              dexscreener: "",
            },
          },
        })
      } catch (error) {
        console.error("Error fetching trending agent:", error)
      }
    }

    fetchTrendingAgent()
  }, [])

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
              ${formatNumberWithComma(totalMarketCap)}
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
              {formatNumberWithComma(totalMsg)}
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
            className="absolute -top-[28px] right-[50px] h-[239px] w-[180px]"
          />
        </div>
      </div>
    </div>
  )
}

export default AutonomousAgents
