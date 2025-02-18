import { useState } from "react"
import { getMyPrivateAgent } from "services/chat"

export const PRIVATE_AGENT_STATUS = {
  ACTIVE: 1,
  SUSPENDED: 2,
  DELETED: 3,
  PENDING: 4,
}

const usePrivateAgent = () => {
  const [listBot, setListBot] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const firstBot = listBot?.[0]

  const callGetMyPrivateAgent = async () => {
    try {
      setLoading(true)
      const res = await getMyPrivateAgent()
      if (res) {
        setListBot(res?.data?.items)
      }
    } catch (error) {
      setListBot([])
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  return { privateAgentData: firstBot, callGetMyPrivateAgent, loading }
}

export default usePrivateAgent
