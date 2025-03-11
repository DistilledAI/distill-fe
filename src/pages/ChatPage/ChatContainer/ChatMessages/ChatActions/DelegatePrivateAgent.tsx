import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ChangeStatusBotInGroup,
  changeStatusBotInGroup,
  checkStatusBotInGroup,
} from "services/chat"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

export enum BOT_STATUS {
  ENABLE = 1,
  DISABLE = 0,
}

interface BotInfo {
  status?: BOT_STATUS
  myBot?: {
    id: string
  }
}

interface Props {
  isDelegateBtn: boolean
}

const isBotEnabled = (status?: BOT_STATUS): boolean =>
  status === BOT_STATUS.ENABLE

const DelegatePrivateAgent: React.FC<Props> = ({ isDelegateBtn }) => {
  const { chatId: groupId } = useParams<{ chatId: string }>()
  const queryClient = useQueryClient()
  const { isAnonymous, isLogin } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const isQueryEnabled = !!groupId && !!myAgent && !isAnonymous && isLogin

  const fetchBotStatus = useCallback(async () => {
    if (!isQueryEnabled) return {}
    const response = await checkStatusBotInGroup(groupId)
    return response?.data ?? {}
  }, [groupId, isQueryEnabled])

  const { data: botInfo, refetch } = useQuery<BotInfo>({
    queryKey: [QueryDataKeys.DELEGATE_PRIVATE_AGENT, groupId],
    queryFn: fetchBotStatus,
    enabled: isQueryEnabled,
  })

  const botStatus = botInfo?.status
  const myBotData = botInfo?.myBot
  const botId = myBotData?.id
  const enabled = isBotEnabled(botStatus)

  useEffect(() => {
    queryClient.setQueryData(
      [QueryDataKeys.IS_CHATTING, groupId],
      enabled && isDelegateBtn ? true : false,
    )
  }, [queryClient, groupId, enabled, isDelegateBtn])

  const handleSetDelegate = useCallback(async () => {
    if (!groupId || !botId) return

    const newStatus = enabled ? BOT_STATUS.DISABLE : BOT_STATUS.ENABLE
    try {
      const payload: ChangeStatusBotInGroup = {
        groupId,
        botId: Number(botId),
        status: newStatus,
      }
      const response = await changeStatusBotInGroup(payload)
      if (response) refetch()
    } catch (error) {
      console.error("Failed to change bot status:", error)
    }
  }, [groupId, botId, enabled, refetch])

  if (!myBotData || !isDelegateBtn) return null

  return (
    <button
      className="group/item flex w-fit cursor-pointer items-center gap-2"
      onClick={handleSetDelegate}
    >
      <div
        className={twMerge(
          "flex items-center gap-1 transition-transform",
          enabled && "flex-row-reverse",
        )}
      >
        <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#0FE9A4]">
          <FilledUserIcon size={14} />
        </div>
        <div className="rotate-180">
          <ArrowLeftFilledIcon size={16} color="#676767" />
        </div>
        <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FC0]">
          <FilledBrainAIIcon size={14} />
        </div>
      </div>
      <span className="text-13 text-mercury-500 underline group-hover/item:text-mercury-950">
        {enabled
          ? "Take over this chat by yourself"
          : "Delegate to your Private Agent"}
      </span>
    </button>
  )
}

export default DelegatePrivateAgent
