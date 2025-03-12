import { PATH_NAMES } from "@constants/index"
import { IMessageBox } from "@pages/ChatPageOld/ChatContainer/ChatMessages/helpers"
import { IGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { IUser } from "@reducers/userSlice"
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAgentConversation } from "services/group"
import { QueryDataKeys } from "types/queryDataKeys"
import { EmojiReaction } from "types/reactions"

export interface IMentions {
  id: number
  msgId: number
  user: IUser
  userId: number
  createdAt: string
}

export interface IReactionMsg {
  id: number
  msgId: number | string
  reactionType: string
  userId: number
}

export interface IReactionMsgStats extends EmojiReaction {
  msgId: number | string
  total: number
  isReacted?: boolean
}

export interface IMessage {
  id: number
  groupId: number
  userId: number
  messages: string
  status: number
  createdAt: string
  group: IGroup
  user: IUser
  relyTo?: number
  relyToMessage?: {
    messages: string
    user: IUser
  }
  mentions?: IMentions[]
  reactionMsg?: IReactionMsg[]
  reactionMsgStats?: IReactionMsgStats[]
}

export interface ICachedMessageData {
  pageParams: Array<number>
  pages: Array<{
    messages: IMessageBox[]
    nextOffset: number
  }>
}

export const chatConversationKey = (chatId: string | undefined) => {
  if (!chatId) return []
  return [QueryDataKeys.CHAT_CONVERSATION, chatId.toString()]
}

const useFetchConversation = () => {
  const { chatId: groupId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const fetchMessages = async ({ pageParam = 0 }) => {
    if (!groupId) return

    const res = await getAgentConversation({
      id: Number(groupId),
      offset: pageParam,
    })
    return {
      messages: res.data.items?.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
      nextOffset:
        res.data.items.length > 0
          ? pageParam + res.data.items.length
          : undefined,
    }
  }

  const {
    data,
    error,
    fetchPreviousPage,
    hasPreviousPage,
    isFetched,
    isLoading,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: chatConversationKey(groupId),
    queryFn: fetchMessages,
    enabled: !!groupId,
    getNextPageParam: (lastPage) => lastPage?.nextOffset,
    getPreviousPageParam: (firstPage) => firstPage?.nextOffset,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialPageParam: 0,
    staleTime: 0,
  })

  const resetInfiniteQueryPagination = () => {
    queryClient.setQueryData(chatConversationKey(groupId), (oldData: any) => {
      if (!oldData) return undefined
      const lastPages = oldData.pages.slice(-1)
      const lastPageParams = oldData.pageParams.slice(-1)

      return {
        pages: lastPages,
        pageParams: lastPageParams,
      }
    })
    queryClient.invalidateQueries({
      queryKey: chatConversationKey(groupId),
    })
    queryClient.invalidateQueries({
      queryKey: [QueryDataKeys.DELEGATE_PRIVATE_AGENT, groupId],
    })
  }

  useEffect(() => {
    window.addEventListener("focus", resetInfiniteQueryPagination)
    window.addEventListener("online", resetInfiniteQueryPagination)

    return () => {
      window.removeEventListener("focus", resetInfiniteQueryPagination)
      window.removeEventListener("online", resetInfiniteQueryPagination)
    }
  }, [groupId])

  useEffect(() => {
    if (error) {
      console.error(error)
      navigate(PATH_NAMES.HOME)
    }
  }, [error])

  const onLoadPrevMessages = async () => {
    try {
      const res = await fetchPreviousPage()
      if (res.data?.pages[0]?.messages.length) {
        return res.data?.pages[0].messages.length + 1
      }
      return 0
    } catch (error) {
      console.error(error)
    }
  }

  const messages =
    (
      data as InfiniteData<{ messages: IMessageBox[] }> | undefined
    )?.pages.flatMap((page) => page.messages) || []

  return {
    onLoadPrevMessages,
    messages,
    hasPreviousMore: hasPreviousPage,
    isLoading,
    isFetched,
    isFetchingPreviousPage,
    groupId,
  }
}

export default useFetchConversation
