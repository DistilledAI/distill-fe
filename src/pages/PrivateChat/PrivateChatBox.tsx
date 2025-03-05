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
import ChatMyAgentEmpty from "./ChatMyAgent/ChatMyAgentEmpty"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import MoreAction from "@components/ChatInfoCurrent/MoreAction"
import { TypeGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import useAuthState from "@hooks/useAuthState"

interface User {
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
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
  const { privateChatId, chatId } = useParams()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { user } = useAuthState()
  const groupId = privateChatId || chatId

  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)

  const { data: groupDetail } = useQuery<GroupDetail>({
    queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${groupId}`],
    enabled: isMobile && !!groupId,
  })
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && !!myAgent?.id
  const userB = groupDetail?.data?.group?.userB

  useEffect(() => {
    if (
      !myAgent?.id &&
      !isChatAgentOther &&
      user?.id &&
      !pathname.startsWith(PATH_NAMES.INVITE)
    ) {
      navigate(
        isMobile
          ? `${PATH_NAMES.PRIVATE_AGENT}/empty`
          : PATH_NAMES.PRIVATE_AGENT,
      )
    } else if (pathname === PATH_NAMES.PRIVATE_AGENT && myAgent?.id) {
      navigate(`${PATH_NAMES.INVITE}/${myAgent?.id}`)
    }
  }, [myAgent?.id, isChatAgentOther, isMobile, user?.id, pathname])

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
          className={`h-8 w-8 border-none`}
        />
        <span
          className={`max-w-[120px}] line-clamp-1 text-16 font-bold text-mercury-950`}
        >
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
    return myAgent?.id ? <ChatMyAgentBox /> : <ChatMyAgentEmpty />
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
