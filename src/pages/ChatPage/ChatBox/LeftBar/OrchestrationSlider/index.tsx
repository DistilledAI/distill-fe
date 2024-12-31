import { maxAvatar } from "@assets/images"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import OrchestrationCard from "./OrchestrationCard"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"

const ORCHESTRATION_LIST = [
  {
    avatarAgent1: maxAvatar,
    avatarAgent2: maxAvatar,
    name: "Max & Min",
    tag: "Orchestration",
    topic: "What was your initial impression of the Titanic movie?",
  },
  {
    avatarAgent1: maxAvatar,
    avatarAgent2: maxAvatar,
    name: "Max & Min",
    tag: "Orchestration",
    topic: "What was your initial impression of the Titanic movie?",
  },
]

const OrchestrationSlider = () => {
  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={8}
        slidesPerView={1.3}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: null,
        }}
      >
        {ORCHESTRATION_LIST.map((item, index) => (
          <SwiperSlide key={index} className="min-w-[200px]">
            <OrchestrationCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="custom-next absolute -right-3 top-1/2 z-10 h-6 w-6 -translate-y-1/2 transform rounded-full bg-[#5454541A] p-2 shadow-10 backdrop-blur-[10px]"
        aria-label="Next slide"
      >
        <div className="-rotate-90">
          <ChevronDownIcon color="#676767" />
        </div>
      </button>
    </div>
  )
}

export default OrchestrationSlider
