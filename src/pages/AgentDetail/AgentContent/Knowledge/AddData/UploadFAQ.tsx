import { UploadIcon } from "@components/Icons"
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
        className="flex h-16 w-full items-center justify-between rounded-2xl bg-mercury-950 px-6"
      >
        <div className="flex flex-col items-start">
          <span className="text-base-b text-mercury-30">FAQ samples</span>
          <span className="text-[13px] font-medium text-mercury-500">CSV</span>
        </div>
        <UploadIcon color="#FFFF" />
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
