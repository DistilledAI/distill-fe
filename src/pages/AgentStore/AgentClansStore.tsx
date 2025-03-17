import { useState, useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { PATH_NAMES } from "@constants/index"
import { ORCHESTRATION_LIST } from "@pages/ChatPageOld/ChatContainer/LeftBar/OrchestrationSlider"
import OrchestrationCard from "@pages/ChatPageOld/ChatContainer/LeftBar/OrchestrationSlider/OrchestrationCard"
import { distilledAiPlaceholder } from "@assets/images"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import { ClanIcon } from "@components/Icons/Clan"
import { UsersGroupOutlineIcon } from "@components/Icons/UserIcon"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { Pagination, Skeleton } from "@nextui-org/react"
import PaginationItemCustom from "./PaginationItemCustom"
import { IGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import AgentDescription from "@pages/AgentClans/ChatBoxLive/AgentDescription"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import { getConfigClanValue } from "@utils/clanConfig"
import { SortOptions } from "./types"

const AgentClansStore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const limit = 10
  const [page, setPage] = useState(1)

  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get("search") || ""
  const sortBy = searchParams.get("sortBy") || SortOptions.OLDEST

  const sort = useMemo(() => {
    switch (sortBy) {
      case SortOptions.NEWEST:
        return { createdAt: "DESC" }
      case SortOptions.TRENDING:
        return { totalMsg24h: "DESC" }
      case SortOptions.OLDEST:
      default:
        return { createdAt: "ASC" }
    }
  }, [sortBy])

  const filter = searchValue ? { name: searchValue } : undefined

  useMemo(() => {
    setPage(1)
    return 1
  }, [searchValue])

  const { data, total, loading } = useFetchClan({
    limit,
    page,
    filter,
    sort,
    mode: "pagination",
  })

  const totalPages = Math.ceil(total / limit)

  const onPageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages))
    setPage(validPage)
  }

  const handleChatAgentClan = (clan: IGroup) => {
    const clanPathname = `${PATH_NAMES.CLAN}/${clan.label}`
    navigate(clanPathname)
  }

  const title = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h2 className="text-22 font-bold text-mercury-950">{title}</h2>
    </div>
  )

  const renderSkeleton = () => (
    <div className="w-full">
      <div className="h-full rounded-[22px] border border-mercury-100 bg-mercury-50 p-4">
        <div className="flex gap-4">
          <Skeleton className="h-[120px] w-[100px] flex-shrink-0 rounded-lg" />
          <div className="flex w-full flex-col justify-between gap-2">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
            <Skeleton className="h-6 w-24 rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  )

  const clanItems = loading ? (
    Array.from({ length: limit }).map((_, index) => (
      <div key={index}>{renderSkeleton()}</div>
    ))
  ) : data.length === 0 ? (
    <div className="col-span-full py-10 text-center">
      <p className="text-18 font-semibold text-mercury-950">No clans found</p>
    </div>
  ) : (
    data.map((item: IGroup) => {
      const imageUrl = getConfigClanValue(item, "imageLive")
      const description = getConfigClanValue(item, "description", "-")

      return (
        <div key={item.id} className="w-full">
          <div
            className="h-full cursor-pointer rounded-[22px] border border-mercury-100 bg-mercury-50 p-4 hover:bg-mercury-100"
            onClick={() => handleChatAgentClan(item)}
          >
            <div className="flex gap-4">
              <div className="relative h-[120px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat">
                <VideoThumbnailWrapper videoUrl={imageUrl}>
                  {(thumbnail, _, isVideo) =>
                    isVideo ? (
                      <video
                        preload="auto"
                        muted
                        autoPlay
                        playsInline
                        loop
                        controls={false}
                        className="h-full w-full object-cover"
                      >
                        <source src={imageUrl} type="video/mp4" />
                        <track kind="captions" />
                      </video>
                    ) : (
                      <img
                        src={thumbnail || distilledAiPlaceholder}
                        alt="avatar agent"
                        className="h-full w-full object-cover"
                      />
                    )
                  }
                </VideoThumbnailWrapper>
                <div className="absolute inset-0 z-10 rounded-lg border-[2px] border-white/20" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, #000 100%)",
                    opacity: 0.1,
                  }}
                />
                <div
                  className="absolute inset-0 top-[21.05%] h-[78.95%] w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)",
                  }}
                />
                <div className="absolute left-3 top-3 z-10">
                  <BroadcastIcon />
                </div>
                <div className="absolute bottom-[10px] left-[10px] z-10">
                  <TotalMemberBadge
                    iconSize={10}
                    textClassName="text-[11px] leading-[110%]"
                    memberFixed={item?.groupMemberStats?.total}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-16 font-bold text-mercury-950">
                      {item.name}
                    </span>
                  </div>
                  <AgentDescription
                    isTitle={false}
                    description={description}
                    classNames={{
                      p: "text-[13px] font-medium text-mercury-800 line-clamp-3",
                    }}
                  />
                </div>
                <div>
                  <div className="w-fit rounded-[4px] border border-brown-400 bg-brown-50 px-2 text-14 font-medium text-brown-600">
                    AI Agent Clan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  )

  const orchestrationSection = (
    <div className="space-y-2 pb-5 md:pb-10">
      {title({
        icon: <UsersGroupOutlineIcon />,
        title: "Multi-agent Chatrooms",
      })}
      <div className="flex items-center gap-2">
        {ORCHESTRATION_LIST.map((item: any, index) => (
          <div
            key={item.conversationId}
            className="w-[200px]"
            onClick={() =>
              navigate(`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`)
            }
          >
            <OrchestrationCard item={item} index={index} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-5 md:space-y-10">
      <div>
        {title({ icon: <ClanIcon />, title: "Clans" })}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {clanItems}
        </div>
        {data && total > 0 && (
          <Pagination
            showControls
            page={page}
            total={totalPages}
            onChange={onPageChange}
            radius="full"
            renderItem={PaginationItemCustom}
            variant="light"
            classNames={{
              base: "flex justify-center mt-4",
              cursor: "bg-mercury-950 font-bold",
            }}
          />
        )}
      </div>
      {orchestrationSection}
    </div>
  )
}

export default AgentClansStore
