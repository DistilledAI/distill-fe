import CloseButton from "@components/CloseButton"
import DrawerBottom from "@components/DrawerBottom"
import useWindowSize from "@hooks/useWindowSize"
import { Modal, ModalContent } from "@nextui-org/react"
import React from "react"
import MyWallet from "./MyWallet"

const AccountSetting: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { isMobile } = useWindowSize()

  return isMobile ? (
    <DrawerBottom isOpen={isOpen} onClose={onClose}>
      {isOpen && <MyWallet onClose={onClose} />}
    </DrawerBottom>
  ) : (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      hideCloseButton
      size="5xl"
      classNames={{ wrapper: "overflow-hidden" }}
    >
      <ModalContent className="rounded-3xl">
        {isOpen && (
          <div className="h-[calc(100dvh-100px)] bg-[rgba(211,211,211,0.70)] px-20 pt-10 backdrop-blur-[15px]">
            <CloseButton
              onClose={onClose}
              className="absolute right-5 top-4 z-[1]"
            />
            <MyWallet onClose={onClose} />
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AccountSetting
