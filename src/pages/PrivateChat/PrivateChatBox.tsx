import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import HeaderBack from "@components/Layout/Header/HeaderBack"
import AvatarCustom from "@components/AvatarCustom"
import { distilledAiPlaceholder } from "@assets/images"
import ChatMyAgentBox from "./ChatMyAgent/ChatMyAgentBox"
import MyAgentEmpty from "./ChatMyAgent/MyAgentEmpty"
import ChatAgentOthersBox from "./ChatAgentOthers/ChatAgentOthersBox"
import MoreAction from "@components/ChatInfoCurrent/MoreAction"
import { TypeGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import useAuthState from "@hooks/useAuthState"
import useGroupDetail from "@pages/ChatPageOld/hooks/useGroupDetail"

const PrivateChatBox = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { privateChatId, chatId } = useParams()
  const { isMobile } = useWindowSize()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isStatusFetchMyAgent = useAppSelector(
    (state) => state.agents.isStatusFetchMyAgent,
  )
  const { user } = useAuthState()
  const groupId = privateChatId || chatId

  const isChatAgentOther = pathname.startsWith(PATH_NAMES.CHAT)
  const isChatMyAgent =
    pathname.startsWith(PATH_NAMES.PRIVATE_AGENT) && !!myAgent?.id
  const { groupDetail } = useGroupDetail(isMobile ? groupId : undefined)

  const userB = groupDetail?.group?.userB
  const queryParams = new URLSearchParams(search)
  const myAgentFetched =
    isStatusFetchMyAgent === "fetched" || !isStatusFetchMyAgent

  useEffect(() => {
    const queryString = queryParams.toString()
    const appendQuery = queryString ? `?${queryString}` : ""

    if (
      !myAgent?.id &&
      !isChatAgentOther &&
      user?.id &&
      !pathname.startsWith(PATH_NAMES.INVITE) &&
      myAgentFetched
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
    myAgentFetched,
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
            groupType={groupDetail?.group?.typeGroup as TypeGroup}
          />
        )}
      </div>
    )
  }

  const renderChatContent = () => {
    if (isChatAgentOther) return <ChatAgentOthersBox />
    if (!myAgent?.id && myAgentFetched) {
      return <MyAgentEmpty />
    }
    if (myAgent?.id && myAgentFetched) {
      return <ChatMyAgentBox />
    }
    return null
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
