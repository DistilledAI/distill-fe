import { useRef, useState } from "react"
import AvatarContainer, { AvatarClan } from "@components/AvatarContainer"
import AvatarGroup from "@components/AvatarGroup"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"
import { IUser } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById } from "@utils/index"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { match } from "ts-pattern"
import { QueryDataKeys } from "types/queryDataKeys"
import DotNotification from "../../ChatPage/ChatContainer/DotNotification"
import ActiveEffect from "../../ChatPage/ChatContainer/LeftBar/ActiveEffect"
import {
  getAvatarGroupChat,
  getColorGroupIcon,
  getNameGroup,
  getPublicAddressGroupChat,
  getRoleUser,
} from "../../ChatPage/ChatContainer/LeftBar/helpers"
import useFetchGroups, {
  TypeGroup,
  UserGroup,
} from "../../ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useVirtualizer } from "@tanstack/react-virtual"
import useDebounce from "@hooks/useDebounce"
import SearchPrivateAgentWrapper from "./SearchPrivateAgentWrapper"
import SuggestPrivateAgents from "./SuggestPrivateAgents"
import { distilledAiPlaceholder } from "@assets/images"

export const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) =>
  getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
    <FilledUserIcon size={14} />
  ) : (
    <FilledBrainAIIcon size={14} />
  )

const AllMessages = () => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useGetChatId()
  const queryClient = useQueryClient()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [searchClanValue, setSearchClanValue] = useState("")

  const { groups, isLoadingMore, handleLoadMore, hasMore } = useFetchGroups({
    initialLimit: 10,
    initialFilter: { typeGroup: TypeGroup.DIRECT, username: searchClanValue },
  })

  const mapColorsToGroups = (groups: UserGroup[]) =>
    groups.map((group) => {
      const groupId = group.groupId
      const { bgColor } = getActiveColorRandomById(groupId)
      return { ...group, bgColor }
    })

  const renderInfoGroup = (groupItem: UserGroup) =>
    match(groupItem.group.typeGroup)
      .returnType<React.ReactNode>()
      .with(TypeGroup.PRIVATE_GROUP, () => (
        <AvatarGroup groupName={groupItem.group.name} />
      ))
      .with(TypeGroup.PUBLIC_GROUP, () => (
        <AvatarClan
          avatarUrl={groupItem.group.image}
          publicAddress={groupItem.group.name}
          name={groupItem.group.name}
        />
      ))
      .otherwise(() => (
        <AvatarContainer
          badgeIcon={getIconGroup(
            groupItem.userId,
            groupItem.group.userA,
            groupItem.group.userB,
          )}
          avatarUrl={
            getAvatarGroupChat(
              groupItem.userId,
              groupItem.group.userA,
              groupItem.group.userB,
            ) || distilledAiPlaceholder
          }
          publicAddress={getPublicAddressGroupChat(
            groupItem.userId,
            groupItem.group.userA,
            groupItem.group.userB,
          )}
          userName={getNameGroup(
            user,
            groupItem.group.userA,
            groupItem.group.userB,
          )}
          badgeClassName={getColorGroupIcon(
            groupItem.userId,
            groupItem.group.userA,
            groupItem.group.userB,
          )}
          wrapperClassName="w-full"
          usernameClassName="text-[16px] font-bold text-mercury-950 flex-1"
        />
      ))

  const handleGroupClick = (groupItem: UserGroup, isBotLive: boolean) => {
    queryClient.setQueryData<number[]>(
      [QueryDataKeys.NOTIFICATION_GROUPS],
      (prev = []) => prev.filter((id) => id !== groupItem.groupId),
    )

    if (isBotLive) {
      return navigate(`${PATH_NAMES.CLAN}/${groupItem?.group?.label}`, {
        state: { isGroupJoined: true },
      })
    }
    navigate(`${PATH_NAMES.CHAT}/${groupItem.groupId}`)
  }

  const newGroups = mapColorsToGroups(groups)

  const virtualizer = useVirtualizer({
    count: hasMore || isLoadingMore ? newGroups.length + 1 : newGroups.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 64,
    overscan: 5,
  })

  const items = virtualizer.getVirtualItems()

  const debouncedLoadMore = useDebounce(handleLoadMore, 10)

  const handleScroll = () => {
    const scrollElement = containerRef.current
    if (!scrollElement || isLoadingMore || !hasMore) return

    const { scrollTop, clientHeight, scrollHeight } = scrollElement
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 500
    if (isNearBottom) {
      debouncedLoadMore()
    }
  }

  const handleSearch = (value: string) => {
    setSearchClanValue(value)
  }

  return (
    <>
      <div className="mt-4 md:mt-6">
        <SearchPrivateAgentWrapper
          privateAgentsLength={groups.length}
          onSearch={handleSearch}
        />
      </div>

      {!groups.length ? (
        <SuggestPrivateAgents privateAgentsLength={groups.length} />
      ) : (
        <div
          className="-mx-3 mt-3 h-[calc(100%-250px)] w-full overflow-y-auto scrollbar-hide md:h-[calc(100%-212px)] md:w-[250px]"
          ref={containerRef}
          onScroll={handleScroll}
        >
          <div
            className="relative w-full"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {items.map((virtualItem) => {
              const isLoader = virtualItem.index >= newGroups.length

              if (isLoader) {
                return (
                  <div
                    key={virtualItem.key}
                    data-index={virtualItem.index}
                    ref={virtualizer.measureElement}
                    className="absolute left-0 w-full text-center text-14 text-mercury-800"
                    style={{
                      top: `${virtualItem.start}px`,
                      height: 64,
                    }}
                  >
                    {isLoadingMore ? "Loading..." : null}
                  </div>
                )
              }

              const groupItem = newGroups[virtualItem.index]
              const isActive = Number(chatId) === groupItem.groupId
              const isBotLive = groupItem.group.live === 1

              return (
                <div
                  key={groupItem.id}
                  data-index={virtualItem.index}
                  ref={
                    virtualItem.index === 0
                      ? itemRef
                      : virtualizer.measureElement
                  }
                  className="absolute left-0 w-full px-3"
                  style={{
                    top: `${virtualItem.start}px`,
                    height: 64,
                  }}
                >
                  <div
                    aria-selected={isActive}
                    onClick={() => handleGroupClick(groupItem, isBotLive)}
                    className={twMerge(
                      "group/item group relative flex cursor-pointer items-center justify-between gap-2 rounded-full p-2 hover:bg-mercury-100",
                      isActive && "bg-mercury-100",
                      isActive &&
                        isBotLive &&
                        "bg-fading-orange hover:border-code-agent-1",
                    )}
                  >
                    {renderInfoGroup(groupItem)}
                    <ActiveEffect
                      isActive={isActive}
                      className={twMerge(
                        isBotLive ? "bg-lgd-code-hot-ramp" : groupItem.bgColor,
                        "-left-[13px]",
                      )}
                    />
                    <DotNotification groupId={groupItem.groupId} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default AllMessages
