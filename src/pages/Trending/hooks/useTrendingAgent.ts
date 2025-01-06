import { useEffect, useState } from "react"
import { getTrendingAgent } from "services/trending"

interface Image {
  title: string
  des: string
  image: string
}

export interface Socials {
  telegram?: string
  web?: string
  x?: string
  dexscreener?: string
}

export interface AgentSpotlight {
  images: Image[]
  socials: Socials
}

interface TrendingAgentState {
  totalMarketCap: number
  totalMsg: number
  agentSpotlight: AgentSpotlight
}

const useTrendingAgent = () => {
  const [trendingAgent, setTrendingAgent] = useState<TrendingAgentState>({
    totalMarketCap: 0,
    totalMsg: 0,
    agentSpotlight: {
      images: [],
      socials: {
        dexscreener: "",
        telegram: "",
        web: "",
        x: "",
      },
    },
  })

  const { totalMarketCap, totalMsg, agentSpotlight } = trendingAgent

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
          agentSpotlight: {
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

  return { totalMarketCap, totalMsg, agentSpotlight }
}

export default useTrendingAgent
