import AvatarContainer, { AvatarClan } from "@components/AvatarContainer"
import AvatarGroup from "@components/AvatarGroup"
// import DotLoading from "@components/DotLoading"
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
  LIMIT,
  TypeGroup,
  UserGroup,
} from "../../ChatPage/ChatContainer/LeftBar/useFetchGroups"
// import { PlusIcon } from "@components/Icons/Plus"
import React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

const ChatAgentOthers = () => {
  const { groups, handleLoadMore } = useFetchGroups()
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useGetChatId()
  const queryClient = useQueryClient()

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  const mapColorsToGroups = (groups: UserGroup[]) => {
    return groups.map((group) => {
      const groupId = group.groupId
      const { bgColor } = getActiveColorRandomById(groupId)
      return {
        ...group,
        bgColor,
      }
    })
  }

  const renderInfoGroup = (groupItem: UserGroup) => {
    const typeGroup = groupItem.group.typeGroup

    return match(typeGroup)
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
          avatarUrl={getAvatarGroupChat(
            groupItem.userId,
            groupItem.group.userA,
            groupItem.group.userB,
          )}
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
  }

  const handleGroupClick = (groupItem: UserGroup, isBotLive: boolean) => {
    queryClient.setQueryData<number[]>(
      [QueryDataKeys.NOTIFICATION_GROUPS],
      (prev = []) => prev.filter((id) => id !== groupItem.groupId),
    )

    if (isBotLive) {
      return navigate(`${PATH_NAMES.CLAN}/${groupItem?.group?.label}`, {
        state: {
          isGroupJoined: true,
        },
      })
    }
    navigate(`${PATH_NAMES.CHAT}/${groupItem.groupId}`)
  }

  const containerRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: groups.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 64,
    overscan: 8,
  })

  const newGroups = mapColorsToGroups(groups)

  return (
    <>
      <div className="mt-4 md:mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-14 font-medium text-mercury-800">All Messages</h3>
          {/* <button type="button">
            <PlusIcon color="#676767" size={20} />
          </button> */}
        </div>
      </div>

      <div
        className="-mx-3 mt-3 max-h-[calc(100dvh-250px)] w-full overflow-y-auto scrollbar-hide md:max-h-[calc(100%-250px)] md:w-[250px]"
        ref={containerRef}
        onScroll={() => {
          const scrollElement = containerRef.current
          if (!scrollElement) return

          const { scrollTop, clientHeight, scrollHeight } = scrollElement
          const isNearBottom = scrollTop + clientHeight >= scrollHeight - 500
          if (isNearBottom && groups.length >= LIMIT) {
            handleLoadMore()
          }
        }}
      >
        <div
          className="relative w-full"
          style={{ height: virtualizer.getTotalSize() }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const groupItem = newGroups[virtualItem.index]
            const isActive = Number(chatId) === groupItem.groupId
            const isBotLive = groupItem.group.live === 1

            return (
              <div
                key={groupItem.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                  padding: "0px 12px",
                }}
              >
                <div
                  aria-selected={isActive}
                  onClick={() => handleGroupClick(groupItem, isBotLive)}
                  className={twMerge(
                    "group/item group relative mb-2 flex h-14 cursor-pointer items-center justify-between gap-2 rounded-full p-2 hover:bg-mercury-100",
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
    </>
  )
}
export default ChatAgentOthers
