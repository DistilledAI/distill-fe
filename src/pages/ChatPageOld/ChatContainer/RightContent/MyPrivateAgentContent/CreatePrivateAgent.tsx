import { introPrivateAgentVideo } from "@assets/video"
import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DistilledAIIcon } from "@components/Icons/DistilledAIIcon"
import { AgentDotLandIcon } from "@components/Icons/FilledSquareCircleIcon"
import VideoCustom from "@components/VideoCustom"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useWindowSize from "@hooks/useWindowSize"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import MainContainerCreate from "./MainContainerCreate"

export const TYPE_DATA_KEY = {
  SOCIAL_MEDIA: "social-media",
  CV_FILE: "cv-file",
  PDF_FILE: "pdf-file",
  PHOTO_VIDEO_FILE: "photo-video-file",
  TXT_FILE: "txt-file",
  FAQ: "faq",
  PLAIN_TEXT_FILE: "plain-text-file",
}

const CreatePrivateAgent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
  botId?: string | number
  onCallBack?: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const { isLogin, isAnonymous } = useAuthState()
  const { isMobile } = useWindowSize()
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

        {!isMobile && (
          <div className="left-0 mb-6 w-full">
            <Button
              className="btn-primary z-10 min-h-[60px] !border-mercury-70 !bg-mercury-30"
              onPress={() => window.open("https://distilled.ai/", "_blank")}
            >
              <div>
                <DistilledAIIcon />
              </div>
              <span className={"text-[16px] text-mercury-900"}>
                About Distilled AI
              </span>
            </Button>
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
          <div className="relative flex w-full flex-1 flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-4 md:p-6">
            <div className="absolute left-6 top-3">
              <span className="text-[40px] font-bold text-mercury-200">1</span>
            </div>
            <div className="flex items-center gap-2 md:flex-col">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FC0] md:h-10 md:w-10">
                <FilledBrainAIIcon color="#363636" size={24} />
              </div>
              <h3 className="my-2 text-20 font-semibold text-mercury-950 md:text-24">
                Create your Agent
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

        <div className="relative mt-2 flex w-full flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-6 max-md:mb-4 md:mt-6">
          <div className="absolute left-6 top-3">
            <span className="text-[40px] font-bold text-mercury-200">2</span>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7A5A] md:h-10 md:w-10">
              <AgentDotLandIcon />
            </div>
            <h3 className="my-2 text-20 font-semibold text-mercury-950 md:text-24">
              Launch your Agent
            </h3>
          </div>
          <h4 className="text-14 text-mercury-800 max-md:text-center md:text-16">
            Take your agent to the promised land
          </h4>
          <Button
            className="mt-4 h-[56px] w-full rounded-full bg-mercury-950 text-[18px] text-white md:mt-6"
            onPress={() => window.open("https://agents.land/", "_blank")}
          >
            Go to Agents.land
          </Button>
        </div>

        {isMobile && (
          <div className="left-0 w-full">
            <Button
              className="btn-primary z-10 min-h-[60px] w-full !border-mercury-70 !bg-mercury-30"
              onPress={() => window.open("https://distilled.ai/", "_blank")}
            >
              <div>
                <DistilledAIIcon />
              </div>
              <span className={"text-[16px] text-mercury-900"}>
                About Distilled AI
              </span>
            </Button>
          </div>
        )}
      </div>
    </MainContainerCreate>
  )
}

export default CreatePrivateAgent
