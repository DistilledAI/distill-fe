import { useEffect, FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import { useQuery } from "@tanstack/react-query"
import { PATH_NAMES } from "@constants/index"
import { QueryDataKeys } from "types/queryDataKeys"
import useWindowSize from "@hooks/useWindowSize"
import useGetChatId from "@pages/ChatPage/hooks/useGetChatId"
import HeaderBack from "@components/Layout/Header/HeaderBack"
import AvatarCustom from "@components/AvatarCustom"
import { maxAvatarPlaceholder } from "@assets/images"
import ChatMyAgentBox from "./ChatMyAgent/ChatMyAgentBox"
import ChatMyAgentEmpty from "./ChatMyAgent/ChatMyAgentEmpty"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import MoreAction from "@components/ChatInfoCurrent/MoreAction"
import { TypeGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"

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
  const { chatId } = useGetChatId()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && !!myAgent?.id

  const { data: groupDetail } = useQuery<GroupDetail>({
    queryKey: [`${QueryDataKeys.GROUP_DETAIL}-${chatId}`],
    enabled: isMobile && !!chatId,
  })

  const userB = groupDetail?.data?.group?.userB

  useEffect(() => {
    if (!myAgent?.id && !isChatAgentOther) {
      navigate(
        isMobile
          ? `${PATH_NAMES.PRIVATE_AGENT}/empty`
          : PATH_NAMES.PRIVATE_AGENT,
      )
    } else if (isChatMyAgent) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${myAgent?.id}`)
    }
  }, [myAgent?.id, isChatAgentOther, isChatMyAgent, isMobile, navigate])

  const getHeaderName = () => {
    return isChatAgentOther ? userB?.username : myAgent?.username
  }

  console.log({ groupDetail })

  const renderHeaderContent = () => {
    if (!isChatAgentOther && !isChatMyAgent) return null

    const user = isChatAgentOther ? userB : myAgent
    const avatarSrc = isChatAgentOther
      ? userB?.avatar
      : myAgent?.avatar || maxAvatarPlaceholder

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
            groupId={Number(chatId)}
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
