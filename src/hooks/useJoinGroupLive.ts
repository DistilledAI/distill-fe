import useFetchGroups from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { IUser, loginSuccessByAnonymous } from "@reducers/userSlice"
import { useEffect, useLayoutEffect } from "react"
import { postCreateAnonymous } from "services/auth"
import { useAppDispatch } from "./useAppRedux"
import useAuthState from "./useAuthState"
import { inviteUserJoinGroup } from "services/chat"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const useJoinGroupLive = () => {
  const dispatch = useAppDispatch()
  const { chatId: groupId, originalChatId } = useGetChatId()
  const { isLogin, user } = useAuthState()
  const { fetchGroups } = useFetchGroups()
  const queryClient = useQueryClient()
  const { data: hasJoinedGroup } = useQuery<boolean>({
    initialData: true,
    queryKey: [QueryDataKeys.HAS_JOINED_GROUP],
  })

  const { data: isLoggedOut } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_LOGGED_OUT],
  })

  useLayoutEffect(() => {
    if (originalChatId) {
      queryClient.setQueryData([QueryDataKeys.HAS_JOINED_GROUP], () => false)
    }
  }, [groupId, originalChatId])

  const joinGroupLive = async (user: IUser, accessToken: string = "") => {
    const payload = { groupId: Number(groupId), member: [user?.id] }
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {}

    const res = await inviteUserJoinGroup(payload, headers)
    if (res?.data) {
      queryClient.setQueryData([QueryDataKeys.HAS_JOINED_GROUP], () => true)
      return true
    }
    return false
  }

  const anonymousJoinGroupLive = async () => {
    const res = await postCreateAnonymous()
    const accessToken = res?.data?.accessToken
    const userAnonymous = res?.data?.user
    const expiry = Date.now() + 24 * 60 * 60 * 1000

    if (userAnonymous) {
      const isJoined = await joinGroupLive(userAnonymous, accessToken)
      if (isJoined) {
        setTimeout(async () => {
          dispatch(
            loginSuccessByAnonymous({
              user: userAnonymous,
              accessToken,
              expiry,
            }),
          )
          queryClient.setQueryData([QueryDataKeys.HAS_JOINED_GROUP], () => true)
          await fetchGroups()
        }, 10)
      }
    }
  }

  useEffect(() => {
    if (groupId && !isLogin && !user?.id && !isLoggedOut) {
      anonymousJoinGroupLive()
    }
  }, [groupId, isLogin, user?.id, isLoggedOut])

  useEffect(() => {
    if (isLogin && !hasJoinedGroup && groupId) {
      joinGroupLive(user)
      fetchGroups()
    }
  }, [isLogin, user?.id, hasJoinedGroup, groupId])

  return
}

export default useJoinGroupLive
