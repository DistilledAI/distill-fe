import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { EmailUpIcon } from "@components/Icons/EmailUpIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { SocialLinkIcon, ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import { message, Upload } from "antd"
import { RcFile } from "antd/es/upload"
import mainContentBg from "assets/images/main-content-bg.jpg"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import HugeButton from "../HugeButton"
import CreatPrivateAgentModal from "../Modal/CreatPrivateAgentModal"
import FYIModal from "../Modal/FYIModal"

const CreatePrivateAgent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
  setCreated: any
}> = ({ connectWalletLoading, connectWallet, setCreated }) => {
  const isLogin = useAppSelector((state) => state.user.isLogin)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  // const [ref,  isHovered] = useHover()
  const isHovered = true

  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      return message.error("The file size must be less than 2MB!")
    }

    return isLt2M
  }

  const handleUploadImage = async (file: any) => {
    const bodyFormData = new FormData()
    bodyFormData.append("file", file)
    // const res = await uploadImage(bodyFormData)
    // if (res?.data) {
    // const finalValue = generalInfo.map((item) => {
    //   if (item.fieldType === AVATAR_URL) {
    //     return {
    //       ...item,
    //       originalValue: res?.data?.fileUrl,
    //     }
    //   }

    //   return item
    // })
    // setUploading(false)
    // }
  }

  const uploadProps: any = {
    onChange({ file }: { file: any }) {
      if (file.status !== "uploading") {
        handleUploadImage(file?.originFileObj)
      }
    },
    showUploadList: false,
    maxCount: 1,
    beforeUpload: beforeUpload,
  }

  const renderCreateAccountAction = () => {
    if (connectWalletLoading)
      return (
        <div className="absolute top-1/2 flex -translate-y-[230px] flex-col items-center gap-2">
          <ExploreFilledIcon />
          <div className="flex-items-center">
            <DotLoading />
            <span className="text-base font-medium">Creating your wallet</span>
          </div>
        </div>
      )

    return (
      <div className="flex-items-center absolute top-1/2 max-w-[390px] -translate-y-[230px] flex-col">
        <FilledExclamationCircleIcon />
        <span
          className="cursor-pointer text-center text-24 text-mercury-800"
          onClick={() => connectWallet()}
        >
          <span className="font-semibold text-mercury-950">Connect wallet</span>
          <br />
          to start your own Private agent.
        </span>
      </div>
    )
  }

  if (!isLogin) {
    return (
      <MainContainer>
        {renderCreateAccountAction()}
        <HugeButton
          icon={<FilledBrainAIIcon />}
          label="Start your Private Agent"
          isDisable
        />
      </MainContainer>
    )
  }

  return (
    <>
      <MainContainer>
        <div
          className="absolute h-[60%] w-[80%]"
          // ref={ref}
        >
          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <HugeButton
              icon={
                <div className="flex-items-center gap-1">
                  <FilledBrainAIIcon color="#A2845E" size={24} />
                  <ThreeDotsIcon />
                  <DatabaseImportIcon />
                </div>
              }
              label="Create your Private Agent"
              isDisable={false}
            />
          </div>
          <div
            className={twMerge(
              "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
              isHovered && "top-1/4 -translate-x-[200px]",
            )}
          >
            <HugeButton icon={<PDFTypeIcon />} label="PDFs" isDisable={true} />
          </div>
          <div
            className={twMerge(
              "absolute right-1/2 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out",
              isHovered && "top-1/4 translate-x-[200px]",
            )}
          >
            <HugeButton
              icon={<EmailUpIcon />}
              label="Emails"
              isDisable={true}
            />
          </div>
          <div
            className={twMerge(
              "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
              isHovered && "-translate-x-[280px] -translate-y-1/4",
            )}
          >
            <Upload {...uploadProps}>
              <HugeButton icon={<PhotoPlusIcon />} label="Photos & Videos" />
            </Upload>
          </div>
          <div
            className={twMerge(
              "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
              isHovered && "-translate-y-1/4 translate-x-[120px]",
            )}
            onClick={() => {
              setOpenPopup(true)
            }}
          >
            <HugeButton
              icon={<SocialLinkIcon />}
              label="Website links (including Social Media)"
              isDisable={false}
            />
          </div>
        </div>
      </MainContainer>

      <CreatPrivateAgentModal
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setCreated={setCreated}
      />
    </>
  )
}

const MainContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [openFYIPopup, setOpenFYIPopupp] = useState<boolean>(false)

  return (
    <>
      <div
        className="relative h-full w-full flex-1 rounded-[22px] border border-white bg-mercury-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mainContentBg})`,
        }}
      >
        <div className="flex-items-center relative h-full w-full flex-col justify-center">
          {children}
          <div className="absolute bottom-[60px]">
            <span className="text-base-m text-mercury-800">
              Your Private Agent is exclusively accessible to you unless you
              choose to publish it on the Marketplace.
            </span>

            <div
              className="flex-items-center mt-2 cursor-pointer justify-center gap-2"
              onClick={() => setOpenFYIPopupp(true)}
            >
              <FilledShieldCheckedIcon color="#A2845E" />
              <span className="text-base-m text-brown-10">
                How do we protect your private data?
              </span>
            </div>
          </div>
        </div>
      </div>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
    </>
  )
}

export default CreatePrivateAgent
