import { PATH_NAMES } from "@constants/index"
import useFetchGroups, {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { loginSuccessByAnonymous } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { cachedSessionStorage, storageKey } from "@utils/storage"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { postCreateAnonymous } from "services/auth"
import { checkGroupDirect, createGroupChat } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "./useAuthState"
import useWindowSize from "./useWindowSize"
import { useAppSelector } from "./useAppRedux"

const useInviteAgent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { isMobile } = useWindowSize()
  const params = useParams()
  const { pathname } = useLocation()
  const { user, isLogin } = useAuthState()
  const agentId = Number(params?.inviteAgentId)
  const isInvitePathName = pathname === `${PATH_NAMES.INVITE}/${agentId}`
  const sessionAccessToken = cachedSessionStorage.getWithExpiry(
    storageKey.ACCESS_TOKEN,
  )
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  useFetchGroups()

  const handleInviteUserLoggedIn = async (agentId: number) => {
    try {
      const checkGroupDirectResponse = await checkGroupDirect({
        members: [agentId],
      })
      const groupId = checkGroupDirectResponse?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [agentId],
        })
        const newData = createGroupResponse.data
        if (newData && isMobile)
          queryClient.setQueryData(
            [QueryDataKeys.MY_LIST_CHAT],
            (oldData: UserGroup[]) => {
              return [newData].concat(oldData ?? [])
            },
          )
        const newGroupId = newData?.groupId
        if (newGroupId) {
          if (agentId === myAgent?.id) {
            navigate(`${PATH_NAMES.PRIVATE_AGENT}/${newGroupId}`)
          } else {
            navigate(`${PATH_NAMES.CHAT}/${newGroupId}`)
          }
        }
        return queryClient.invalidateQueries({
          queryKey: [
            QueryDataKeys.MY_LIST_CHAT,
            {
              typeGroup: TypeGroup.DIRECT,
            },
          ],
        })
      }

      if (agentId === myAgent?.id) {
        navigate(`${PATH_NAMES.PRIVATE_AGENT}/${groupId}`)
      } else {
        navigate(`${PATH_NAMES.CHAT}/${groupId}`)
      }
    } catch (error) {
      console.log("error", error)
      navigate(PATH_NAMES.HOME)
    }
  }

  const handleInviteAnonymous = async () => {
    try {
      const res = await postCreateAnonymous()
      const accessToken = res.data?.accessToken
      const userAnonymous = res.data?.user
      const expiry = Date.now() + 24 * 60 * 60 * 1000

      if (accessToken && userAnonymous) {
        dispatch(
          loginSuccessByAnonymous({
            user: userAnonymous,
            accessToken,
            expiry,
          }),
        )
      } else {
        console.log("Access token not found in response")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    const isAnonymous = isInvitePathName && !isLogin && !sessionAccessToken
    if (isAnonymous) {
      handleInviteAnonymous()
    }
  }, [isInvitePathName, isLogin, sessionAccessToken])

  useEffect(() => {
    const isRealUser =
      isInvitePathName && user?.id !== agentId && isLogin && !sessionAccessToken
    if (isRealUser) {
      handleInviteUserLoggedIn(agentId)
    }
  }, [isInvitePathName, agentId, user?.id, isLogin, sessionAccessToken])

  useEffect(() => {
    const isAnonymousLogged =
      sessionAccessToken && isLogin && isInvitePathName && agentId
    if (isAnonymousLogged) handleInviteUserLoggedIn(agentId)
  }, [agentId, sessionAccessToken, isLogin, isInvitePathName])

  return { handleInviteUserLoggedIn, handleInviteAnonymous }
}

export default useInviteAgent
