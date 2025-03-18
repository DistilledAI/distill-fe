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
  const { groupId, groupDetailByLabel, isFetched } =
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

  const joinGroupLive = async (userData: IUser, accessToken: string = "") => {
    if (hasJoinedGroup) {
      return true
    }

    try {
      const payload = { groupId: Number(groupId), member: [userData?.id] }
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}

      const res = await inviteUserJoinGroup(payload, headers)
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

  const anonymousJoinGroupLive = async () => {
    if (hasJoinedGroup) {
      return
    }

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
          queryClient.setQueryData(getHasJoinedGroupKey(groupId), true)
        }, 10)
      }
    } catch (error) {
      console.error("Failed to join group anonymously:", error)
    }
  }

  useLayoutEffect(() => {
    if (label && groupId) {
      if (
        queryClient.getQueryData(getHasJoinedGroupKey(groupId)) === undefined
      ) {
        queryClient.setQueryData(getHasJoinedGroupKey(groupId), false)
      }
    }
  }, [label, groupId])

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

  return {
    groupDetailByLabel,
    isFetched,
  }
}

export default useJoinGroupLive
