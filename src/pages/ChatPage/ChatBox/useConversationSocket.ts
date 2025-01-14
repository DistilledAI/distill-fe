import {
  chatConversationKey,
  ICachedMessageData,
} from "@pages/Orchestration/useFetchConversation"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const useConversationSocket = () => {
  const { chatId: groupId } = useParams()
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  const updateNewMsg = (e: any) => {
    const groupId = e.groupId?.toString()
    queryClient.setQueryData(
      chatConversationKey(groupId),
      (cachedData: ICachedMessageData) => {
        if (!cachedData)
          return {
            pageParams: [],
            pages: [
              {
                messages: [],
                nextOffset: 0,
              },
            ],
          }

        const lastPage = cachedData.pages[cachedData.pages.length - 1]

        return {
          ...cachedData,
          pages: [
            ...cachedData.pages.slice(0, -1),
            {
              ...lastPage,
              messages: [...lastPage.messages, e],
            },
          ],
        }
      },
    )
  }

  useEffect(() => {
    if (socket) {
      const event = "chat-conversation"

      socket.on(event, (e: any) => {
        updateNewMsg(e)
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, groupId])
}

export default useConversationSocket
