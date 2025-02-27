import { Button, useDisclosure } from "@nextui-org/react"
import CancelModal from "./CancelModal"
import React, { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useAppSelector } from "@hooks/useAppRedux"
import { Publish, STATUS_AGENT } from "@constants/index"
import { publishMarketplace } from "services/chat"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { toast } from "react-toastify"
import { CheckedIcon } from "@components/Icons/Checked"
import useWindowSize from "@hooks/useWindowSize"
import { ArrowsLeftIcon } from "@components/Icons/Arrow"

const HeaderDetailAgent: React.FC<{
  isLoading: boolean
}> = ({ isLoading }) => {
  const { isMobile } = useWindowSize()
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const agents = useAppSelector((state) => state.agents.myAgents)
  const agent = agents[0]
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { watch } = useFormContext()
  const [isPublished, setIsPublished] = useState(
    agent?.publish === Publish.Published,
  )
  const personality = watch("personality_traits")
  const agentName = watch("username")
  const agentDesc = watch("description")

  const isAgentActive = agent && agent?.status === STATUS_AGENT.ACTIVE
  const isDisabled =
    personality.length === 0 ||
    personality[0] === "" ||
    !agentName ||
    !agentDesc ||
    !isAgentActive

  useEffect(() => {
    setIsPublished(agent?.publish === Publish.Published)
  }, [agent?.publish])

  const onPublishMarketplace = async (botId: number) => {
    try {
      if (!isAgentActive) return
      setLoading(true)
      const res = await publishMarketplace(botId)
      if (res) {
        setIsPublished(!isPublished)
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
    <div className="fixed left-0 top-0 z-50 w-full border-b-1 border-mercury-100 bg-mercury-70">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between px-6 py-2 max-md:justify-start max-md:px-4">
        {isMobile ? (
          <div
            onClick={onOpen}
            className="-ml-2 flex h-6 w-6 items-center justify-center"
          >
            <ArrowsLeftIcon color="black" />
          </div>
        ) : (
          <Button
            onPress={onOpen}
            className="h-[50px] w-[120px] rounded-full bg-mercury-100 font-semibold text-[#FF3B30]"
          >
            Exit
          </Button>
        )}
        <div className="text-center">
          <p
            onClick={() => {
              if (isMobile) onOpen()
            }}
            className="text-20 font-semibold max-md:text-14"
          >
            Edit Agent
          </p>
          {isPublished && !isMobile && (
            <div className="flex items-center gap-1">
              <CheckedIcon size={16} />
              <p className="text-15 font-medium text-green-500"> Published</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 max-md:flex-1 max-md:justify-end">
          <Button
            onPress={() => onPublishMarketplace(agent.id)}
            isDisabled={!isAgentActive || loading}
            className="h-[50px] w-[120px] rounded-full bg-mercury-100 font-semibold max-md:h-[40px] max-md:w-[90px]"
          >
            <span className="max-md:text-[13px]">
              {!isAgentActive ? "Publish" : "Unpublish"}
            </span>
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            isDisabled={isDisabled}
            className="h-[50px] w-[120px] rounded-full bg-mercury-950 font-semibold text-white max-md:h-[40px] max-md:w-[90px] max-md:text-13"
          >
            Save
          </Button>
        </div>
      </div>
      <CancelModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default HeaderDetailAgent
