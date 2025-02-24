import { Button, useDisclosure } from "@nextui-org/react"
import CancelModal from "./CancelModal"
import React from "react"
import { useFormContext } from "react-hook-form"

const AgentHeader: React.FC<{
  isLoading: boolean
}> = ({ isLoading }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { watch } = useFormContext()
  const personality = watch("personality_traits")
  const agentName = watch("username")
  const agentDesc = watch("description")

  const isDisabled = personality.length === 0 || !agentName || !agentDesc

  return (
    <div className="fixed left-0 top-0 z-50 w-full border-b-1 border-mercury-100 bg-mercury-70">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between px-6 py-2">
        <Button
          onPress={onOpen}
          className="h-[50px] w-[140px] rounded-full bg-mercury-100 font-semibold text-[#FF3B30]"
        >
          Cancel
        </Button>
        <div className="text-center">
          <p className="text-20 font-semibold">Create Agent</p>
          <p className="text-15 font-medium text-brown-600">
            Setup Information
          </p>
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          isDisabled={isDisabled}
          className="h-[50px] w-[140px] rounded-full bg-mercury-950 font-semibold text-white"
        >
          Save & Create
        </Button>
      </div>
      <CancelModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default AgentHeader
