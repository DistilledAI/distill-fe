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
import { PRIVATE_AGENT_STATUS } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/usePrivateAgent"
import { envConfig } from "@configs/env"

const useInviteAgent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { isMobile } = useWindowSize()
  const { pathname } = useLocation()
  const { inviteAgentId } = useParams()
  const { user, isLogin } = useAuthState()
  const agentId = Number(inviteAgentId)
  const isInvitePath = pathname === `${PATH_NAMES.INVITE}/${agentId}`
  const sessionAccessToken = cachedSessionStorage.getWithExpiry(
    storageKey.ACCESS_TOKEN,
  )
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  useFetchGroups()

  const handleInviteUserLoggedIn = async (agentId: number) => {
    try {
      let newAgentId = agentId
      if (
        agentId === myAgent?.id &&
        myAgent?.status !== PRIVATE_AGENT_STATUS.ACTIVE
      ) {
        newAgentId = envConfig.groupDefaultForPrivateAgent
      }
      const { data } = await checkGroupDirect({ members: [newAgentId] })
      let groupId = data?.group?.id

      if (!groupId) {
        const { data: newData } = await createGroupChat({
          members: [newAgentId],
        })
        groupId = newData?.groupId

        if (newData && isMobile) {
          queryClient.setQueryData<UserGroup[]>(
            [QueryDataKeys.MY_LIST_CHAT],
            (oldData) => [newData].concat(oldData ?? []),
          )
        }
      }

      navigate(
        agentId === myAgent?.id
          ? `${PATH_NAMES.PRIVATE_AGENT}/${groupId}`
          : `${PATH_NAMES.CHAT}/${groupId}`,
      )

      queryClient.invalidateQueries({
        queryKey: [QueryDataKeys.MY_LIST_CHAT, { typeGroup: TypeGroup.DIRECT }],
      })
    } catch (error) {
      console.error("Invite error:", error)
      // navigate(PATH_NAMES.HOME)
    }
  }

  const handleInviteAnonymous = async () => {
    try {
      const { data } = await postCreateAnonymous()
      if (data?.accessToken && data?.user) {
        dispatch(
          loginSuccessByAnonymous({
            user: data.user,
            accessToken: data.accessToken,
            expiry: Date.now() + 24 * 60 * 60 * 1000,
          }),
        )
      }
    } catch (error) {
      console.error("Anonymous invite error:", error)
    }
  }

  useEffect(() => {
    if (isInvitePath && !isLogin && !sessionAccessToken) {
      handleInviteAnonymous()
    }
  }, [isInvitePath, isLogin, sessionAccessToken])

  useEffect(() => {
    if (
      isInvitePath &&
      user?.id !== agentId &&
      isLogin &&
      !sessionAccessToken
    ) {
      handleInviteUserLoggedIn(agentId)
    }
  }, [isInvitePath, agentId, user?.id, isLogin, sessionAccessToken])

  useEffect(() => {
    if (isInvitePath && sessionAccessToken && isLogin && agentId) {
      handleInviteUserLoggedIn(agentId)
    }
  }, [agentId, sessionAccessToken, isLogin, isInvitePath])

  return { handleInviteUserLoggedIn, handleInviteAnonymous }
}

export default useInviteAgent
