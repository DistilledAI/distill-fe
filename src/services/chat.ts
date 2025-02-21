import { IUser } from "@reducers/userSlice"
import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getGroupList = async (offset: number = 0, limit: number = 10) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_MY_CHAT_GROUP_LIST,
    params: {
      offset,
      limit,
    },
  })
}

interface IDataChatSendToUser {
  toUserId: number
  messages: string
}
export const postChatSendToUser = async (data: IDataChatSendToUser) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_SEND_TO_USER,
    data,
  })
}

interface IDataChatToGroup {
  groupId: number
  messages: string
  replyTo?: number
  captcha?: string
}
export const postChatToGroup = async (data: IDataChatToGroup) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_TO_GROUP,
    data,
  })
}

interface IDataCreateGroupChat {
  members: Array<number>
}
export const createGroupChat = async (data: IDataCreateGroupChat) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CREATE_GROUP_CHAT,
    data,
  })
}

export const checkGroupDirect = async (data: IDataCreateGroupChat) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_GROUP_DIRECT,
    data,
  })
}

export const deleteGroup = async (groupId: number) => {
  return fetchApiAuth({
    method: "delete",
    url: endpoint.DELETE_GROUP(groupId),
  })
}

export const leaveGroup = async (groupId: number) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.LEAVE_GROUP,
    data: {
      groupId,
    },
  })
}

export const getChatHistoryById = async ({
  id,
  offset = 0,
  limit = 20,
}: {
  id: number
  offset?: number
  limit?: number
}) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_HISTORY_CHAT(id),
    params: {
      offset,
      limit,
    },
  })
}

export const searchUsers = async (
  payload: any,
  limit: number = 30,
  offset: number = 0,
) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.SEARCH_USER,
    params: {
      filter: payload,
      limit,
      offset,
    },
  })
}

export const checkConversation = async (userToId: number) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.CHECK_CONVERSATION_CHAT(userToId),
  })
}

export const getProfileInfo = async ({
  type,
  userName,
}: {
  type: string
  userName: string
}) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_USER_PROFILE(type, userName),
  })
}

interface CreateBot {
  name?: string
  publicAddress?: string
  linkedin?: string
  email?: string
  webhook?: string
  website_link?: string
  x_link?: string
  telegram_link?: string
}
export const createBot = async (data: CreateBot) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CREATE_BOT,
    data,
  })
}

export const getMyPrivateAgent = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_BOT_LIST,
  })
}

export interface ChangeStatusBotInGroup {
  groupId: string | undefined | number
  botId: number
  status: number
}

export const changeStatusBotInGroup = async (data: ChangeStatusBotInGroup) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHANGE_STATUS_BOT_IN_GROUP,
    data,
  })
}

export const checkStatusBotInGroup = async (groupId: string | undefined) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.CHECK_STATUS_BOT_IN_GROUP(groupId),
  })
}

export interface GroupChatDetail {
  filter: any
}

export const getGroupChatDetail = async (params: any) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_GROUP_CHAT_DETAIL(),
    params,
  })
}

let audioSource: AudioBufferSourceNode | null = null
let audioContext: AudioContext | null = null

export const getVoiceToText = async (
  text: string,
  speaker: IUser["configBot"],
) => {
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis is not supported.")
    return
  }

  try {
    if (audioSource) {
      audioSource.stop()
    }

    if (!audioContext) {
      audioContext = new AudioContext()
    }

    const response = await fetch(
      "https://ai-dev.cupiee.com/voice/text_to_speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          lang: "en",
          speaker,
          pitch: 1,
          ref_voice: "",
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const blob = await response.blob()

    if (blob) {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          audioContext!.decodeAudioData(
            reader.result,
            (buffer) => {
              audioSource = audioContext!.createBufferSource()
              audioSource.buffer = buffer
              audioSource.connect(audioContext!.destination)
              audioSource.start(0)

              audioSource.onended = () => {
                audioSource = null
              }
            },
            (error) => {
              console.error("Error decoding audio data:", error)
            },
          )
        }
      }

      reader.onerror = (error) => {
        console.error("Error reading audio blob:", error)
      }

      reader.readAsArrayBuffer(blob)
    } else {
      console.error("Response is not a Blob.")
    }
  } catch (error) {
    console.error("Error fetching audio data:", error)
  }
}

interface InviteUser {
  groupId: number
  member: (number | undefined)[]
}

export const inviteUserJoinGroup = async (data: InviteUser, headers = {}) => {
  return fetchApiAuth({
    method: "post",
    headers,
    url: endpoint.INVITE_USER_JOIN_GROUP,
    data,
  })
}

interface TrainData {
  botId: number
  id: number
}

export const trainData = async (data: TrainData) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.TRAIN_DATA_MY_DATA,
    data,
  })
}

export const getGroupDetailFromLabel = async (label: string) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_GROUP_DETAIL_FROM_LABEL(label),
  })
}

export const publishMarketplace = async (botId: number) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.PUBLISH_MARKETPLACE(botId),
  })
}
