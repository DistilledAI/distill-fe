import { ShareWithQrIcon } from "@components/Icons/Share"
import { Button, useDisclosure } from "@nextui-org/react"
import ShareModal from "./ShareModal"
import { IUser } from "@reducers/userSlice"

interface ShareAgentProps {
  isDisabled?: boolean
  agentData: IUser
}

const ShareAgent = ({ isDisabled, agentData }: ShareAgentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        className="flex w-full rounded-full bg-mercury-100 max-md:min-h-14"
        onPress={onOpen}
        isDisabled={isDisabled}
      >
        <ShareWithQrIcon />
        <span className="font-medium text-mercury-950">Share as QR</span>
      </Button>
      {isOpen && (
        <ShareModal isOpen={isOpen} onClose={onClose} agentData={agentData} />
      )}
    </>
  )
}

export default ShareAgent
