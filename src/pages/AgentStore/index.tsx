import { useState, useRef, useEffect } from "react"
import SortAgents from "./SortAgents"
import { twMerge } from "tailwind-merge"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import AgentClansStore from "./AgentClansStore"
import AIAgentList from "./AIAgentList"
import { useNavigate, useLocation } from "react-router-dom"
import InputSearchAgent from "./InputSearchAgent"

const CATEGORIES = {
  "agent-clans": {
    name: "Agent Clans",
  },
  "ai-agents": {
    name: "All AI Agents",
  },
} as const

type TabId = keyof typeof CATEGORIES

const AgentStore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [tabId, setTabId] = useState<TabId>("agent-clans")
  const swiperRef = useRef<SwiperRef | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tabFromUrl = searchParams.get("tab")

    if (!tabFromUrl) {
      navigate(`${location.pathname}?tab=agent-clans`, { replace: true })
      setTabId("agent-clans")
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.slideTo(0)
      }
    } else {
      const validTab = Object.keys(CATEGORIES).includes(tabFromUrl)
        ? (tabFromUrl as TabId)
        : "agent-clans"

      if (validTab !== tabId) {
        setTabId(validTab)
        if (swiperRef.current?.swiper) {
          const index = Object.keys(CATEGORIES).indexOf(validTab)
          swiperRef.current.swiper.slideTo(index)
        }
      }
    }
  }, [location.search, navigate, tabId])

  const handleSlideClick = (id: TabId, index: number) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
    setTabId(id)
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("tab", id)
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    })
  }

  const renderActiveComponent = () => {
    switch (tabId) {
      case "agent-clans":
        return <AgentClansStore key="agent-clans" />
      case "ai-agents":
        return <AIAgentList key="ai-agents" />
      default:
        return null
    }
  }

  return (
    <div className="mx-auto mt-3 max-w-[1024px] max-lg:px-3 max-md:pb-16 md:mt-8">
      <div className="flex items-center justify-between gap-2">
        <InputSearchAgent />
      </div>

      <div className="relative my-6 flex items-center md:pr-[160px]">
        <Swiper
          ref={swiperRef}
          spaceBetween={8}
          slidesPerView={"auto"}
          loop={false}
          modules={[Navigation]}
          navigation={false}
        >
          {Object.keys(CATEGORIES).map((key, index) => {
            const item = CATEGORIES[key as TabId]
            return (
              <SwiperSlide key={key} className="w-auto last:mr-14">
                <button
                  type="button"
                  onClick={() => handleSlideClick(key as TabId, index)}
                  className={twMerge(
                    "h-14 flex-shrink-0 whitespace-nowrap rounded-full border border-transparent bg-mercury-30 px-4 text-[16px] font-bold text-mercury-700 transition-all duration-300 ease-linear",
                    tabId === key &&
                      "border-brown-500 bg-brown-50 text-brown-500",
                  )}
                >
                  {item.name}
                </button>
              </SwiperSlide>
            )
          })}
        </Swiper>
        {tabId !== "ai-agents" && (
          <>
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[30%] bg-gradient-to-l from-white via-white to-transparent" />
            <div className="absolute right-0 top-[-70px] z-10 md:top-0">
              <SortAgents />
            </div>
          </>
        )}
      </div>

      {renderActiveComponent()}
    </div>
  )
}

export default AgentStore
