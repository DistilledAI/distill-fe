import { useEffect, useLayoutEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useAuthState from "./useAuthState"
import useGetChatId from "@pages/ChatPageOld/hooks/useGetChatId"
import useFetchGroups from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { useAppDispatch } from "./useAppRedux"
import { IUser, loginSuccessByAnonymous } from "@reducers/userSlice"
import { postCreateAnonymous } from "services/auth"
import { inviteUserJoinGroup } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

const useJoinGroupLive = () => {
  const dispatch = useAppDispatch()
  const { chatId: groupId, originalChatId } = useGetChatId()
  const { isLogin, user } = useAuthState()
  const { fetchGroups } = useFetchGroups()
  const queryClient = useQueryClient()

  const { data: hasJoinedGroup = true } = useQuery<boolean>({
    initialData: true,
    queryKey: [QueryDataKeys.HAS_JOINED_GROUP],
  })

  const { data: isLoggedOut = false } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_LOGGED_OUT],
  })

  const joinGroupLive = async (userData: IUser, accessToken: string = "") => {
    try {
      const payload = { groupId: Number(groupId), member: [userData?.id] }
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}

      const res = await inviteUserJoinGroup(payload, headers)
      if (res?.data) {
        queryClient.setQueryData([QueryDataKeys.HAS_JOINED_GROUP], true)
        await fetchGroups()
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to join group:", error)
      return false
    }
  }

  const anonymousJoinGroupLive = async () => {
    try {
      const res = await postCreateAnonymous()
      const accessToken = res?.data?.accessToken
      const userAnonymous = res?.data?.user
      const expiry = Date.now() + ONE_DAY_IN_MS

      if (!userAnonymous || !accessToken) return

      const isJoined = await joinGroupLive(userAnonymous, accessToken)
      if (isJoined) {
        setTimeout(() => {
          dispatch(
            loginSuccessByAnonymous({
              user: userAnonymous,
              accessToken,
              expiry,
            }),
          )
          queryClient.setQueryData([QueryDataKeys.HAS_JOINED_GROUP], true)
          fetchGroups()
        }, 10)
      }
    } catch (error) {
      console.error("Failed to join group anonymously:", error)
    }
  }

  useLayoutEffect(() => {
    if (originalChatId) {
      queryClient.setQueryData([QueryDataKeys.HAS_JOINED_GROUP], false)
    }
  }, [groupId, originalChatId, queryClient])

  useEffect(() => {
    if (groupId && !isLogin && !user?.id && !isLoggedOut) {
      anonymousJoinGroupLive()
    }
  }, [groupId, isLogin, user?.id, isLoggedOut])

  useEffect(() => {
    if (isLogin && !hasJoinedGroup && groupId && user?.id) {
      joinGroupLive(user)
    }
  }, [isLogin, user?.id, hasJoinedGroup, groupId])

  return {}
}

export default useJoinGroupLive
