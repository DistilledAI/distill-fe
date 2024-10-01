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
import { useHover } from "@hooks/useHover"
import mainContentBg from "assets/images/main-content-bg.jpg"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import HugeButton from "../HugeButton"
import FYIModal from "../Modal/FYIModal"
import SNSModal from "../Modal/SNSModal"

const MyEchoContent: React.FC<{ connectWalletLoading: boolean }> = ({
  connectWalletLoading,
}) => {
  const isLogin = useAppSelector((state) => state.user.isLogin)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [ref, isHovered] = useHover()

  const renderCreateAccountAction = () => {
    if (connectWalletLoading)
      return (
        <div className="absolute top-1/2 flex -translate-y-[230px] flex-col items-center gap-2">
          <ExploreFilledIcon />
          <div className="flex-items-center">
            <DotLoading />
            <span className="text-base font-medium">Creating your account</span>
          </div>
        </div>
      )

    return (
      <div className="flex-items-center absolute top-1/2 max-w-[390px] -translate-y-[230px] flex-col">
        <FilledExclamationCircleIcon />
        <span className="text-center text-24 text-mercury-800">
          <span className="font-semibold text-mercury-950">
            Create an account
          </span>
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
          label="Create your Echo Agent"
          isDisable
        />
      </MainContainer>
    )
  }

  return (
    <>
      <MainContainer>
        <div className="absolute h-[60%] w-[80%]" ref={ref}>
          <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <HugeButton
              icon={
                <div className="flex-items-center gap-1">
                  <FilledBrainAIIcon color="#A2845E" size={24} />
                  <ThreeDotsIcon />
                  <DatabaseImportIcon />
                </div>
              }
              label="Create your Echo Agent"
              isDisable={false}
            />
          </div>
          <div
            className={twMerge(
              "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
              isHovered && "top-1/4 -translate-x-[200px]",
            )}
          >
            <HugeButton icon={<PDFTypeIcon />} label="PDPs" isDisable={false} />
          </div>
          <div
            className={twMerge(
              "absolute right-1/2 top-1/2 z-30 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out",
              isHovered && "top-1/4 translate-x-[200px]",
            )}
          >
            <HugeButton
              icon={<EmailUpIcon />}
              label="Emails"
              isDisable={false}
            />
          </div>
          <div
            className={twMerge(
              "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
              isHovered && "-translate-x-[280px] -translate-y-1/4",
            )}
          >
            <HugeButton
              icon={<PhotoPlusIcon />}
              label="Photos & Videos"
              isDisable={false}
            />
          </div>
          <div
            className={twMerge(
              "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
              isHovered && "-translate-y-1/4 translate-x-[120px]",
            )}
            onClick={(e) => {
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
      <SNSModal openPopup={openPopup} setOpenPopup={setOpenPopup} />
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
              Your Private Agent is private to you only, unless you publish it
              to the Marketplace.
            </span>
            <div
              className="flex-items-center mt-2 cursor-pointer justify-center gap-2"
              onClick={() => setOpenFYIPopupp(true)}
            >
              <FilledShieldCheckedIcon />
              <span className="text-base-m text-mercury-800">
                How Your Data is Secure in Private Intelligence?
              </span>
            </div>
          </div>
        </div>
      </div>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
    </>
  )
}

export default MyEchoContent
