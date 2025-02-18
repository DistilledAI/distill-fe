import { createPrivateAgentPopup } from "@assets/images"
import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import useWindowSize from "@hooks/useWindowSize"
import { Modal, ModalContent } from "@nextui-org/react"
import { useState } from "react"
import ProfileLinkForm from "./ProfileLinkForm"
import TranferDataContent from "./TranferDataContent"

const CreatPrivateAgentModal: React.FC<{
  openPopup: boolean
  setOpenPopup: any
  handlemSetSocialUrls: any
  moreCustomRequest: any
}> = ({ openPopup, setOpenPopup, handlemSetSocialUrls, moreCustomRequest }) => {
  const [contentStep, setContentStep] = useState<number>(1)
  const [collectedData, setCollectedData] = useState<any>(null)
  const isWordcloundStep = contentStep === 2
  const { isMobile } = useWindowSize()

  const onOpenChange = () => {
    setContentStep(1)
    setOpenPopup(!openPopup)
  }

  const renderModalContent = () => {
    switch (contentStep) {
      case 2:
        return (
          <TranferDataContent
            setContentStep={setContentStep}
            collectedData={collectedData}
            setOpenPopup={setOpenPopup}
            handlemSetSocialUrls={handlemSetSocialUrls}
            moreCustomRequest={moreCustomRequest}
          />
        )

      default:
        return (
          <ProfileLinkForm
            setContentStep={setContentStep}
            setCollectedData={setCollectedData}
          />
        )
    }
  }

  const renderModalContentWraper = () => {
    if (isMobile) {
      return (
        <div className="h-full w-full bg-cover bg-center bg-no-repeat">
          <div className="flex-items-center relative left-0 top-4 z-10 w-full justify-center px-4">
            <span className="text-18 font-semibold text-mercury-950">
              Create Private Agent
            </span>
            <div
              className="absolute right-4 z-20 cursor-pointer"
              onClick={onOpenChange}
            >
              <CloseFilledIcon color="#545454" />
            </div>
          </div>

          <div
            className="absolute bottom-10 left-1/2 w-full -translate-x-1/2 rounded-[22px] p-6 backdrop-blur-md aria-selected:pb-0"
            aria-selected={isWordcloundStep}
          >
            {renderModalContent()}
          </div>
        </div>
      )
    }

    return (
      <div
        className="relative h-[680px] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: isWordcloundStep
            ? `url(${createPrivateAgentPopup})`
            : "",
        }}
      >
        <div className="flex-items-center absolute left-0 top-4 z-10 w-full justify-between px-4">
          <span className="text-[24px] font-semibold text-mercury-950">
            Create Private Agent
          </span>
          <div className="z-20 cursor-pointer" onClick={onOpenChange}>
            <CloseFilledIcon color="#545454" />
          </div>
        </div>
        {!isWordcloundStep && (
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
        )}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-[22px] border border-white bg-[rgba(244,244,245,0.50)] p-6 backdrop-blur-md aria-selected:pb-0"
          aria-selected={isWordcloundStep}
        >
          {renderModalContent()}
        </div>
      </div>
    )
  }

  const baseClassName = isWordcloundStep
    ? "bg-white max-md:!m-0 max-md:h-[calc(100vh-20px)]"
    : "bg-white max-md:!m-0 max-md:h-[calc(100vh-100px)]"

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
      <ModalContent>{renderModalContentWraper()}</ModalContent>
    </Modal>
  )
}
export default CreatPrivateAgentModal
