import { IGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { AGENT_TYPE_KEY } from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import { useQuery } from "@tanstack/react-query"
import { getFeaturedAgentClans } from "services/group"

interface FeaturedClan extends IGroup {
  owner: {
    typeAgent: AGENT_TYPE_KEY
  }
}

const useFetchFeaturedAgentClan = () => {
  const { data, isLoading } = useQuery<FeaturedClan[]>({
    queryKey: ["featuredAgentClans"],
    queryFn: async () => {
      const res = await getFeaturedAgentClans()
      return res.items
    },
  })

  return {
    data: data || [],
    loading: isLoading,
  }
}

export default useFetchFeaturedAgentClan
