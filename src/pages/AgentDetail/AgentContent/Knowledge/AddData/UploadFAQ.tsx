import { UploadIcon } from "@components/Icons"
import { MessageQuestionIcon } from "@components/Icons/Message"
import { Button, useDisclosure } from "@nextui-org/react"
import AddFAQModal from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/UploadFAQ/AddFAQModal"
import React from "react"

const UploadFAQ: React.FC<{
  onMoreCustomRequest: (data: number[]) => any
}> = ({ onMoreCustomRequest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex h-[56px] w-full items-center justify-between rounded-full bg-mercury-100 font-bold text-mercury-950"
      >
        <div className="flex items-center gap-1">
          <MessageQuestionIcon color="#363636" /> <span>FAQ Samples</span>
        </div>
        <UploadIcon />
      </Button>
      <AddFAQModal
        isOpen={isOpen}
        onClose={onClose}
        onMoreCustomRequest={onMoreCustomRequest}
      />
    </>
  )
}

export default UploadFAQ
