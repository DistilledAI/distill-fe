import AvatarContainer from "@components/AvatarContainer"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { envConfig } from "@configs/env"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { ConfigBotType } from "@types"
import React from "react"
import { useNavigate } from "react-router-dom"

const SearchResult: React.FC<{
  data: any[]
  selectedCallback?: () => void
}> = ({ data, selectedCallback }) => {
  const navigate = useNavigate()
  const { user } = useAuthState()

  // const handleSelectPerson = async (chat: any) => {
  //   try {
  //     const receiverId = chat?.id
  //     const checkGroupDirectResponse = await checkGroupDirect({
  //       members: [receiverId],
  //     })
  //     const groupId = checkGroupDirectResponse?.data?.group?.id
  //     if (!groupId) {
  //       const createGroupResponse = await createGroupChat({
  //         members: [receiverId],
  //       })
  //       const newGroupId = createGroupResponse?.data?.groupId
  //       if (newGroupId) {
  //         navigate(`/chat/${newGroupId}`)
  //         if (selectedCallback) selectedCallback()
  //       }
  //       return
  //     }

  //     navigate(`/chat/${groupId}`)
  //     if (selectedCallback) selectedCallback()
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }

  const handleChatWithAgent = async (agent: IUser) => {
    const isBotLive = agent?.configBot === ConfigBotType.LIVE
    if (isBotLive) {
      const groupId = envConfig.groupIdMax
      navigate(`${PATH_NAMES.CLAN}/${groupId}`)
      if (selectedCallback) selectedCallback()
      return
    }

    if (user && user.id === agent.owner) {
      navigate(`${PATH_NAMES.HOME}`)
    } else {
      const inviteUrl = `${PATH_NAMES.INVITE}/${agent?.id}`
      navigate(inviteUrl)
      if (selectedCallback) selectedCallback()
    }
  }

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  return data.map((agent) => {
    return (
      <div
        key={agent.id}
        onClick={() => handleChatWithAgent(agent)}
        className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2"
      >
        <AvatarContainer
          badgeIcon={getBadgeIcon(agent?.role)}
          avatarUrl={agent?.avatar}
          userName={agent?.username}
          publicAddress={agent?.publicAddress}
          badgeClassName={
            agent?.role === RoleUser.USER ? "bg-[#0FE9A4]" : "bg-yellow-10"
          }
        />
      </div>
    )
  })
}

export default SearchResult
