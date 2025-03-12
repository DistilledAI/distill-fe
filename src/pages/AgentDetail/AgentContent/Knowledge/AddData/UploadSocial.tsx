import { UploadIcon } from "@components/Icons"
import { Button } from "@nextui-org/react"
import CreatPrivateAgentModal from "@pages/ChatPageOld/ChatContainer/RightContent/Modal/CreatPrivateAgentModal"
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
        className="flex h-16 w-full items-center justify-between rounded-[14px] bg-mercury-950 px-6 font-bold text-mercury-950"
      >
        <div className="flex flex-col items-start">
          <span className="text-base-b text-mercury-30">Social Media</span>
          <span className="text-[13px] font-medium text-mercury-500">
            X account link
          </span>
        </div>
        <UploadIcon color="#FFFF" />
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
