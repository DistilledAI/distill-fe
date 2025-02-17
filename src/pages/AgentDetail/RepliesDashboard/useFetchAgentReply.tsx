import { useEffect, useState } from "react"
import { getAgentReply } from "services/agent"

const useFetchAgentReply = ({ filter }: { filter: any }) => {
  const [agentReplyData, setAgentReplyData] = useState<any[]>([])

  const callGetAgentReply = async () => {
    try {
      const res = await getAgentReply({ filter })
      setAgentReplyData(res?.data?.items)
    } catch (error) {
      console.log("🚀 ~ callGetAgentReply ~ error:", error)
    }
  }

  useEffect(() => {
    callGetAgentReply()
  }, [filter])

  return { agentReplyData }
}

export default useFetchAgentReply
