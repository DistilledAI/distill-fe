import { PlusIcon } from "@components/Icons/Plus"
import { Button, useDisclosure } from "@nextui-org/react"
import AddFAQModal from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/UploadFAQ/AddFAQModal"
import React from "react"

const UploadFAQ: React.FC<{
  onMoreCustomRequest: (data: number[], callback: () => void) => any
}> = ({ onMoreCustomRequest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        className="inline-flex h-[32px] cursor-pointer items-center gap-1 rounded-full bg-mercury-950 px-3 text-15 font-semibold text-white"
      >
        <PlusIcon color="white" /> Add FAQ Samples file
      </Button>
      <AddFAQModal
        isOpen={isOpen}
        onClose={onClose}
        onMoreCustomRequest={(data: any) => onMoreCustomRequest(data, onClose)}
      />
    </>
  )
}

export default UploadFAQ
