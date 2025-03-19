import { PATH_NAMES } from "@constants/index"
import {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { loginSuccessByAnonymous } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { cachedSessionStorage, storageKey } from "@utils/storage"
import { useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { postCreateAnonymous } from "services/auth"
import { checkGroupDirect, createGroupChat } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "./useAuthState"
import useWindowSize from "./useWindowSize"
import { useAppSelector } from "./useAppRedux"
import { PRIVATE_AGENT_STATUS } from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/usePrivateAgent"
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

  const handleCreateOrGetGroupChat = useCallback(
    async (newAgentId: number) => {
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

      return groupId
    },
    [isMobile, queryClient],
  )

  const handleInviteUserLoggedIn = useCallback(
    async (agentId: number) => {
      try {
        let newAgentId = agentId
        if (
          agentId === myAgent?.id &&
          myAgent?.status !== PRIVATE_AGENT_STATUS.ACTIVE
        ) {
          newAgentId = envConfig.groupDefaultForPrivateAgent
        }

        const groupId = await handleCreateOrGetGroupChat(newAgentId)

        const chatPath =
          agentId === myAgent?.id
            ? `${PATH_NAMES.PRIVATE_AGENT}/${groupId}`
            : `${PATH_NAMES.CHAT}/${groupId}`

        navigate(chatPath)

        if (agentId !== myAgent?.id) {
          queryClient.invalidateQueries({
            queryKey: [
              QueryDataKeys.MY_LIST_CHAT,
              { typeGroup: TypeGroup.DIRECT },
            ],
          })
        }
      } catch (error) {
        console.error("Invite error:", error)
        navigate(PATH_NAMES.HOME)
      }
    },
    [myAgent, navigate, queryClient],
  )

  const handleInviteAnonymous = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    const handleInvite = async () => {
      if (isInvitePath) {
        if (!isLogin && !sessionAccessToken) {
          await handleInviteAnonymous()
        } else if (sessionAccessToken && isLogin && agentId) {
          await handleInviteUserLoggedIn(agentId)
        } else if (user?.id !== agentId && isLogin && !sessionAccessToken) {
          await handleInviteUserLoggedIn(agentId)
        }
      }
    }

    handleInvite()
  }, [isInvitePath, isLogin, sessionAccessToken, agentId, user?.id])

  return { handleInviteUserLoggedIn, handleInviteAnonymous }
}

export default useInviteAgent
