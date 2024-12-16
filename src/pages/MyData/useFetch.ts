import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { useQuery } from "@tanstack/react-query"
import { getMyBotData } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import { IBotData } from "types/user"

const useFetchMyData = () => {
  const { isLogin } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const botId = myAgent?.id as number

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`],
    queryFn: () => getMyBotData(botId, { limit: 1, offset: 0 }),
    enabled: !!botId && isLogin,
    refetchOnWindowFocus: false,
  })

  const list: IBotData[] = data?.data?.items || []

  return {
    list,
    isLoading,
    isFetched,
    refetch,
    botId,
    privateAgentData: myAgent,
  }
}

export default useFetchMyData
