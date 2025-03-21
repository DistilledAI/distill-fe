import { fileImg } from "@assets/images"
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onPress: () => void
}

const FileTipModal = ({ isOpen, onClose, onPress }: Props) => {
  return (
    <>
      <Modal
        classNames={{
          base: "bg-white rounded-[22px]",
          body: "!p-0",
        }}
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
        disableAnimation
        size="lg"
      >
        <ModalContent>
          <ModalBody>
            <div className="flex w-full flex-col items-center gap-6 rounded-[22px] border border-solid border-white bg-[#e6e6e6] px-0 pb-10 pt-6">
              <div className="flex w-full flex-col items-center justify-center gap-3 self-stretch px-6 py-0">
                <div className="relative inline-flex items-center gap-4">
                  <img className="max-h-[170px]" src={fileImg} />
                </div>

                <p className="self-stretch text-center font-['Barlow',Helvetica] text-base font-normal leading-6">
                  <span className="font-bold tracking-[-0.03px] text-[#f78400]">
                    Visuals and images won&apos;t be collected
                  </span>
                  <span className="tracking-[-0.06px] text-[#363636]">
                    {" "}
                    for the agent&apos;s knowledge at this time. Provide{" "}
                  </span>
                  <span className="font-bold tracking-[-0.03px] text-[#363636]">
                    text-based content
                  </span>
                  <span className="tracking-[-0.06px] text-[#363636]">
                    {" "}
                    (PDF/TXT) like stories, reports, or research papers for
                    learning.
                  </span>
                </p>
              </div>
              <div className="flex w-full flex-col items-start gap-8 self-stretch px-6 py-0">
                <Button
                  className="h-14 w-full rounded-[999px] bg-[#363636] hover:bg-[#262626]"
                  onPress={onPress}
                >
                  <span className="font-['Barlow',Helvetica] text-lg font-semibold leading-[21.6px] tracking-[-0.45px] text-[#f9f9f9]">
                    Got it
                  </span>
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FileTipModal
