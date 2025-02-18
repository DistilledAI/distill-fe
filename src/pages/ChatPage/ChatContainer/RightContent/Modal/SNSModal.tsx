import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react"

const SNSModal: React.FC<{ openPopup: boolean; setOpenPopup: any }> = ({
  openPopup,
  setOpenPopup,
}) => {
  const onOpenChange = () => {
    setOpenPopup(!openPopup)
  }

  return (
    <Modal
      isOpen={openPopup}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-white",
      }}
      size="lg"
    >
      <ModalContent>
        <ModalBody>
          <div className="flex-items-center justify-between">
            <span className="text-24 font-semibold text-mercury-950">
              Website links (including Social Media)
            </span>
            <div className="cursor-pointer" onClick={onOpenChange}>
              <CloseFilledIcon />
            </div>
          </div>
          <div>
            <Input
              placeholder="Enter your profile link"
              labelPlacement="outside"
              startContent={
                <div className="flex-items-center rounded-full bg-mercury-30 px-2 py-[6px]">
                  <span className="text-16 text-mercury-950">LinkedIn</span>
                  <ChevronDownIcon />
                </div>
              }
              classNames={{
                inputWrapper: "!bg-mercury-200 rounded-full",
                innerWrapper: "!bg-mercury-200 rounded-full",
                input: "text-18 !text-mercury-950 caret-[#363636] ",
              }}
              size="lg"
            />
            <Button className="mt-4 w-full rounded-full" size="lg">
              <span className="text-18 text-mercury-30">Connect</span>
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default SNSModal
