import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon, TablerClainIcon } from "@components/Icons"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES } from "@constants/index"
import useFetchFeaturedAgentClan from "@pages/Marketplace/useFetchFeaturedAgentClan"
import { shortenNumber } from "@utils/index"
import { Link } from "react-router-dom"
import FeaturedSkeleton from "./Skeleton"
import useWindowSize from "@hooks/useWindowSize"
import { AGENT_TYPE_KEY } from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import { distilledAiPlaceholder } from "@assets/images"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"

const FeaturedAgent = () => {
  const { isMobile } = useWindowSize()
  const { data, loading } = useFetchFeaturedAgentClan()

  return (
    <div>
      <div className="flex items-center gap-2 max-md:gap-1">
        <TablerClainIcon size={isMobile ? 22 : 28} />
        <h3 className="text-22 font-bold text-mercury-950 max-md:text-16">
          Featured Agent Clans
        </h3>
      </div>
      <h4 className="text-14 font-semibold text-mercury-900 max-md:text-13">
        Explore the hype and utilities of AI Agents
      </h4>
      {loading ? (
        <FeaturedSkeleton />
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="mt-5 grid grid-cols-6 gap-[2px] max-md:flex">
            {data.map((item) => {
              const thumbnailAgent = getConfigClanValue(
                item,
                "imageLive",
                item.image,
              )

              return (
                <Link key={item.id} to={`${PATH_NAMES.CLAN}/${item.label}`}>
                  <div className="group relative h-[180px] overflow-hidden rounded-[8px] bg-mercury-70 p-3 max-md:w-[140px]">
                    <VideoThumbnailWrapper videoUrl={thumbnailAgent}>
                      {(thumbnail, _, isVideo) =>
                        isVideo ? (
                          <video
                            preload="auto"
                            muted={true}
                            autoPlay
                            playsInline
                            loop
                            controls={false}
                            className="absolute left-0 top-0 h-full w-full rounded-none border-none object-cover"
                          >
                            <source src={thumbnailAgent} type="video/mp4" />
                            <track kind="captions" />
                          </video>
                        ) : (
                          <AvatarCustom
                            className="absolute left-0 top-0 h-full w-full rounded-none border-none object-cover transition-all duration-1000 group-hover:scale-110"
                            src={thumbnail || distilledAiPlaceholder}
                          />
                        )
                      }
                    </VideoThumbnailWrapper>
                    <div className="absolute left-3 top-3">
                      <LiveIcon />
                    </div>
                    <div
                      className="absolute bottom-0 left-0 h-[140px] w-full"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)",
                      }}
                    ></div>
                    <div className="relative flex h-full w-full flex-col justify-end">
                      <div className="flex h-fit w-fit min-w-[18px] items-center rounded-full bg-[#FF3B30] px-2">
                        <div className="-ml-1">
                          <FilledUserIcon size={12} color="#FFFFFF" />
                        </div>
                        <span className="text-[11px] font-medium text-white">
                          {shortenNumber(item.groupMemberStats?.total || 0)}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-[14px] font-bold text-white max-md:text-[12px]">
                        {item.name}
                      </p>
                      <p className="mt-[2px] w-fit rounded-full bg-mercury-900 px-[6px] py-[1px] text-[11px] font-medium italic text-white max-md:text-[10px]">
                        {item.owner?.typeAgent
                          ? item.owner.typeAgent === AGENT_TYPE_KEY.DEFAI
                            ? "DeFAI Agent"
                            : "AI Agent"
                          : "AI Agent"}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FeaturedAgent
