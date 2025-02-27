import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { FaqSample } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/UploadFAQ/AddFAQModal"

interface Props {
  faqSelected: FaqSample
  isOpen: boolean
  onClose: () => void
}

const PreviewFaqModal = ({ faqSelected, isOpen, onClose }: Props) => {
  return (
    <Modal
      classNames={{
        base: "bg-mercury-100 rounded-[22px] shadow-10 backdrop-blur-[10px] border border-white",
        body: "p-4 gap-6 pb-6",
      }}
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
    >
      <ModalContent>
        <ModalBody>
          <h3 className="text-24 font-semibold text-mercury-950">FAQ</h3>
          <div className="space-y-3 rounded-[22px] border border-mercury-100 bg-mercury-70 p-4">
            <p className="text-16 font-medium text-mercury-950">
              Question: {faqSelected.question}
            </p>
            <p className="text-16 font-medium text-mercury-950">
              Answer: {faqSelected.answer}
            </p>
          </div>
          <Button
            onPress={onClose}
            className="mt-1 h-14 rounded-full bg-mercury-950 text-[18px] font-semibold !text-white"
          >
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PreviewFaqModal
