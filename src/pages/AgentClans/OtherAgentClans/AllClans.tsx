import { useRef, useState, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useVirtualizer } from "@tanstack/react-virtual"
import useAuthState from "@hooks/useAuthState"
import useDebounce from "@hooks/useDebounce"
import { distilledAiPlaceholder } from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import { AvatarClanByList } from "@components/AvatarContainer"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import SearchClanWrapper from "./SearchClanWrapper"
import PinClanButton from "./PinClanButton"
import PinAgentClans from "./PinAgentClans"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { usePinAgentClans } from "./useAgentPinClans"
import { IGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { getConfigClanValue } from "@utils/clanConfig"

const AllClans = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const { user, isAnonymous, isLogin } = useAuthState()
  const parentRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [searchClanValue, setSearchClanValue] = useState<string>("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("")

  const debounceSearch = useDebounce((value: string) => {
    setDebouncedSearchValue(value)
  }, 300)

  useEffect(() => {
    debounceSearch(searchClanValue)
  }, [searchClanValue])

  const {
    data: groups,
    isFetching,
    hasMore,
    fetchMore: handleLoadMore,
  } = useFetchClan({
    limit: 20,
    filter: debouncedSearchValue ? { name: debouncedSearchValue } : {},
    sort: { totalMsg24h: "DESC" },
    mode: "infinite",
  })

  const { data: pinnedClans = [] } = usePinAgentClans()

  const filteredGroups = useMemo(
    () =>
      groups.filter(
        (item: IGroup) =>
          user?.id !== item.createBy &&
          !pinnedClans.some((pinned) => pinned.group.id === item.id),
      ),
    [groups, user?.id, pinnedClans],
  )

  const virtualizer = useVirtualizer({
    count:
      hasMore || isFetching ? filteredGroups.length + 1 : filteredGroups.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  })

  const items = virtualizer.getVirtualItems()

  const debouncedHandleScroll = useDebounce(() => {
    if (!parentRef.current || isFetching || !hasMore) return
    const { scrollTop, scrollHeight, clientHeight } = parentRef.current
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      handleLoadMore()
    }
  }, 100)

  const renderItem = (virtualItem: any) => {
    const isLoader = virtualItem.index >= filteredGroups.length

    if (isLoader) {
      return (
        <div
          key={virtualItem.key}
          data-index={virtualItem.index}
          ref={virtualizer.measureElement}
          className="absolute left-0 top-0 w-full text-center text-16 text-mercury-950"
          style={{
            transform: `translateY(${virtualItem.start}px)`,
            height: 64,
          }}
        >
          {isFetching ? "Loading..." : null}
        </div>
      )
    }

    const group = filteredGroups[virtualItem.index]
    const imageUrl = getConfigClanValue(group, "imageLive")

    return (
      <div
        data-index={virtualItem.index}
        key={group.id}
        ref={virtualizer.measureElement}
        className="absolute left-0 top-0 w-full"
        style={{ top: `${virtualItem.start}px`, height: 72 }}
      >
        <div
          className={twMerge(
            "flex w-full flex-1 cursor-pointer items-center justify-between gap-1 rounded-full p-2 hover:bg-mercury-100",
            chatId === group.label && "md:bg-mercury-100",
          )}
        >
          <div
            className="flex flex-1 items-center gap-2"
            onClick={() => {
              setTimeout(() => {
                navigate(`${PATH_NAMES.CLAN}/${group?.label}`)
              }, 1)
            }}
          >
            <VideoThumbnailWrapper videoUrl={imageUrl}>
              {(thumbnail) => (
                <AvatarClanByList
                  avatarUrl={thumbnail || distilledAiPlaceholder}
                  isNameDisplay={false}
                  name=""
                  className="h-8 w-8"
                  member={group.groupMemberStats?.total}
                />
              )}
            </VideoThumbnailWrapper>
            <span className="line-clamp-1 max-w-[114px] break-all text-16 font-bold text-mercury-950">
              {group.name}
            </span>
          </div>
          {isLogin && !isAnonymous && (
            <PinClanButton groupId={Number(group.id)} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="-mx-3 mt-6 space-y-3 overflow-x-hidden">
      <div className="px-3">
        <SearchClanWrapper onSearch={setSearchClanValue} />
      </div>
      <div
        className="max-h-[calc(100dvh-200px)] overflow-y-auto px-3 pb-8 md:pb-4"
        onScroll={debouncedHandleScroll}
      >
        <div ref={pinContainerRef}>
          <PinAgentClans />
        </div>

        <div ref={parentRef} className="mt-3">
          {filteredGroups.length === 0 && !isFetching ? (
            <div className="flex h-full justify-center text-16 font-semibold text-mercury-950">
              No clans found
            </div>
          ) : (
            <div
              className="md:h-full"
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                position: "relative",
                width: "100%",
              }}
            >
              {items.map(renderItem)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllClans
