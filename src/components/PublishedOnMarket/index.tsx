import AvatarCustom from "@components/AvatarCustom"
import CloseButton from "@components/CloseButton"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { ChatIcon } from "@components/Icons/Chat"
import { CheckedIcon } from "@components/Icons/Checked"
import { ShareWithQrIcon } from "@components/Icons/Share"
import { PATH_NAMES } from "@constants/index"
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import ShareModal from "@components/ShareQRModal"
import React from "react"
import { Link } from "react-router-dom"
import useWindowSize from "@hooks/useWindowSize"

interface PublishData {
  avatar?: string
  nameDisplay?: string
  username?: string
  description?: string
  publicAddress?: string
  id: number
}

const PublishedOnMarket: React.FC<{
  isOpen: boolean
  onClose: () => void
  data: PublishData
}> = ({ isOpen, onClose, data }) => {
  const { isMobile } = useWindowSize()
  const {
    isOpen: isOpenQR,
    onOpen: onOpenQR,
    onClose: onCloseQR,
  } = useDisclosure()

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        hideCloseButton
        size="4xl"
        classNames={{ wrapper: "overflow-hidden", base: "bg-mercury-100" }}
      >
        <ModalContent className="rounded-3xl">
          <div className="p-6 max-sm:px-4">
            <CloseButton
              onClose={onClose}
              className="absolute right-5 top-4 z-[1]"
            />
            <div className="flex flex-col items-center justify-center">
              <p className="mb-2 text-24 font-semibold text-mercury-950 max-sm:text-20">
                Congratulations!
              </p>
              <div className="inline-flex items-center gap-2">
                <CheckedIcon size={16} />
                <span className="text-green-600">
                  Your agent is published on marketplace
                </span>
              </div>
            </div>
            <div className="mt-10 text-center max-sm:mt-6">
              <AvatarCustom
                className="h-[100px] w-[100px] max-sm:h-[70px] max-sm:w-[70px]"
                src={data.avatar}
                publicAddress={data.publicAddress}
                badgeIcon={<FilledBrainAIIcon />}
                badgeClassName="bg-[#FC0] w-[24px] h-[24px]"
              />
              <p className="text-24 font-semibold max-sm:text-18">
                {data.nameDisplay}
              </p>
              <div className="mx-auto mt-3 line-clamp-4 max-w-[600px] text-18 text-mercury-900 max-sm:text-15">
                {data.description}
              </div>
            </div>
            <div className="mb-6 mt-6 flex items-center justify-center gap-3">
              <Button
                className="flex rounded-full border-1 border-white bg-mercury-30"
                onPress={onOpenQR}
              >
                <ShareWithQrIcon />
                <span className="font-medium text-mercury-950">
                  Share as QR
                </span>
              </Button>
              <Button
                onPress={onClose}
                as={Link}
                to={isMobile ? PATH_NAMES.PRIVATE_AGENT : PATH_NAMES.HOME}
                className="rounded-full bg-mercury-950"
              >
                <ChatIcon />
                <span className="text-white">Chat with agent</span>
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <ShareModal
        shareUrl={`${window.location.origin}${PATH_NAMES.INVITE}/${data.id}`}
        isOpen={isOpenQR}
        onClose={onCloseQR}
      />
    </>
  )
}

export default PublishedOnMarket
