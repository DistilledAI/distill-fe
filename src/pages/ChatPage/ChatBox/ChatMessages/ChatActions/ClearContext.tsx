import { Button } from "@nextui-org/react"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { ICachedMessageData, chatMessagesKey } from "../useFetchMessages"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import { clearContextByGroupId } from "services/group"
import { toast } from "react-toastify"
import { CLEAR_CACHED_MESSAGE } from "@constants/index"

const getDefaultCachedData = (): ICachedMessageData => ({
  pageParams: [],
  pages: [
    {
      messages: [],
      nextOffset: 0,
    },
  ],
})

const ClearContext = () => {
  const queryClient = useQueryClient()
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const groupId = privateChatId || chatId

  const mutation = useMutation({
    mutationFn: async () => {
      await clearContextByGroupId(groupId)
    },
    onMutate: async () => {
      queryClient.setQueryData(
        chatMessagesKey(groupId),
        (cachedData: ICachedMessageData | undefined) => {
          const newMessage = {
            content: CLEAR_CACHED_MESSAGE,
            createdAt: new Date().toISOString(),
          }

          if (!cachedData) return getDefaultCachedData()

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
    },
    onError: (error) => {
      console.error("Failed to clear chat context:", error)
      toast.error("Failed to clear context!")
    },
  })

  const handleClearChat = () => {
    const cachedData =
      queryClient.getQueryData<ICachedMessageData>(chatMessagesKey(groupId)) ||
      getDefaultCachedData()

    const lastMessages =
      cachedData.pages[cachedData.pages.length - 1]?.messages || []

    if (
      lastMessages.length &&
      lastMessages[lastMessages.length - 1].content === CLEAR_CACHED_MESSAGE
    ) {
      return
    }

    mutation.mutate()
  }

  return (
    <Button
      type="button"
      className="btn-primary !bg-mercury-70 px-3 max-md:!gap-1 max-md:!border-mercury-100 max-md:!text-[14px]"
      onPress={handleClearChat}
      isDisabled={mutation.isPending}
    >
      <div>
        <RefreshIcon />
      </div>
      Clear Context
    </Button>
  )
}

export default ClearContext
