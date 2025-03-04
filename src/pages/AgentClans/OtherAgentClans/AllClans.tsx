import { useRef, useState, useEffect } from "react"
import { distilledAiPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useVirtualizer } from "@tanstack/react-virtual"
import useDebounce from "@hooks/useDebounce"
import SearchClanWrapper from "./SearchClanWrapper"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { IGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"

const AllClans = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthState()
  const parentRef = useRef<HTMLDivElement>(null)
  const [searchClanValue, setSearchClanValue] = useState<string>("")

  const {
    data: groups,
    isFetching,
    hasMore,
    fetchMore: handleLoadMore,
    refetch,
  } = useFetchClan({
    limit: 20,
    filter: {
      name: searchClanValue,
    },
    sort: {
      totalMember: "DESC",
    },
    mode: "infinite",
  })

  const filteredGroups = groups.filter(
    (item: IGroup) => user?.id !== item.createBy,
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
      console.log("Fetching more at offset:", filteredGroups.length)
      handleLoadMore()
    }
  }, 100)

  const debouncedSearchValue = useDebounce(searchClanValue as any, 300)

  const handleSearch = (value: string) => {
    setSearchClanValue(value)
  }

  useEffect(() => {
    refetch()
  }, [debouncedSearchValue, refetch])

  return (
    <div className="-mx-3 mt-6 space-y-3 overflow-x-hidden px-3 pb-4">
      <SearchClanWrapper onSearch={handleSearch} />
      <div
        ref={parentRef}
        className="h-[calc(100dvh-240px)] overflow-y-auto scrollbar-hide md:h-[calc(100dvh-212px)]"
        onScroll={debouncedHandleScroll}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {items.map((virtualItem) => {
            const isLoader = virtualItem.index >= filteredGroups.length

            if (isLoader) {
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  className="absolute left-0 top-0 w-full text-center text-14 text-mercury-800"
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                    height: 64,
                  }}
                >
                  {isFetching ? "Loading..." : null}
                </div>
              )
            }

            const item = filteredGroups[virtualItem.index]
            const group = item
            const imageUrl = getConfigClanValue(group, "imageLive")

            return (
              <div
                data-index={virtualItem.index}
                key={group.id}
                ref={virtualizer.measureElement}
                className="absolute left-0 top-0 w-full"
                style={{
                  top: `${virtualItem.start}px`,
                  height: 72,
                }}
              >
                <div
                  key={group.id}
                  className={twMerge(
                    "flex w-full cursor-pointer items-center gap-4 rounded-full px-3 py-2 hover:bg-mercury-100",
                    chatId === group.label && "md:bg-mercury-100",
                  )}
                  onClick={() => navigate(`${PATH_NAMES.CLAN}/${group.label}`)}
                >
                  <AvatarClanByList
                    avatarUrl={imageUrl || distilledAiPlaceholder}
                    isNameDisplay={false}
                    name=""
                    className="h-8 w-8"
                    member={group.groupMemberStats?.total}
                  />
                  <span className="line-clamp-1 text-16 font-bold text-mercury-950">
                    {group.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AllClans
