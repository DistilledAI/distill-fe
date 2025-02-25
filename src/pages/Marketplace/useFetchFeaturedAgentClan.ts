import { useEffect, useState } from "react"
import { getFeaturedAgentClans } from "services/group"

const useFetchFeaturedAgentClan = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const callGetFeaturedAgentClans = async () => {
    try {
      setLoading(true)
      const res = await getFeaturedAgentClans()
      if (res) setData(res.items)
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    callGetFeaturedAgentClans()
  }, [])

  return { data, loading }
}

export default useFetchFeaturedAgentClan
