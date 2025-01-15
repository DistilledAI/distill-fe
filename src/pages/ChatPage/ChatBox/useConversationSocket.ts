import {
  chatConversationKey,
  ICachedMessageData,
} from "@pages/Orchestration/useFetchConversation"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

enum StatusMessageSocket {
  TYPING = "TYPING",
  UPDATE = "UPDATE",
  DONE = "DONE",
}

const useConversationSocket = () => {
  const { chatId: groupId } = useParams()
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  const addNewMsg = (e: any) => {
    const groupId = e.groupId.toString()
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
              messages: lastPage.messages.map((item: any) => {
                if (item.idLlm === e.idLlm) {
                  return {
                    ...item,
                    messages: e.messages,
                  }
                }
                return item
              }),
            },
          ],
        }
      },
    )
  }

  const handleResponseForMessage = (e: any) => {
    if (e.event === StatusMessageSocket.TYPING) addNewMsg(e)
    if (e.event === StatusMessageSocket.DONE) updateNewMsg(e)
  }

  useEffect(() => {
    if (socket) {
      const event = "chat-conversation"

      socket.on(event, (e: any) => {
        handleResponseForMessage(e)
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, groupId])
}

export default useConversationSocket
