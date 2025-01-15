import { maxAvatar } from "@assets/images"
import { GiftBorderIcon } from "@components/Icons"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button, Modal, ModalContent } from "@nextui-org/react"
import React from "react"

const ClaimReward: React.FC<{
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
}> = ({ isOpen, onClose, onOpenChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-[#E6E6E6]",
      }}
      size="sm"
      placement="center"
    >
      <ModalContent>
        <div className="relative p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-14 font-medium text-mercury-700">21 Assets</p>
            <div onClick={onClose} className="cursor-pointer">
              <CloseFilledIcon />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={maxAvatar}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-14 font-semibold text-mercury-950">
                    1,234,544 MAX
                  </p>
                  <p className="text-14 text-brown-500">$89,242</p>
                </div>
              </div>
              <Button className="h-8 gap-1 rounded-full bg-[#2CB34E] text-14 font-semibold text-white">
                <GiftBorderIcon />
                Claim
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ClaimReward
