import { UploadIcon } from "@components/Icons"
import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
import { Button } from "@nextui-org/react"
import CreatPrivateAgentModal from "@pages/ChatPage/ChatContainer/RightContent/Modal/CreatPrivateAgentModal"
import React, { useState } from "react"

const UploadSocial: React.FC<{
  onMoreCustomRequest: (data: number[]) => any
}> = ({ onMoreCustomRequest }) => {
  const [socialUrls, setSocialUrls] = useState<string[]>([])
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const handlemSetSocialUrls = (newUrl: string) => {
    setSocialUrls([...socialUrls, newUrl])
  }

  return (
    <>
      <Button
        onPress={() => setOpenPopup(true)}
        className="flex h-[56px] w-full items-center justify-between rounded-full bg-mercury-100 font-bold text-mercury-950"
      >
        <div className="flex items-center gap-1">
          <SocialLinkIcon color="#363636" /> <span>Social Media</span>
        </div>
        <UploadIcon />
      </Button>
      <CreatPrivateAgentModal
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handlemSetSocialUrls={handlemSetSocialUrls}
        moreCustomRequest={onMoreCustomRequest}
      />
    </>
  )
}

export default UploadSocial
