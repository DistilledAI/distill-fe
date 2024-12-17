import { PATH_NAMES } from "@constants/index"
import useFetchGroups, {
  UserGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { IUser, loginSuccessByAnonymous } from "@reducers/userSlice"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { postCreateAnonymous } from "services/auth"
import { getGroupChatDetail, inviteUserJoinGroup } from "services/chat"
import { useAppDispatch } from "./useAppRedux"
import useAuthState from "./useAuthState"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"

const useJoinGroupLive = () => {
  const { chatId: groupId } = useGetChatId()
  const { isLogin, user } = useAuthState()
  const [searchParams] = useSearchParams()
  const prediction = searchParams.get("prediction")
  const dispatch = useAppDispatch()
  const { fetchGroups } = useFetchGroups()
  const navigate = useNavigate()
  const [groupDetail, setGroupDetail] = useState<UserGroup | null>(null)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [hasJoined, setHasJoined] = useState<boolean>(false)

  useEffect(() => {
    if (groupId) setHasJoined(false)
  }, [groupId])

  const getGroupDetail = async () => {
    try {
      setIsFetched(false)
      const params =
        groupId && groupId?.toString().includes("@")
          ? { filter: `{"label":"${groupId}"}` }
          : { filter: `{"groupId":${groupId}}` }
      const res = await getGroupChatDetail(params)
      setGroupDetail(res?.data)
    } catch (e) {
      console.log({ e })
    } finally {
      setIsFetched(true)
    }
  }

  const joinGroupLive = async (user: IUser, accessToken: string = "") => {
    const payload = { groupId: Number(groupId), member: [user?.id] }
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {}

    const res = await inviteUserJoinGroup(payload, headers)
    if (res?.data) {
      if (!accessToken) {
        await getGroupDetail()
        await fetchGroups()
      }
      navigate(
        `${PATH_NAMES.CLAN}/${res?.data?.group?.label}${prediction ? "?prediction=true" : ""}`,
      )
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
          await fetchGroups()
          setHasJoined(true) // Mark as joined after successful login
        }, 10)
      }
    }
  }

  useEffect(() => {
    if (groupId && !hasJoined) {
      if (!isLogin) {
        anonymousJoinGroupLive()
      } else if (isLogin && !hasJoined) {
        joinGroupLive(user)
      }
    }
  }, [groupId, isLogin, user, hasJoined])

  return { groupDetail, isFetched }
}

export default useJoinGroupLive
