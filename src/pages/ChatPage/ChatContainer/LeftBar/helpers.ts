import { RoleUser } from "@constants/index"
import { IUser } from "@reducers/userSlice"

export const getAvatarGroupChat = (
  ownerId: number,
  userA: IUser,
  userB: IUser,
) => {
  return ownerId === userA?.id ? userB?.avatar : userA?.avatar
}

export const getPublicAddressGroupChat = (
  ownerId: number,
  userA: IUser,
  userB: IUser,
) => {
  return ownerId === userA?.id ? userB?.publicAddress : userA?.publicAddress
}

export const getRoleUser = (ownerId: number, userA: IUser, userB: IUser) => {
  const info = ownerId === userA?.id ? userB : userA
  if (info?.role === RoleUser.ANONYMOUS) return RoleUser.USER
  return info?.role === RoleUser.USER ? RoleUser.USER : RoleUser.BOT
}

export const isHasNotification = (
  groupsHaveNotification: number[],
  groupId: number,
  chatId: number,
) => {
  if (groupId === Number(chatId)) return false
  return groupsHaveNotification.includes(groupId)
}

export const getColorGroupIcon = (
  ownerId: number,
  userA: IUser,
  userB: IUser,
) => {
  return getRoleUser(ownerId, userA, userB) === RoleUser.USER
    ? "bg-[#0FE9A4]"
    : "bg-[#FC0]"
}

export const getNameGroup = (
  user: IUser | null,
  userA: IUser,
  userB: IUser,
) => {
  return userA?.id === user?.id ? userB?.username : userA?.username
}
