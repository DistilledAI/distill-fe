import {
  gnrtAvatar,
  leeQuidAvatar,
  maxAvatar,
  racksAvatar,
} from "@assets/images"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { PATH_NAMES } from "@constants/index"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import OrchestrationCard from "./OrchestrationCard"
import { twMerge } from "tailwind-merge"

const urlStaging = ["mesh-distilled-ai-dev.web.app", "localhost:5173"]
const isStaging = urlStaging.includes(window.location.host)

export const ORCHESTRATION_LIST = [
  {
    agent1: {
      avatar: maxAvatar,
      name: "Max",
      contractAddress: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
      tradeLink:
        "https://dexscreener.com/solana/4Qgn7AixnZJBwfFL5XmRDBVyzzq9tC6JdDToaKVhPJvz",
      telegram: "https://t.me/maxisbuyin",
      x: "https://x.com/maxisbuyin_",
    },
    agent2: {
      avatar: racksAvatar,
      name: "BlackRack",
      contractAddress: "D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
      tradeLink:
        "https://agents.land/trading/D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
      telegram: "https://t.me/BlackRack_AI",
      x: "https://x.com/BlackRack_AI",
    },
    name: "Max & BlackRack",
    tag: "Orchestration",
    topic: "Why does FOMC impact crypto so much?",
    conversationId: isStaging ? 641 : 23266,
  },
  {
    agent1: {
      avatar: leeQuidAvatar,
      name: "Lee Quid",
      contractAddress: "oraix39mVDGnusyjag97Tz5H8GvGriSZmhVvkvXRoc4",
      tradeLink:
        "https://agents.land/trading/oraix39mVDGnusyjag97Tz5H8GvGriSZmhVvkvXRoc4",
      telegram: "https://t.me/leequidclan",
      x: "https://x.com/LeeQuid_AI",
    },
    agent2: {
      avatar: racksAvatar,
      name: "BlackRack",
      contractAddress: "D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
      tradeLink:
        "https://agents.land/trading/D7yP4ycfsRWUGYionGpi64sLF2ddZ2JXxuRAti2M7uck",
      telegram: "https://t.me/BlackRack_AI",
      x: "https://x.com/BlackRack_AI",
    },
    name: "Lee Quid & BlackRack",
    tag: "Orchestration",
    topic: "Diversification in Investment Portfolios",
    conversationId: isStaging ? 624 : 23260,
  },
  {
    agent1: {
      avatar: maxAvatar,
      name: "Max",
      contractAddress: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
      tradeLink:
        "https://dexscreener.com/solana/4Qgn7AixnZJBwfFL5XmRDBVyzzq9tC6JdDToaKVhPJvz",
      telegram: "https://t.me/maxisbuyin",
      x: "https://x.com/maxisbuyin_",
    },
    agent2: {
      avatar: gnrtAvatar,
      name: "GNRT",
      contractAddress: "oraiJP7H3LAt57DkFXNLDbLdBFNRRPvS8jg2j5AZkd9",
      tradeLink:
        "https://agents.land/trading/oraiJP7H3LAt57DkFXNLDbLdBFNRRPvS8jg2j5AZkd9",
      telegram: "https://t.me/degeneratorproject",
      x: "https://x.com/gnrttoken",
    },
    name: "Max & GNRT",
    tag: "Orchestration",
    topic:
      "Long-term Viability: Is Bitcoin the Future or Can Meme Coins Evolve?",
    conversationId: isStaging ? 629 : 23263,
  },
]

const SlideButton = ({ direction }: { direction: "next" | "prev" }) => {
  const isNext = direction === "next"
  return (
    <button
      className={twMerge(
        "absolute top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#5454541A] shadow-10 backdrop-blur-[10px]",
        isNext ? "custom-next -right-3" : "custom-prev -left-3",
      )}
      aria-label={`${isNext ? "Next" : "Prev"} slide`}
    >
      <div className={`w-fit ${isNext ? "-rotate-90" : "-rotate-[270deg]"}`}>
        <ChevronDownIcon color="#676767" />
      </div>
    </button>
  )
}

const OrchestrationSlider = () => {
  const navigate = useNavigate()
  const swiperRef = useRef<SwiperRef | null>(null)

  const handleSlideClick = (conversationId: string, index: number) => {
    const currentIndex = swiperRef.current?.swiper?.activeIndex

    if (currentIndex !== undefined) {
      if (index < currentIndex) {
        swiperRef?.current?.swiper.slidePrev()
      } else if (index > currentIndex) {
        swiperRef?.current?.swiper.slideNext()
      }
    }

    navigate(`${PATH_NAMES.ORCHESTRATION}/${conversationId}`)
  }

  return (
    <div>
      <div className="border-t-1 border-mercury-100 py-2">
        <h4 className="text-14 font-bold text-mercury-950">
          Multi-agent Chatroom
        </h4>
      </div>
      <div className="relative">
        <Swiper
          ref={swiperRef}
          spaceBetween={8}
          slidesPerView={1.3}
          loop={false}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {ORCHESTRATION_LIST.map((item: any, index) => (
            <SwiperSlide
              key={item.conversationId}
              className="min-w-[200px]"
              onClick={() => handleSlideClick(item.conversationId, index)}
            >
              <OrchestrationCard item={item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        {(["next", "prev"] as const).map((direction) => (
          <SlideButton key={direction} direction={direction} />
        ))}
      </div>
    </div>
  )
}

export default OrchestrationSlider
