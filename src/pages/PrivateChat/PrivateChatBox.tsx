import { useEffect, FC } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import { useQuery } from "@tanstack/react-query"
import { PATH_NAMES } from "@constants/index"
import { QueryDataKeys } from "types/queryDataKeys"
import useWindowSize from "@hooks/useWindowSize"
import HeaderBack from "@components/Layout/Header/HeaderBack"
import AvatarCustom from "@components/AvatarCustom"
import { distilledAiPlaceholder } from "@assets/images"
import ChatMyAgentBox from "./ChatMyAgent/ChatMyAgentBox"
import MyAgentEmpty from "./ChatMyAgent/MyAgentEmpty"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import MoreAction from "@components/ChatInfoCurrent/MoreAction"
import { TypeGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import useAuthState from "@hooks/useAuthState"

interface User {
  id?: string
  publicAddress: string
  avatar?: string
  username: string
}

interface GroupDetail {
  data: {
    group: {
      typeGroup: TypeGroup
      userB: User
    }
  }
}

const PrivateChatBox: FC = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { privateChatId, chatId } = useParams<{
    privateChatId?: string
    chatId?: string
  }>()
  const { isMobile } = useWindowSize()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { user } = useAuthState()
  const groupId = privateChatId || chatId

  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && !!myAgent?.id

  const { data: groupDetail } = useQuery<GroupDetail>({
    queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${groupId}`],
    enabled: isMobile && !!groupId,
  })

  const userB = groupDetail?.data?.group?.userB
  const queryParams = new URLSearchParams(search)

  useEffect(() => {
    const queryString = queryParams.toString()
    const appendQuery = queryString ? `?${queryString}` : ""

    if (
      !myAgent?.id &&
      !isChatAgentOther &&
      user?.id &&
      !pathname.startsWith(PATH_NAMES.INVITE)
    ) {
      navigate(
        isMobile
          ? `${PATH_NAMES.PRIVATE_AGENT}/empty${appendQuery}`
          : `${PATH_NAMES.PRIVATE_AGENT}${appendQuery}`,
        { replace: true },
      )
    } else if (pathname === PATH_NAMES.PRIVATE_AGENT && myAgent?.id) {
      navigate(`${PATH_NAMES.INVITE}/${myAgent.id}${appendQuery}`, {
        replace: true,
      })
    }
  }, [
    myAgent?.id,
    isChatAgentOther,
    isMobile,
    user?.id,
    pathname,
    search,
    navigate,
  ])

  const getHeaderName = () => {
    return isChatAgentOther ? userB?.username : myAgent?.username
  }

  const renderHeaderContent = () => {
    if (!isChatAgentOther && !isChatMyAgent) return null

    const user = isChatAgentOther ? userB : myAgent
    const avatarSrc = isChatAgentOther
      ? userB?.avatar
      : myAgent?.avatar || distilledAiPlaceholder

    if (!user) return null

    return (
      <div className="flex items-center gap-1">
        <AvatarCustom
          publicAddress={user.publicAddress || ""}
          src={avatarSrc}
          className="h-8 w-8 border-none"
        />
        <span className="line-clamp-1 max-w-[120px] text-16 font-bold text-mercury-950">
          {user.username}
        </span>
        {userB && (
          <MoreAction
            groupId={Number(groupId)}
            groupType={groupDetail?.data?.group?.typeGroup as TypeGroup}
          />
        )}
      </div>
    )
  }

  const renderChatContent = () => {
    if (isChatAgentOther) return <ChatAgentOthersBox />
    return myAgent?.id ? <ChatMyAgentBox /> : <MyAgentEmpty />
  }

  return (
    <>
      <HeaderBack
        name={getHeaderName()}
        onBack={() => navigate(PATH_NAMES.PRIVATE_AGENT)}
      >
        {renderHeaderContent()}
      </HeaderBack>
      {renderChatContent()}
    </>
  )
}

export default PrivateChatBox
