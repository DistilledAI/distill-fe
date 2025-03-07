import { ShareWithQrIcon } from "@components/Icons/Share"
import ShareQRModal from "@components/ShareQRModal"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button, useDisclosure } from "@nextui-org/react"

const appUrl = window.location.origin

interface Props {
  textButton?: string
  titleShareQRModal?: string
  isDisabled?: boolean
  shareUrl?: string
}

const ShareProfile = ({
  textButton = "Share your profile",
  titleShareQRModal = "My Profile QR",
  isDisabled = false,
  shareUrl,
}: Props) => {
  const { user } = useAuthState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        isDisabled={isDisabled}
        className="flex w-full rounded-full bg-mercury-100 max-md:min-h-12"
        onPress={onOpen}
      >
        <ShareWithQrIcon />
        <span className="text-base-md text-mercury-950">{textButton}</span>
      </Button>
      {isOpen && (
        <ShareQRModal
          shareUrl={
            shareUrl || `${appUrl}${PATH_NAMES.AUTHOR_PROFILE}/${user?.id}`
          }
          isOpen={isOpen}
          onClose={onClose}
          title={titleShareQRModal}
        />
      )}
    </>
  )
}

export default ShareProfile
