import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Modal, ModalContent } from "@nextui-org/react"
import CollectingContent from "./CollectingContent"

const CollectingModal: React.FC<{
  openPopup: boolean
  setOpenPopup: any
  isCollected?: boolean
  callbackChange?: () => void
}> = ({ openPopup, setOpenPopup, isCollected, callbackChange }) => {
  const onOpenChange = () => {
    setOpenPopup(!openPopup)
    if (callbackChange) callbackChange()
  }

  const baseClassName = "bg-white max-md:!m-0 max-md:h-[calc(100vh-100px)]"

  return (
    <Modal
      isOpen={openPopup}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: baseClassName,
      }}
      size="5xl"
    >
      <ModalContent>
        <div className="relative h-[680px] w-full bg-cover bg-center bg-no-repeat">
          <div className="flex-items-center absolute left-0 top-4 z-10 w-full justify-between px-4">
            <span className="text-[24px] font-semibold text-mercury-950">
              Create Private Agent
            </span>
            <div className="z-20 cursor-pointer" onClick={onOpenChange}>
              <CloseFilledIcon color="#545454" />
            </div>
          </div>

          <video
            autoPlay
            playsInline
            loop
            muted
            className="h-full object-cover"
          >
            <source src={distilledAiPrivateAgent} type="video/mp4" />
            <track kind="captions"></track>
          </video>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-[22px] border border-white bg-[rgba(244,244,245,0.50)] p-6 backdrop-blur-md">
            <CollectingContent isCollected={isCollected} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
export default CollectingModal
