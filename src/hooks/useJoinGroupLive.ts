import { useEffect, useLayoutEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useAuthState from "./useAuthState"
import useGroupDetailByLabel from "@pages/ChatPageOld/hooks/useGroupDetailByLabel"
import { useAppDispatch } from "./useAppRedux"
import { IUser, loginSuccessByAnonymous } from "@reducers/userSlice"
import { postCreateAnonymous } from "services/auth"
import { inviteUserJoinGroup } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { useParams } from "react-router-dom"

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

const useJoinGroupLive = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { chatId: label = "" } = useParams()
  const { isLogin, user } = useAuthState()
  const { groupId, groupDetailByLabel, isFetched, isError } =
    useGroupDetailByLabel(label)

  const getHasJoinedGroupKey = (groupId?: string | number) => [
    QueryDataKeys.HAS_JOINED_GROUP,
    groupId?.toString(),
  ]

  const { data: hasJoinedGroup = false } = useQuery<boolean>({
    initialData: false,
    queryKey: getHasJoinedGroupKey(groupId),
  })

  const { data: isLoggedOut = false } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_LOGGED_OUT],
  })

  const handleJoinGroup = async (userData: IUser, accessToken?: string) => {
    if (hasJoinedGroup || !groupId) return true

    try {
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}
      const res = await inviteUserJoinGroup(
        { groupId: Number(groupId), member: [userData.id] },
        headers,
      )

      if (res?.data) {
        queryClient.setQueryData(getHasJoinedGroupKey(groupId), true)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to join group:", error)
      return false
    }
  }

  const handleAnonymousJoin = async () => {
    if (hasJoinedGroup) return

    try {
      const { data } = await postCreateAnonymous()
      if (!data?.user || !data?.accessToken) return

      const isJoined = await handleJoinGroup(data.user, data.accessToken)
      if (isJoined) {
        const expiry = Date.now() + ONE_DAY_IN_MS
        setTimeout(() => {
          dispatch(
            loginSuccessByAnonymous({
              user: data.user,
              accessToken: data.accessToken,
              expiry,
            }),
          )
          queryClient.setQueryData(getHasJoinedGroupKey(groupId), true)
        }, 10)
      }
    } catch (error) {
      console.error("Failed to join group anonymously:", error)
    }
  }

  useLayoutEffect(() => {
    if (
      label &&
      groupId &&
      queryClient.getQueryData(getHasJoinedGroupKey(groupId)) === undefined
    ) {
      queryClient.setQueryData(getHasJoinedGroupKey(groupId), false)
    }
  }, [label, groupId])

  useEffect(() => {
    if (groupId && !isLogin && !user?.id && !isLoggedOut) {
      handleAnonymousJoin()
    }
  }, [groupId, isLogin, user?.id, isLoggedOut])

  useEffect(() => {
    if (isLogin && !hasJoinedGroup && groupId && user?.id) {
      handleJoinGroup(user)
    }
  }, [isLogin, user?.id, hasJoinedGroup, groupId])

  return {
    groupDetailByLabel,
    isFetched,
    isError,
  }
}

export default useJoinGroupLive
