import { RoleUser } from "@constants/index"
import {
  IMessageBox,
  RoleChat,
} from "@pages/ChatPage/ChatContainer/ChatMessages/helpers"
import {
  chatMessagesKey,
  ICachedMessageData,
} from "@pages/ChatPage/ChatContainer/ChatMessages/useFetchMessages"
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

  const updateChatMessagesCache = (
    cachedData: ICachedMessageData,
    newMessage: IMessageBox,
    updatedMessageId?: string,
  ) => {
    if (!cachedData) {
      return {
        pageParams: [],
        pages: [
          {
            messages: [newMessage],
            nextOffset: 0,
          },
        ],
      }
    }

    const lastPage = cachedData.pages[cachedData.pages.length - 1]

    return {
      ...cachedData,
      pages: [
        ...cachedData.pages.slice(0, -1),
        {
          ...lastPage,
          messages: !updatedMessageId
            ? [...lastPage.messages, newMessage]
            : lastPage.messages.map((message) =>
                message.id === newMessage.id && updatedMessageId
                  ? { ...message, id: updatedMessageId }
                  : message,
              ),
        },
      ],
    }
  }

  const mutation = useMutation({
    mutationKey: [QueryDataKeys.SEND_MESSAGE],

    mutationFn: ({
      message,
      captchaValue,
    }: {
      message: string
      captchaValue?: string
    }) => {
      if (!isClan) {
        return postChatToGroup({
          groupId: Number(groupId),
          messages: reply?.username
            ? message.replace(reply.username, "")
            : message,
          replyTo: reply?.messageId,
          captcha: captchaValue,
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
          captcha: captchaValue,
        })
      }

      return Promise.reject("No action taken")
    },
    onMutate: (variables) => {
      const messageValue = variables?.message
      const newMessage: IMessageBox = {
        content: reply?.username
          ? messageValue.replace(reply.username, "")
          : messageValue,
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
        (cachedData: ICachedMessageData) =>
          updateChatMessagesCache(cachedData, newMessage),
      )

      return { newMessage }
    },
    onSuccess: (data, _, context) => {
      console.log("🚀 ~ data:", data)
      console.log("🚀 ~ context:", context)
      queryClient.setQueryData(
        chatMessagesKey(groupId),
        (cachedData: ICachedMessageData) =>
          updateChatMessagesCache(
            cachedData,
            context.newMessage,
            data?.data?.id,
          ),
      )
      if (callbackDone) callbackDone()
    },
    onError: (error) => {
      console.error("Failed to send message", error)
    },
  })

  return { mutation }
}

export default useSubmitChat
