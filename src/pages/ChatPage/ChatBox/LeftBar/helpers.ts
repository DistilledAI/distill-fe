import { RoleUser } from "@constants/index"
import { IUser } from "@reducers/user/UserSlice"

export const getAvatarGroupChat = (
  ownerId: number,
  userA: IUser,
  userB: IUser,
) => {
  return ownerId === userA?.id ? userB?.avatar : userA?.avatar
}

export const getRoleUser = (ownerId: number, userA: IUser, userB: IUser) => {
  const info = ownerId === userA?.id ? userB : userA
  if (info?.role === RoleUser.ANONYMOUS) return RoleUser.USER
  return info?.role === RoleUser.USER ? RoleUser.USER : RoleUser.BOT
}
