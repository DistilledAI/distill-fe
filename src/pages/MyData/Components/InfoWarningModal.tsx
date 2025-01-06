import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import React from "react"

const InfoWarningModal: React.FC<{
  children: React.ReactNode
  title: string
  description: string
  isShow?: boolean
}> = ({ children, title, description, isShow = true }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return !isShow ? (
    children
  ) : (
    <>
      <div className="cursor-pointer" onClick={onOpen}>
        {children}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        hideCloseButton
        size="md"
        classNames={{ wrapper: "overflow-hidden", base: "bg-mercury-100" }}
      >
        <ModalContent className="rounded-3xl">
          <div className="p-5">
            <h5 className="mb-4 text-center text-22 font-semibold">{title}</h5>
            <p className="text-center">{description}</p>
            <Button
              className="mt-6 h-12 w-full rounded-full bg-mercury-950"
              onPress={onClose}
            >
              <span className="text-18 font-semibold text-white">Got it</span>
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InfoWarningModal
