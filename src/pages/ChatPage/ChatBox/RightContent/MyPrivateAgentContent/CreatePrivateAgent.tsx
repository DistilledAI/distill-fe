import { introPrivateAgentVideo } from "@assets/video"
import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { MessageFilledIcon } from "@components/Icons/Message"
import VideoCustom from "@components/VideoCustom"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import MainContainerCreate from "./MainContainerCreate"

export const TYPE_DATA_KEY = {
  SOCIAL_MEDIA: "social-media",
  CV_FILE: "cv-file",
  PDF_FILE: "pdf-file",
  PHOTO_VIDEO_FILE: "photo-video-file",
  TXT_FILE: "txt-file",
}

const CreatePrivateAgent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
  botId?: string | number
  onCallBack?: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const { isLogin, isAnonymous } = useAuthState()
  // const { isMobile } = useWindowSize()
  const navigate = useNavigate()

  const handleCreateAgent = () => {
    if (isLogin && !isAnonymous) {
      return navigate(PATH_NAMES.CREATE_AGENT)
    }
    return connectWallet()
  }

  return (
    <MainContainerCreate>
      <div className="mx-auto flex h-full w-full max-w-[768px] flex-col items-center pt-4 max-xl:px-4 md:justify-center md:py-0">
        {connectWalletLoading && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex-items-center">
              <DotLoading />
              <span className="text-base font-medium">
                Connecting your wallet
              </span>
            </div>
          </div>
        )}
        <div className="flex gap-2 max-md:flex-col md:gap-6">
          <VideoCustom
            videoSrc={introPrivateAgentVideo}
            classNames={{
              wrapper:
                "rounded-[22px] border border-mercury-70 overflow-hidden flex-1 bg-mercury-30",
              video: "h-full object-cover w-full",
            }}
            isPlayIcon
            isFullScreenIcon
          />
          <div className="flex w-full flex-1 flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-4 md:p-6">
            <div className="flex items-center gap-2 md:flex-col">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FC0] md:h-10 md:w-10">
                <FilledBrainAIIcon color="#363636" size={24} />
              </div>
              <h3 className="my-2 text-20 font-semibold text-mercury-950 md:text-24">
                Start your own Private agent
              </h3>
            </div>
            <h4 className="text-center text-14 text-mercury-800 md:text-16">
              Your <span className="font-bold">private agents</span>. Built with
              your <span className="font-bold">private data</span>. Protected by
              your <span className="font-bold">private key</span>.
            </h4>
            <Button
              className="mt-4 h-[56px] w-full rounded-full bg-mercury-950 text-[18px] text-mercury-30 md:mt-6"
              onPress={handleCreateAgent}
            >
              {isLogin && !isAnonymous ? "Create Agent" : "Connect Wallet"}
            </Button>
          </div>
        </div>

        <div className="mt-2 flex w-full flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-6 max-md:mb-4 md:mt-6">
          <div className="flex items-center gap-2 md:flex-col">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mercury-200 md:h-10 md:w-10">
              <MessageFilledIcon />
            </div>
            <h3 className="my-2 text-20 font-semibold text-mercury-950 md:text-24">
              Start a new chat
            </h3>
          </div>
          <h4 className="text-14 text-mercury-800 max-md:text-center md:text-16">
            Explore the <span className="font-bold">Marketplace</span> to chat
            with a public agent, interact with an AI Companion and more
          </h4>
          <Button
            className="mt-4 h-[56px] w-full rounded-full bg-mercury-100 text-[18px] text-mercury-950 md:mt-6"
            onPress={() => navigate(PATH_NAMES.MARKETPLACE)}
          >
            Go to Marketplace
          </Button>
        </div>
      </div>
    </MainContainerCreate>
  )
}

export default CreatePrivateAgent
