import { CheckFilledIcon, CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button, Modal, ModalContent } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { BehaviorItem, SelectedBehaviors } from "."
import { twMerge } from "tailwind-merge"
import { COMMUNICATION_STYLE_LIST } from "@constants/index"

const CommunicationStylePreset: React.FC<{
  isOpen: boolean
  onClose: () => void
  selectedBehaviors: SelectedBehaviors
  handleSelect: (type: keyof SelectedBehaviors, item: string) => void
}> = ({ isOpen, onClose, selectedBehaviors, handleSelect }) => {
  const [valueSelected, setValueSelected] = useState("")

  useEffect(() => {
    setValueSelected(selectedBehaviors.communication_style[0])
  }, [selectedBehaviors.communication_style])

  const onCancel = () => {
    setValueSelected("")
    onClose()
  }

  const renderBehaviorItem = (item: BehaviorItem) => {
    const isSelected = valueSelected === item.value

    return (
      <div
        key={item.value}
        onClick={() => setValueSelected(item.value)}
        className={twMerge(
          "flex cursor-pointer items-center gap-3 rounded-[14px] border-[2px] border-white bg-mercury-30 p-3 text-mercury-900 transition-all duration-300 ease-in-out",
          isSelected && "border-brown-500 bg-brown-50",
        )}
      >
        <span>{item.emoji}</span>
        <div className="flex w-full items-center justify-between">
          <div>
            <p
              className={twMerge(
                "relative font-medium leading-5 transition-all duration-300 ease-in-out",
                isSelected && "left-0 font-semibold",
              )}
            >
              {item.label}
            </p>
            <p className="relative text-14 text-mercury-800 transition-all duration-300 ease-in-out">
              {item.desc}
            </p>
          </div>
          <div
            className={twMerge(
              "opacity-0 transition-all duration-100 ease-in-out",
              isSelected && "opacity-100",
            )}
          >
            <CheckFilledIcon color="#A2845E" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      hideCloseButton
      classNames={{
        base: "bg-mercury-100 py-6 max-md:py-4",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="2xl"
    >
      <ModalContent>
        <div className="px-4">
          <div className="relative flex items-center justify-center">
            <p className="mb-2 text-20 font-semibold">
              Communication Style Presets
            </p>
            <div
              onClick={onCancel}
              className="absolute right-0 top-0 cursor-pointer"
            >
              <CloseFilledIcon />
            </div>
          </div>
          <div className="mt-2 flex max-h-[500px] flex-col gap-1 overflow-y-auto">
            {COMMUNICATION_STYLE_LIST.map((item: BehaviorItem) =>
              renderBehaviorItem(item),
            )}
          </div>
          <div className="mt-5 flex items-center justify-end gap-2">
            <Button
              onPress={onCancel}
              className="h-[48px] w-[120px] rounded-full border-none bg-transparent font-bold text-red-500"
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                if (valueSelected) {
                  handleSelect("communication_style", valueSelected)
                  onCancel()
                } else {
                  onCancel()
                }
              }}
              className="h-[48px] w-[120px] rounded-full bg-mercury-950 font-bold text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default CommunicationStylePreset
