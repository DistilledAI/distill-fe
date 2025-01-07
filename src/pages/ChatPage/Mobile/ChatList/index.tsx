import AvatarContainer from "@components/AvatarContainer"
import AvatarGroup from "@components/AvatarGroup"
import DotLoading from "@components/DotLoading"
import { LiveIcon } from "@components/Icons"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import DotNotification from "@pages/ChatPage/ChatBox/DotNotification"
import {
  getAvatarGroupChat,
  getColorGroupIcon,
  getNameGroup,
  getPublicAddressGroupChat,
  getRoleUser,
} from "@pages/ChatPage/ChatBox/LeftBar/helpers"
import useFetchGroups, {
  LIMIT,
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { IUser } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { match } from "ts-pattern"
import { QueryDataKeys } from "types/queryDataKeys"
import { StartNewChat } from ".."
import useGetChatId from "../../hooks/useGetChatId"

const ChatList = () => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useGetChatId()
  const { groups, isLoading, handleLoadMore, isFetched } = useFetchGroups()
  const queryClient = useQueryClient()

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  const handleGroupClick = (groupItem: UserGroup, isBotLive: boolean) => {
    queryClient.setQueryData<number[]>(
      [QueryDataKeys.NOTIFICATION_GROUPS],
      (prev = []) => prev.filter((id) => id !== groupItem.groupId),
    )

    if (isBotLive) {
      return navigate(`${PATH_NAMES.CLAN}/${groupItem.groupId}`, {
        state: {
          isGroupJoined: true,
        },
      })
    }
    navigate(`${PATH_NAMES.CHAT}/${groupItem.groupId}`)
  }

  const renderInfoGroup = (groupItem: UserGroup) => {
    const typeGroup = groupItem.group.typeGroup
    const isLive = groupItem.group.live === 1
    const isActive = Number(chatId) === groupItem.groupId

    return match(typeGroup)
      .returnType<React.ReactNode>()
      .with(TypeGroup.PRIVATE_GROUP, () => (
        <AvatarGroup groupName={groupItem.group.name} />
      ))
      .with(TypeGroup.PUBLIC_GROUP, () => (
        <AvatarContainer
          badgeIcon={<LiveIcon />}
          avatarUrl={groupItem.group.image}
          publicAddress={groupItem.group.name}
          userName={groupItem.group.name}
          badgeClassName={isLive ? "bg-lgd-code-hot-ramp" : ""}
          isLive={isLive}
          usernameClassName={isLive && isActive ? "font-semibold" : ""}
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
        />
      ))
  }

  if (isFetched && groups.length === 0 && !isLoading) return <StartNewChat />

  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={groups}
      components={{
        Footer: () =>
          isLoading && groups.length > 0 ? (
            <div className="flex items-center justify-center">
              <DotLoading />
            </div>
          ) : (
            <></>
          ),
      }}
      increaseViewportBy={500}
      endReached={(index) => {
        if (index + 1 >= LIMIT) {
          handleLoadMore()
        }
      }}
      itemContent={(_, groupItem) => {
        const isActive = Number(chatId) === groupItem.groupId
        const isBotLive = groupItem.group.live === 1

        return (
          <div
            key={groupItem.id}
            aria-selected={isActive}
            onClick={() => {
              handleGroupClick(groupItem, isBotLive)
            }}
            className="relative mb-2 gap-2 px-4 py-2"
          >
            {renderInfoGroup(groupItem)}
            <DotNotification groupId={groupItem.groupId} />
          </div>
        )
      }}
    />
  )
}

export default ChatList
