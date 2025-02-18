import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Modal, ModalContent } from "@nextui-org/react"
import { useState } from "react"

const MicrophoneAccessModal: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const onOpenChange = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-white",
      }}
      size="2xl"
      placement="bottom"
    >
      <ModalContent>
        <div className="mt-4 w-auto">
          <div className="flex-items-center justify-end px-4">
            <div className="z-50 cursor-pointer" onClick={onOpenChange}>
              <CloseFilledIcon />
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
export default MicrophoneAccessModal
