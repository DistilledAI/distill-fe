import { Button, Checkbox, Modal, ModalContent } from "@nextui-org/react"
import React, { useState } from "react"

const BetDisclaimer: React.FC<{
  isOpen: boolean
  onAccept: () => void
  onOpenChange?: ((isOpen: boolean) => void) | undefined
}> = ({ isOpen, onOpenChange, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: "bg-[#13141D] py-4 px-6  justify-center",
        wrapper: "z-[99]",
        backdrop: "z-[99] bg-[rgba(0,0,0,0.6)]",
        closeButton: "!bg-transparent",
      }}
    >
      <ModalContent>
        <p className="text-18 font-medium text-[#E8E9EE]">Disclaimer</p>
        <p className="my-2 text-14 text-[#9192A0]">
          Once you entered a position, you can not cancel or adjust it
        </p>
        <div className="mt-5 flex items-start gap-2">
          <Checkbox
            isSelected={isChecked}
            onValueChange={(val) => setIsChecked(val)}
          />
          <p className="-mt-[5px] text-14 text-[#E8E9EE]">
            I understand that I am using this product at my own risk. Any losses
            incurred due to my actions are my own responsibility.
          </p>
        </div>
        <Button
          onPress={onAccept}
          isDisabled={!isChecked}
          className="mb-5 mt-7 bg-[#E8E9EE]"
        >
          CONTINUE
        </Button>
      </ModalContent>
    </Modal>
  )
}

export default BetDisclaimer
