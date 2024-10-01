import { fyiPrivateDataBg, fyiPrivateDataImage } from "@assets/images"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Modal, ModalContent } from "@nextui-org/react"
import { useEffect, useState } from "react"

const FYIModal: React.FC<{ openPopup: boolean; setOpenPopup: any }> = ({
  openPopup,
  setOpenPopup,
}) => {
  const [counter, setCounter] = useState<number>(10)
  const onOpenChange = () => {
    setOpenPopup(!openPopup)
    setCounter(10)
  }

  const handleAnimation = () => {
    if (openPopup && counter < 100) {
      setTimeout(() => setCounter(counter + 10), 20)
    }
  }

  useEffect(() => {
    handleAnimation()
  }, [counter, openPopup])

  return (
    <Modal
      isOpen={openPopup}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-white",
      }}
      size="2xl"
    >
      <ModalContent>
        <div className="relative mt-4 h-[600px] w-auto">
          <img
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            src={fyiPrivateDataBg}
            width={`${counter}%`}
          />

          <div className="flex-items-center justify-between px-4">
            <div className="m-auto">
              <span className="text-base font-medium text-mercury-950">
                How do we protect your private data?
              </span>
            </div>
            <div className="z-50 cursor-pointer" onClick={onOpenChange}>
              <CloseFilledIcon />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 z-40 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out">
            <img src={fyiPrivateDataImage} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
export default FYIModal
