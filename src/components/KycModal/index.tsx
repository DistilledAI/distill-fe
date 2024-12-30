import AlertBox from "@components/AlertBox"
// import { GoogleLogo } from "@components/Icons"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, Modal, ModalContent } from "@nextui-org/react"
import React from "react"

const KycModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const twitterAuthorizeLink = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=V2wzbzlWcDFWZGg2U0l5VkZqRHg6MTpjaQ&redirect_uri=${window.location.origin}/account&scope=follows.read+tweet.read+follows.write+users.read&state=optionalState123&code_challenge=codeChallenge&code_challenge_method=plain`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-mercury-100 py-6 max-md:py-4",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="lg"
      backdrop="blur"
    >
      <ModalContent>
        <div className="relative px-10 pb-4">
          <div
            onClick={onClose}
            className="absolute right-5 top-0 cursor-pointer"
          >
            <CloseFilledIcon />
          </div>
          <p className="mb-3 text-22 font-semibold text-mercury-950">
            KYC Verification
          </p>
          <AlertBox
            isVisible={true}
            messages={[
              "Complete your KYC verification to earn xDSTL and farm EXP on Clan.",
            ]}
            links={[]}
          />
          {/* <p className="mt-2 text-center text-[#F78500]">
            No KYC results yet. Please be patient or try reconnecting.
          </p> */}
          {/* <p className="mt-2 text-center text-[#20993F]">
            Your account is verified
          </p> */}
          {/* <Button className="mt-6 h-[50px] w-full rounded-full bg-mercury-950">
            <GoogleLogo />
            <span className="text-16 text-mercury-30">
              Connect your Google account
            </span>
          </Button>
          <p className="my-1 text-center text-20 font-medium">or</p> */}
          <Button
            onPress={() => window.open(twitterAuthorizeLink)}
            className="mt-10 h-[50px] w-full rounded-full bg-mercury-950"
          >
            <TwitterIcon color="white" />
            <span className="text-16 text-mercury-30">
              Connect your X account
            </span>
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default KycModal
