import DotLoading from "@components/DotLoading"
import { envConfig } from "@configs/env"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkGroupDirect, createGroupChat } from "services/chat"
import CreatePrivateAgent from "./CreatePrivateAgent"
import { PRIVATE_AGENT_STATUS } from "./usePrivateAgent"
import { useAppSelector } from "@hooks/useAppRedux"

const MyPrivateAgentContent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const groupDefaultForPrivateAgent = envConfig.groupDefaultForPrivateAgent
  const privateAgentData = useAppSelector((state) => state.agents.myAgent)
  const { isLogin, user } = useAuthState()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const privateAgentStatus = privateAgentData?.status as number
  const privateAgentId = privateAgentData?.id
  const MAP_MEMBER_ID_FROM_STATUS = {
    [PRIVATE_AGENT_STATUS.PENDING]: groupDefaultForPrivateAgent,
    [PRIVATE_AGENT_STATUS.ACTIVE]: privateAgentId,
  }
  const memberId = MAP_MEMBER_ID_FROM_STATUS[privateAgentStatus]

  const checkCreatedGroupAgent = async () => {
    if (!memberId) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const res = await checkGroupDirect({
        members: [memberId],
      })
      const groupId = res?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [memberId],
        })
        const newGroupId = createGroupResponse?.data?.groupId
        if (newGroupId) {
          navigate(`${PATH_NAMES.PRIVATE_AGENT}/${newGroupId}`)
        }
        return
      }
      return navigate(`${PATH_NAMES.PRIVATE_AGENT}/${groupId}`)
    } catch (error) {
      console.log(error, "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (privateAgentStatus) checkCreatedGroupAgent()

    setTimeout(() => {
      const isRealUserAndHaveNoAgent =
        !privateAgentData && isLogin && user?.role !== RoleUser.ANONYMOUS
      if (isRealUserAndHaveNoAgent) setIsLoading(false)
    }, 1000)
  }, [privateAgentStatus, isLogin, user?.role])

  const isLoadingDisplay =
    isLoading && isLogin && user?.role !== RoleUser.ANONYMOUS

  if (isLoadingDisplay)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <DotLoading />
      </div>
    )

  return (
    <CreatePrivateAgent
      connectWalletLoading={connectWalletLoading}
      connectWallet={connectWallet}
    />
  )
}
export default MyPrivateAgentContent
