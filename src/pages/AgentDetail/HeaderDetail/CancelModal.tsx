import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { ModalContent, Modal, Button } from "@nextui-org/react"
import React from "react"
import { useNavigate } from "react-router-dom"

const CancelModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-mercury-100 py-6 max-md:py-4 max-w-[450px]",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
    >
      <ModalContent>
        <div className="px-4">
          <div className="relative flex items-center justify-center">
            <p className="mb-2 text-20 font-semibold">Exit Edit Agent</p>
            <div
              onClick={onClose}
              className="absolute right-0 top-0 cursor-pointer"
            >
              <CloseFilledIcon />
            </div>
          </div>
          <div className="text-center text-mercury-900">
            <p>Do you want to discard changes?</p>
            <p>All unsaved changes will be erased permanently.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 items-center gap-2">
            <Button
              onPress={() => navigate("/")}
              className="h-[50px] w-full rounded-full bg-white font-bold text-red-500"
            >
              Discard Changes
            </Button>
            <Button
              onPress={onClose}
              className="h-[50px] w-full rounded-full bg-mercury-950 font-bold text-white"
            >
              Continue Editing
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default CancelModal
