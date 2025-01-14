import {
  gnrtAvatar,
  leeQuidAvatar,
  maxAvatar,
  racksAvatar,
} from "@assets/images"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import OrchestrationCard from "./OrchestrationCard"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

export const ORCHESTRATION_LIST = [
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
    conversationId: 624,
  },
  {
    agent1: {
      avatar: maxAvatar,
      name: "Max",
      contractAddress: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
      tradeLink:
        "https://dexscreener.com/solana/4Qgn7AixnZJBwfFL5XmRDBVyzzq9tC6JdDToaKVhPJvz",
      telegram: "https://t.me/leequidclan",
      x: "https://x.com/LeeQuid_AI",
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
    conversationId: 629,
  },
]

const OrchestrationSlider = () => {
  const navigate = useNavigate()

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={8}
        slidesPerView={1.3}
        loop={false}
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {ORCHESTRATION_LIST.map((item: any) => (
          <SwiperSlide
            key={item.conversationId}
            className="min-w-[200px]"
            onClick={() =>
              navigate(`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`)
            }
          >
            <OrchestrationCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="custom-next absolute -right-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#5454541A] shadow-10 backdrop-blur-[10px]"
        aria-label="Next slide"
      >
        <div className="w-fit -rotate-90">
          <ChevronDownIcon color="#676767" />
        </div>
      </button>
      <button
        className="custom-prev absolute -left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#5454541A] shadow-10 backdrop-blur-[10px]"
        aria-label="Next slide"
      >
        <div className="w-fit -rotate-[270deg]">
          <ChevronDownIcon color="#676767" />
        </div>
      </button>
    </div>
  )
}

export default OrchestrationSlider
