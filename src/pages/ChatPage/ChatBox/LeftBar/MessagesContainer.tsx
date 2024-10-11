import AvatarContainer from "@components/AvatarContainer"
import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/user/UserSlice"
import { useChatMessage } from "providers/MessageProvider"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import ActiveEffect from "./ActiveEffect"
import { getAvatarGroupChat, getRoleUser } from "./helpers"
import MoreChatAction from "./MoreChatAction"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroups, { TypeGroup } from "./useFetchGroups"

const LIMIT = 10

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const { fetchGroups, groups, isLoading, setGroups } = useFetchGroups()
  const {
    groupsHaveNotification,
    setGroupsHaveNotification,
    setIsNewMsgOnCurrentWindow,
  } = useChatMessage()
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useParams()
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(10)

  const isHasNotification = (groupId: number) => {
    if (groupId === Number(chatId)) return false
    return groupsHaveNotification.includes(groupId)
  }

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  const getColorGroupIcon = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER
      ? "bg-[#0FE9A4]"
      : "bg-[#FC0]"
  }

  const handleLoadMore = async () => {
    if (hasMore) {
      const newGroups = await fetchGroups({
        offset,
        isLoadMore: true,
      })
      if (!newGroups.length) return setHasMore(false)
      setOffset((prev) => prev + LIMIT)
    }
  }

  const getNameGroup = (userA: IUser, userB: IUser) => {
    return userA?.id === user?.id ? userB?.username : userA?.username
  }

  return (
    <>
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Messages</span>
        <div className="flex-items-center gap-4">
          <div
            className="cursor-pointer"
            onClick={() => onChangeDisplayMode(DISPLAY_MODES.CREATE_GROUP)}
          >
            <FilledUsersPlusIcon />
          </div>
          <div
            onClick={() => onChangeDisplayMode(DISPLAY_MODES.SEARCH)}
            className="cursor-pointer"
          >
            <FilledSearchIcon />
          </div>
        </div>
      </div>

      <div className="-mx-4 h-full max-h-[calc(100%-143px)]">
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
            return (
              <div
                key={groupItem.id}
                aria-selected={isActive}
                onClick={() => {
                  setGroupsHaveNotification((prev) =>
                    prev.filter((id) => id !== groupItem.groupId),
                  )
                  setIsNewMsgOnCurrentWindow(false)
                  navigate(`/chat/${groupItem.groupId}`)
                }}
                className={twMerge(
                  "hover-light-effect group/item group relative mx-4 mb-2 gap-2 rounded-full px-2 py-2",
                  isActive && "bg-mercury-100",
                )}
              >
                <AvatarContainer
                  badgeIcon={
                    groupItem.group.typeGroup === TypeGroup.PRIVATE_GROUP
                      ? null
                      : getIconGroup(
                          groupItem.userId,
                          groupItem.group.userA,
                          groupItem.group.userB,
                        )
                  }
                  avatarUrl={
                    groupItem.group.typeGroup === TypeGroup.PRIVATE_GROUP
                      ? undefined
                      : getAvatarGroupChat(
                          groupItem.userId,
                          groupItem.group.userA,
                          groupItem.group.userB,
                        )
                  }
                  userName={
                    groupItem.group.typeGroup === TypeGroup.PRIVATE_GROUP
                      ? groupItem.group.name
                      : getNameGroup(
                          groupItem.group.userA,
                          groupItem.group.userB,
                        )
                  }
                  badgeClassName={
                    groupItem.group.typeGroup === TypeGroup.PRIVATE_GROUP
                      ? "bg-[#0FE9A4]"
                      : getColorGroupIcon(
                          groupItem.userId,
                          groupItem.group.userA,
                          groupItem.group.userB,
                        )
                  }
                />
                <ActiveEffect isActive={isActive} />
                <div
                  aria-checked={isHasNotification(groupItem.groupId)}
                  className="absolute left-[10px] top-[10px] hidden h-2 w-2 rounded-full bg-red-600 aria-checked:block"
                ></div>
                <MoreChatAction
                  setGroups={setGroups}
                  groupId={groupItem.groupId}
                />
              </div>
            )
          }}
        />
      </div>
    </>
  )
}
export default MessagesContainer
