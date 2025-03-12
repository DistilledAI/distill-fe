import { distilledAIIcon } from "@assets/svg"
import CloseButton from "@components/CloseButton"
import { ArrowBottomSquareOutlineIcon } from "@components/Icons/Arrow"
import { CopyIcon } from "@components/Icons/Copy"
import { PATH_NAMES } from "@constants/index"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { IUser } from "@reducers/userSlice"
import { copyClipboard } from "@utils/index"
import { saveAs } from "file-saver"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"
import { IModalProps } from "types/modal"

const appUrl = window.location.origin

interface ShareModal extends IModalProps {
  agentData: IUser
  onClose?: any
}

const ShareModal = ({ isOpen, onClose, agentData }: ShareModal) => {
  const qrRef = useRef<HTMLCanvasElement>(null)

  const inviteUrl = `${appUrl}${PATH_NAMES.INVITE}/${agentData?.id}`

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "my-agent-qr-code.png")
        }
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-white w-fit",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="sm"
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="relative">
          <h3 className="flex-1 text-center text-24 font-semibold text-mercury-950">
            Agent QR
          </h3>
          <CloseButton
            onClose={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </ModalHeader>
        <ModalBody className="flex items-center justify-center space-y-2 pb-4">
          <QRCodeCanvas
            ref={qrRef}
            value={inviteUrl}
            size={256}
            title="Agent QR"
            imageSettings={{
              src: distilledAIIcon,
              width: 38,
              height: 20,
              excavate: true,
            }}
            level="H"
          />

          <div className="flex w-full items-center justify-center gap-8">
            <div
              className="group/item flex cursor-pointer items-center gap-1 hover:opacity-70"
              onClick={handleDownloadQR}
            >
              <ArrowBottomSquareOutlineIcon color="#a2845e" size={20} />
              <span className="text-base-md text-brown-10">Save image</span>
            </div>

            <div
              className="group/item flex cursor-pointer items-center gap-1 hover:opacity-70"
              onClick={(e) => copyClipboard(e, inviteUrl)}
            >
              <CopyIcon color="#a2845e" />
              <span className="text-base-md text-brown-10">Copy link</span>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
