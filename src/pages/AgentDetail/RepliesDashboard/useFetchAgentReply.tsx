import { useEffect, useState } from "react"
import { getAgentReply } from "services/agent"

const useFetchAgentReply = ({
  filter,
  offset,
}: {
  filter: any
  offset: number
}) => {
  const [agentReplyData, setAgentReplyData] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)
  const size = 10

  const callGetAgentReply = async () => {
    try {
      const res = await getAgentReply({ filter, size, offset })
      const items = res?.data?.items
      setAgentReplyData(items)
      setTotalItems(res?.data?.total)
    } catch (error) {
      console.log("error:", error)
    }
  }

  useEffect(() => {
    callGetAgentReply()
  }, [filter, offset])

  return {
    agentReplyData,
    totalPages: Math.ceil(totalItems / size) || 1,
  }
}

export default useFetchAgentReply
