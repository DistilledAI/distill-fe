import { useEffect } from "react"
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query"
import useAuthState from "@hooks/useAuthState"
import { getChatHistoryById } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { IUser } from "@reducers/userSlice"
import { IGroup } from "../LeftBar/useFetchGroups"
import { convertDataFetchToMessage, IMessageBox } from "./helpers"
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

export const chatMessagesKey = (chatId: string | undefined) => {
  if (!chatId) return []
  return [QueryDataKeys.CHAT_MESSAGES, chatId.toString()]
}

const useFetchMessages = (groupId: string, groupDetailError?: boolean) => {
  const { user, isLogin } = useAuthState()
  const queryClient = useQueryClient()

  const { data: hasJoinedGroup } = useQuery<boolean>({
    queryKey: [QueryDataKeys.HAS_JOINED_GROUP, groupId],
  })

  const fetchMessages = async ({ pageParam = 0 }) => {
    if (!groupId) return

    const res = await getChatHistoryById({
      id: Number(groupId),
      offset: pageParam,
    })

    return {
      messages: convertDataFetchToMessage(res.data.items, user?.id || 0),
      nextOffset:
        res.data.items.length > 0
          ? pageParam + res.data.items.length
          : undefined,
    }
  }

  const {
    data,
    fetchPreviousPage,
    hasPreviousPage,
    isFetched,
    isLoading,
    isFetchingPreviousPage,
    error,
  } = useInfiniteQuery({
    queryKey: chatMessagesKey(groupId),
    queryFn: fetchMessages,
    enabled: isLogin && !!groupId && hasJoinedGroup,
    getNextPageParam: (lastPage) => lastPage?.nextOffset,
    getPreviousPageParam: (firstPage) => firstPage?.nextOffset,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
  const adjustedIsFetched = groupDetailError ? true : isFetched

  const resetInfiniteQueryPagination = () => {
    queryClient.setQueryData(chatMessagesKey(groupId), (oldData: any) => {
      if (!oldData) return undefined
      const lastPages = oldData.pages.slice(-1)
      const lastPageParams = oldData.pageParams.slice(-1)

      return {
        pages: lastPages,
        pageParams: lastPageParams,
      }
    })

    queryClient.invalidateQueries({ queryKey: chatMessagesKey(groupId) })
    queryClient.invalidateQueries({
      queryKey: [QueryDataKeys.DELEGATE_PRIVATE_AGENT, groupId],
    })
  }

  useEffect(() => {
    const handleEvents = () => resetInfiniteQueryPagination()
    window.addEventListener("focus", handleEvents)
    window.addEventListener("online", handleEvents)

    return () => {
      window.removeEventListener("focus", handleEvents)
      window.removeEventListener("online", handleEvents)
    }
  }, [groupId, queryClient]) // Dependencies added for safety

  // Load Previous Messages Handler
  const onLoadPrevMessages = async () => {
    try {
      const res = await fetchPreviousPage()
      return res.data?.pages[0]?.messages.length
        ? res.data.pages[0].messages.length - 3
        : 0
    } catch (error) {
      console.error("Error loading previous messages:", error)
      return 0
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
    isFetched: adjustedIsFetched,
    isFetchingPreviousPage,
    groupId,
    error,
  }
}

export default useFetchMessages
