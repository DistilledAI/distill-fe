import { useState, useRef, Suspense } from "react"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { Input } from "@nextui-org/react"
import SortAgents from "./SortAgents"
import { twMerge } from "tailwind-merge"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import AgentClansStore from "./AgentClansStore"

// Chuyển CATEGORIES thành object, key là id của tab
const CATEGORIES: {
  [key: string]: {
    name: string
    component: JSX.Element
    isComing: boolean
  }
} = {
  "agent-clans": {
    name: "Agent Clans",
    component: <AgentClansStore />,
    isComing: false,
  },
  defai: {
    name: "DeFAI Management",
    component: <div>123</div>,
    isComing: false,
  },
  "emotional-companion": {
    name: "Emotional Companion",
    component: <div>123</div>,
    isComing: false,
  },
  research: {
    name: "Research",
    component: <div>123</div>,
    isComing: false,
  },
  productivity: {
    name: "Productivity",
    component: <div>123</div>,
    isComing: false,
  },
}

const AgentStore = () => {
  const [tabId, setTabId] = useState("agent-clans")
  const swiperRef = useRef<SwiperRef | null>(null)

  const handleSlideClick = (id: string, index: number) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
    setTabId(id)
  }

  const activeCategory = CATEGORIES[tabId]

  return (
    <div className="mx-auto mt-8 max-w-[852px]">
      <div className="flex items-center justify-between gap-2">
        <Input
          startContent={<FilledSearchIcon size={24} color="#363636" />}
          placeholder="Search Agents.."
          classNames={{
            inputWrapper: "!bg-transparent shadow-none",
            input: "text-[20px] text-mercury-950 placeholder:text-mercury-800",
          }}
        />
        <button
          type="button"
          className="h-14 flex-shrink-0 rounded-full bg-mercury-950 px-6 text-16 font-bold text-mercury-30"
        >
          My Agent’s Publication
        </button>
      </div>

      <div className="relative my-6 flex items-center pr-[160px]">
        <Swiper
          ref={swiperRef}
          spaceBetween={8}
          slidesPerView={"auto"}
          loop={false}
          modules={[Navigation]}
          navigation={false}
        >
          {Object.keys(CATEGORIES).map((key, index) => {
            const item = CATEGORIES[key]
            return (
              <SwiperSlide key={key} className="w-auto last:mr-14">
                <button
                  type="button"
                  onClick={() => handleSlideClick(key, index)}
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
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[30%] bg-gradient-to-l from-white via-white to-transparent" />
        <div className="absolute right-0 top-0 z-10">
          <SortAgents />
        </div>
      </div>

      <Suspense fallback={null}>{activeCategory?.component}</Suspense>
    </div>
  )
}

export default AgentStore
