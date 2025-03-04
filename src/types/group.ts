import { TypeGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"

export interface IGroupDetail {
  id: number
  name: string
  image: string | null
  label: string
  userAId: number
  userBId: number
  createBy: number
  status: number
  live: number
  typeGroup: TypeGroup
  eventId: number
  createdAt: string
  description?: string
  groupUser?: Array<any>
  groupMemberStats?: {
    id: number
    groupId: number
    total: number
    createdAt: string
  }
  groupConfig: any[]
}
