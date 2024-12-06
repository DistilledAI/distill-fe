import { Modal, ModalContent } from "@nextui-org/react"
import Betting from "@pages/BetingPage"
import React from "react"

const BetModal: React.FC<{
  isOpen: boolean
  onOpenChange?: ((isOpen: boolean) => void) | undefined
}> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{
        base: "bg-[#080A14] py-10 max-md:py-4 justify-center",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
        closeButton: "bg-white right-4 top-4",
      }}
    >
      <ModalContent>
        <div className="max-h-full overflow-y-auto">
          <Betting />
        </div>
      </ModalContent>
    </Modal>
  )
}

export default BetModal