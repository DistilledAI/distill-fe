import { distilledAIIcon } from "@assets/svg"
import CloseButton from "@components/CloseButton"
import { ArrowBottomSquareOutlineIcon } from "@components/Icons/Arrow"
import { CopyIcon } from "@components/Icons/Copy"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { copyClipboard } from "@utils/index"
import { saveAs } from "file-saver"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"
import { IModalProps } from "types/modal"

interface ShareModal extends IModalProps {
  shareUrl: string
  title?: string
  onCLose?: any
}

const ShareQRModal = ({
  isOpen,
  onClose,
  shareUrl,
  title = "QR Code",
}: ShareModal) => {
  const qrRef = useRef<HTMLCanvasElement>(null)

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "agent-qr-code.png")
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
        wrapper: "z-[999]",
        backdrop: "z-[999]",
      }}
      size="sm"
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="relative">
          <h3 className="flex-1 text-center text-24 font-semibold text-mercury-950">
            {title}
          </h3>
          <CloseButton
            onClose={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </ModalHeader>
        <ModalBody className="flex items-center justify-center space-y-2 pb-4">
          <QRCodeCanvas
            ref={qrRef}
            value={shareUrl}
            size={240}
            title="My Agent QR"
            imageSettings={{
              src: distilledAIIcon,
              width: 32,
              height: 32,
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
              onClick={(e) => copyClipboard(e, shareUrl)}
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

export default ShareQRModal
