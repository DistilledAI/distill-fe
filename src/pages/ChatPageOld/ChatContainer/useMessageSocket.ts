import { PATH_NAMES, TYPE_BOT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { makeId } from "@utils/index"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getVoiceToText } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { IMessageBox, RoleChat } from "./ChatMessages/helpers"
import {
  ICachedMessageData,
  chatMessagesKey,
} from "./ChatMessages/useFetchMessages"
import useGroupDetailByLabel from "../hooks/useGroupDetailByLabel"
import useMyAgentClan from "@pages/AgentClans/MyAgentClan/useMyAgentClan"

interface IDataListen {
  event: string
  group: number
  messages: string
  msgId: number
  index: number
  user: IUser
  action: string
  msg?: {
    id: number
  }
  replyToData?: {
    messages: string
    user: IUser
    id: number
  }
}

enum StatusMessage {
  TYPING = "typing",
  UPDATE = "update",
  DONE = "message_done",
  GROUP = "chat-group",
}

export const removeLeadingDots = (text: string) => {
  if (text) {
    return text.replace(/^\.{3}/, "")
  }
  return text
}

const useMessageSocket = () => {
  const { pathname } = useLocation()
  const { socket } = useSocket()
  const { user } = useAuthState()
  const queryClient = useQueryClient()
  const { group: clan } = useMyAgentClan()

  const { chatId = "", privateChatId } = useParams()
  const { groupId: groupIdByLabel } = useGroupDetailByLabel(
    clan?.status === 1 ? chatId : "",
  )
  const groupId = groupIdByLabel || privateChatId

  const setQueryIsChatting = (chattingId: string, status: boolean = false) => {
    return queryClient.setQueryData(
      [QueryDataKeys.IS_CHATTING, chattingId],
      () => status,
    )
  }

  const isPassRuleMessage = (e: IDataListen) => {
    if (e?.user?.id === user?.id) return false
    return true
  }

  const isPassRuleNotification = (e: IDataListen) => {
    if (e?.user?.id === user?.id) return false
    if (Number(groupId) === e.group) return false
    return true
  }

  const addNewMsg = (newMsg: IMessageBox, e: IDataListen) => {
    const groupIdStr = e.group.toString()
    queryClient.setQueryData(
      chatMessagesKey(groupIdStr),
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
              messages: [...lastPage.messages, newMsg],
            },
          ],
        }
      },
    )
  }

  const updateNewMsg = (e: IDataListen, isPlusMsg: boolean = true) => {
    const groupIdStr = e.group.toString()
    queryClient.setQueryData(
      chatMessagesKey(groupIdStr),
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
        const isBotLive = e.user.configBot === "live"

        if (isBotLive) {
          const newMsg: IMessageBox = {
            id: e.msgId,
            role: RoleChat.CUSTOMER,
            roleOwner: e.user?.role,
            content: e.messages,
            isTyping: false,
            avatar: e.user?.avatar,
            username: e.user?.username,
            createdAt: new Date().toISOString(),
          }
          return {
            ...cachedData,
            pages: [
              ...cachedData.pages.slice(0, -1),
              {
                ...lastPage,
                messages: [...lastPage.messages, newMsg],
              },
            ],
          }
        }

        return {
          ...cachedData,
          pages: [
            ...cachedData.pages.slice(0, -1),
            {
              ...lastPage,
              messages: lastPage.messages.map((item) => {
                if (item.id === e.msgId) {
                  const oldMessages = removeLeadingDots(item.content)
                  const newMessages = isPlusMsg
                    ? oldMessages + e.messages
                    : e.messages

                  if (newMessages === oldMessages && !item.isTyping) {
                    return item
                  }

                  return {
                    ...item,
                    content: newMessages,
                    isTyping: false,
                    reply: e.replyToData
                      ? {
                          message: e.replyToData.messages,
                          messageId: e.replyToData.id,
                          username: e.replyToData.user.username
                            ? `@${e.replyToData.user.username}`
                            : "@Unnamed",
                        }
                      : undefined,
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

  const handleWithTyping = (e: IDataListen) => {
    const newMsg: IMessageBox = {
      id: e.msgId,
      role: RoleChat.CUSTOMER,
      content: "...",
      avatar: e.user?.avatar,
      isTyping: true,
      roleOwner: e.user?.role,
      createdAt: new Date().toISOString(),
      publicAddress: e.user?.publicAddress,
      username: e.user?.username,
    }
    addNewMsg(newMsg, e)
  }

  const handleWithUpdate = (e: IDataListen) => {
    const isBotVoice = e.user.typeBot === TYPE_BOT.VOICE
    const isBotLive = e.user.configBot === "live"
    const isStop = isBotLive || isBotVoice
    if (isStop) return
    updateNewMsg(e)
  }

  const handleWithGroup = (e: IDataListen) => {
    if (e.messages === "...") return
    const newMsg: IMessageBox = {
      id: e.msg?.id ?? makeId(),
      role: RoleChat.CUSTOMER,
      content: e.messages,
      avatar: e.user.avatar,
      roleOwner: e.user.role,
      createdAt: new Date().toISOString(),
      username: e.user.username,
      publicAddress: e.user.publicAddress,
      reply: e.replyToData
        ? {
            message: e.replyToData.messages,
            messageId: e.replyToData.id,
            username: e.replyToData.user.username
              ? `@${e.replyToData.user.username}`
              : "@Unnamed",
          }
        : undefined,
    }
    addNewMsg(newMsg, e)
  }

  const handleWithDone = (e: IDataListen) => {
    const isBotVoice = e.user.typeBot === TYPE_BOT.VOICE
    if (isBotVoice) getVoiceToText(e.messages, e.user.configBot)
    updateNewMsg(e, false)
  }

  const handleResponseForMessage = (e: IDataListen) => {
    if (!isPassRuleMessage(e)) return
    if (e.event === StatusMessage.TYPING) handleWithTyping(e)
    if (e.event === StatusMessage.UPDATE) handleWithUpdate(e)
    if (e.event === StatusMessage.GROUP) handleWithGroup(e)
    if (e.event === StatusMessage.DONE) handleWithDone(e)
  }

  const handleResponseForNotification = (e: IDataListen) => {
    if (!isPassRuleNotification(e)) return
    queryClient.setQueryData<number[]>(
      [QueryDataKeys.NOTIFICATION_GROUPS],
      (prev = []) => (prev.includes(e.group) ? prev : [...prev, e.group]),
    )
  }

  useEffect(() => {
    if (socket) {
      const event = "chat-group"

      socket.on(event, (e: IDataListen) => {
        if (e.event === StatusMessage.DONE || e.action === "group-not-bot") {
          if (
            e?.user?.owner === user?.id &&
            e.group.toString() === groupId &&
            !pathname.includes(PATH_NAMES.PRIVATE_AGENT)
          ) {
            return setQueryIsChatting(e.group.toString(), true)
          }
          setQueryIsChatting(e.group.toString(), false)
        }

        handleResponseForMessage(e)
        handleResponseForNotification(e)
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, user?.id, groupId, user?.owner, pathname])
}

export default useMessageSocket
