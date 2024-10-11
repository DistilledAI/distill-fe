import { PATH_NAMES } from "@constants/index"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { checkGroupDirect, createGroupChat } from "services/chat"
import useAuthState from "./useAuthState"
import { postCreateAnonymous } from "services/auth"
import { cachedSessionStorage, storageKey } from "@utils/storage"

const useInviteUser = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { pathname } = useLocation()
  const { user, isLogin } = useAuthState()
  const userId = Number(params?.userId)
  const isInvitePathName = pathname === `${PATH_NAMES.INVITE}/${userId}`
  const sessionAccessToken = cachedSessionStorage.getWithExpiry(
    storageKey.ACCESS_TOKEN,
  )

  const handleInviteUserLoggedIn = async (userId: number) => {
    try {
      const checkGroupDirectResponse = await checkGroupDirect({
        members: [userId],
      })
      const groupId = checkGroupDirectResponse?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [userId],
        })
        const newGroupId = createGroupResponse?.data?.id
        if (newGroupId) {
          navigate(`${PATH_NAMES.CHAT}/${newGroupId}?isInvited=true`)
        }
        return
      }
      navigate(`${PATH_NAMES.CHAT}/${groupId}`)
    } catch (error) {
      console.log("error", error)
      navigate(`/${PATH_NAMES.CHAT}`)
    }
  }

  const handleInviteAnonymous = async () => {
    try {
      const res = await postCreateAnonymous()
      const accessToken = res?.data?.accessToken
      const expiry = Date.now() + 24 * 60 * 60 * 1000

      if (accessToken) {
        cachedSessionStorage.setWithExpiry(
          storageKey.ACCESS_TOKEN,
          accessToken,
          expiry,
        )
        handleInviteUserLoggedIn(userId)
      } else {
        console.log("Access token not found in response")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (isInvitePathName && !isLogin && !sessionAccessToken) {
      handleInviteAnonymous()
    }
  }, [isInvitePathName, isLogin, sessionAccessToken])

  useEffect(() => {
    if (isInvitePathName && user?.id !== userId && isLogin) {
      handleInviteUserLoggedIn(userId)
    }
  }, [pathname, userId, user?.id, isLogin])

  return { handleInviteUserLoggedIn }
}

export default useInviteUser
