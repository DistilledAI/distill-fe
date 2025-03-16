import { useQuery } from "@tanstack/react-query"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import { isHasNotification } from "./LeftBar/helpers"
import { useParams } from "react-router-dom"

interface Props {
  groupId: number
}

const DotNotification = ({ groupId }: Props) => {
  const { chatId } = useParams()
  const { data: groupsHaveNotification = [] } = useQuery<number[]>({
    queryKey: [QueryDataKeys.NOTIFICATION_GROUPS],
  })

  return (
    <div
      className={twMerge(
        "hidden h-2 w-2 rounded-full bg-red-600",
        isHasNotification(groupsHaveNotification, groupId, Number(chatId)) &&
          "block",
      )}
    />
  )
}

export default DotNotification
