import { IMessage } from "./ChatMessages/useFetchMessages"

export const getToUserId = (data: IMessage, currentUserId: number) => {
  if (!data || !data?.group) return 0
  return data.group.userAId === currentUserId
    ? data.group.userBId
    : data.group.userAId
}
