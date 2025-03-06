import { LIMIT_MY_DATA } from "@pages/AgentDetail/AgentContent/Knowledge/AddData/useFetchByCategory"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { QueryDataKeys } from "types/queryDataKeys"

const useUpdateStatus = (botId: number) => {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (socket) {
      const event = "updateTrainStatus"
      socket.on(event, (e) => {
        if (e?.event === "notification" && e?.data) {
          queryClient.setQueryData(
            [`${QueryDataKeys.MY_BOT_DATA}-${botId}-${e.data.key}`],
            (oldData: any) => {
              const flatData = oldData?.pages?.flat()?.map((item: any) => {
                if (item.id === e.data.id) {
                  return { ...item, status: e.data.status }
                }
                return item
              })

              const chunkArray = (array: any[], size: number) => {
                const result = []
                for (let i = 0; i < array.length; i += size) {
                  result.push(array.slice(i, i + size))
                }
                return result
              }

              const chunkedPages = chunkArray(flatData, LIMIT_MY_DATA)

              return {
                pageParams: oldData.pageParams,
                pages: chunkedPages,
              }
            },
          )
        }
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, botId])
}

export default useUpdateStatus
