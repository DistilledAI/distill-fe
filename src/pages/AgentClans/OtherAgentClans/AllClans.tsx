import { useRef, useState } from "react"
import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import useFetchGroups, {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useVirtualizer } from "@tanstack/react-virtual"
import useDebounce from "@hooks/useDebounce"
import SearchClanWrapper from "./SearchClanWrapper"

const AllClans = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthState()
  const parentRef = useRef<HTMLDivElement>(null)
  const [searchClanValue, setSearchClanValue] = useState("")

  const { groups, isLoading, isLoadingMore, handleLoadMore, hasMore } =
    useFetchGroups({
      initialLimit: 15,
      initialFilter: {
        typeGroup: TypeGroup.PUBLIC_GROUP,
        name: searchClanValue,
      },
    })

  const filteredGroups = groups.filter(
    (item) => user?.id !== item.group.createBy,
  )

  const virtualizer = useVirtualizer({
    count:
      hasMore || isLoading || isLoadingMore
        ? filteredGroups.length + 1
        : filteredGroups.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  })

  const items = virtualizer.getVirtualItems()

  const debouncedHandleScroll = useDebounce(() => {
    if (!parentRef.current || isLoading || isLoadingMore || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      handleLoadMore()
    }
  }, 10)

  const handleSearch = (value: string) => {
    setSearchClanValue(value)
  }

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
                  {isLoadingMore ? "Loading..." : null}
                </div>
              )
            }

            const item = filteredGroups[virtualItem.index] as UserGroup
            const group = item.group
            const imageUrl = getConfigClanValue(group, "imageLive")

            return (
              <div
                key={group.id}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                className={twMerge(
                  "absolute left-0 top-0 flex w-full cursor-pointer items-center gap-4 rounded-full px-3 py-2 hover:bg-mercury-100",
                  chatId === group.label && "md:bg-mercury-100",
                )}
                style={{
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => navigate(`${PATH_NAMES.CLAN}/${group.label}`)}
              >
                <AvatarClanByList
                  avatarUrl={imageUrl || maxAvatarPlaceholder}
                  isNameDisplay={false}
                  name=""
                  className="h-8 w-8"
                  member={group.groupMemberStats?.total}
                />
                <span className="line-clamp-1 text-16 font-bold text-mercury-950">
                  {group.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AllClans
