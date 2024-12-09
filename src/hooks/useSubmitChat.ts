import { RoleUser } from "@constants/index"
import {
  IMessageBox,
  RoleChat,
} from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import {
  chatMessagesKey,
  ICachedMessageData,
} from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeId } from "@utils/index"
import { useRef } from "react"
import { postChatToGroup } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "./useAuthState"

const useSubmitChat = ({
  groupId,
  callbackDone,
  reply,
  isClan,
}: {
  groupId: string | undefined
  callbackDone?: () => void
  reply?: {
    messageId: number
    message: string
    username: string
  }
  isClan?: boolean
}) => {
  const { user } = useAuthState()
  const queryClient = useQueryClient()

  const ref = useRef<any>()

  const mutation = useMutation({
    mutationKey: [QueryDataKeys.SEND_MESSAGE],
    //@ts-ignore
    mutationFn: (message: string) => {
      if (!isClan) {
        console.log("123", reply?.username)
        return postChatToGroup({
          groupId: Number(groupId),
          messages: reply?.username
            ? message.replace(reply.username, "")
            : message,
          replyTo: reply?.messageId,
        })
      }

      if (!ref.current || (ref.current && new Date().getTime() > ref.current)) {
        ref.current = new Date().setSeconds(new Date().getSeconds() + 6)
        return postChatToGroup({
          groupId: Number(groupId),
          messages: reply?.username
            ? message.replace(reply.username, "")
            : message,
          replyTo: reply?.messageId,
        })
      }
    },
    onMutate: (variables) => {
      const newMessage: IMessageBox = {
        content: reply?.username
          ? variables.replace(reply.username, "")
          : variables,
        role: RoleChat.OWNER,
        id: makeId(),
        roleOwner: RoleUser.USER,
        createdAt: new Date().toISOString(),
        isChatCleared: false,
        publicAddress: user?.publicAddress,
        avatar: user?.avatar,
        userId: user?.id,
        username: user?.username ?? "Anonymous",
        reply,
      }

      queryClient.setQueryData(
        chatMessagesKey(groupId),
        (cachedData: ICachedMessageData) => {
          if (!cachedData)
            return {
              pageParams: [],
              pages: [
                {
                  messages: [newMessage],
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
                messages: [...lastPage.messages, newMessage],
              },
            ],
          }
        },
      )

      return { newMessage }
    },
    onSuccess: () => {
      if (callbackDone) callbackDone()
    },
    onError: (error) => {
      console.error("Failed to send message", error)
    },
  })

  return { mutation }
}

export default useSubmitChat
