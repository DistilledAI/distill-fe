import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon, TablerClainIcon } from "@components/Icons"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES } from "@constants/index"
import useFetchFeaturedAgentClan from "@pages/Marketplace/useFetchFeaturedAgentClan"
import { shortenNumber } from "@utils/index"
import { Link } from "react-router-dom"
import FeaturedSkeleton from "./Skeleton"

const FeaturedAgent = () => {
  const { data, loading } = useFetchFeaturedAgentClan()

  return (
    <div>
      <div className="flex items-center gap-2">
        <TablerClainIcon />
        <h3 className="text-22 font-bold text-mercury-950">
          Featured Agent Clans
        </h3>
      </div>
      <h4 className="text-14 font-semibold text-mercury-900">
        Explore the hype and utilities of AI Agents
      </h4>
      {loading ? (
        <FeaturedSkeleton />
      ) : (
        <div className="mt-5 grid grid-cols-6 gap-[2px]">
          {data.map((item) => (
            <Link key={item.id} to={`${PATH_NAMES.CLAN}/${item.label}`}>
              <div className="group relative h-[180px] overflow-hidden rounded-[8px] bg-mercury-70 p-3">
                <AvatarCustom
                  className="absolute left-0 top-0 h-full w-full rounded-none border-none object-cover transition-all duration-1000 group-hover:scale-110"
                  src={item?.image || undefined}
                  publicAddress={item.name}
                />
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
                  <p className="line-clamp-1 text-[14px] font-bold text-white">
                    {item.name}
                  </p>
                  <p className="mt-[2px] w-fit rounded-full bg-mercury-900 px-[6px] py-[1px] text-[11px] font-medium italic text-white">
                    Prototype AI Agent
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedAgent
