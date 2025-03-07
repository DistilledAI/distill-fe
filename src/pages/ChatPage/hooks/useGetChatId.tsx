import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getGroupDetailFromLabel } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const SPECIAL_CHAT_ID = "@maxisbuyin"
const SPECIAL_CHAT_ID_REPLACEMENT = "@maxisbuyin_"

const useGetChatId = () => {
  const { chatId: chatIdParam } = useParams()

  const fetchChatId = async (): Promise<string | undefined> => {
    if (!chatIdParam || !chatIdParam.includes("@")) return chatIdParam

    try {
      let normalizedChatId = chatIdParam.split(" ").join("")
      if (normalizedChatId === SPECIAL_CHAT_ID) {
        normalizedChatId = SPECIAL_CHAT_ID_REPLACEMENT
      }

      const response = await getGroupDetailFromLabel(normalizedChatId)
      return response?.data?.id?.toString()
    } catch (error) {
      console.error("Failed to fetch chat ID:", error)
      return undefined
    }
  }

  const { data: chatId = "" } = useQuery({
    queryKey: [`${QueryDataKeys.CHAT_ID_BY_USERNAME}-${chatIdParam}`],
    queryFn: fetchChatId,
    initialData: "",
    enabled: !!chatIdParam && !chatIdParam.includes(" "),
  })

  return {
    chatId,
    originalChatId: chatIdParam,
  }
}

export default useGetChatId
