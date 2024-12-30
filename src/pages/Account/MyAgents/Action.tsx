import { SettingIcon } from "@components/Icons"
import { PATH_NAMES, Publish, STATUS_AGENT } from "@constants/index"
import { Button } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { publishMarketplace } from "services/chat"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import { IAgentData } from "types/user"

const MyAgentAction: React.FC<{
  data: IAgentData
  onPublishDone?: (data: IAgentData) => void
}> = ({ data, onPublishDone }) => {
  const [isPublished, setIsPublished] = useState(
    data.publish === Publish.Published,
  )
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const isActive = data.status === STATUS_AGENT.ACTIVE
  const agentId = data.id

  const onRedirectEditAgentPage = () => {
    if (!isActive) return
    navigate(`${PATH_NAMES.AGENT_DETAIL}/${agentId}`)
  }

  useEffect(() => {
    setIsPublished(data.publish === Publish.Published)
  }, [data.publish])

  const onPublishMarketplace = async (botId: number) => {
    try {
      if (!isActive) return
      setLoading(true)
      const res = await publishMarketplace(botId)
      if (res) {
        setIsPublished(!isPublished)
        if (onPublishDone && !isPublished) onPublishDone(data)
        queryClient.refetchQueries({
          queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL],
        })
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        isLoading={loading}
        onPress={() => onPublishMarketplace(data.id)}
        isDisabled={!isActive}
        className="h-9 rounded-full bg-mercury-950 text-white max-sm:h-8 max-sm:min-w-0"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <div
        className={twMerge(
          "inline-flex cursor-pointer items-center gap-1 font-medium text-[#A2845E] hover:opacity-70 max-sm:text-14",
          !isActive && "pointer-events-none cursor-default opacity-65",
        )}
        onClick={onRedirectEditAgentPage}
      >
        <SettingIcon /> Edit
      </div>
    </div>
  )
}

export default MyAgentAction
