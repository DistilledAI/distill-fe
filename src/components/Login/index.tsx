import { desktopPrivateAgent } from "@assets/images"
import DotLoading from "@components/DotLoading"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import { PATH_NAMES } from "@constants/index"
import useConnectWallet from "@hooks/useConnectWallet"
import useWindowSize from "@hooks/useWindowSize"
import IntroVideo from "@pages/ChatPage/ChatBox/RightContent/Modal/CreatPrivateAgentModal/IntroVideo"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { connectWallet, loading } = useConnectWallet()
  const { isMobile } = useWindowSize()
  const navigate = useNavigate()

  useEffect(() => {
    if (isMobile) navigate(PATH_NAMES.HOME)
  }, [isMobile])

  return (
    <div
      className="relative mx-auto flex h-full w-full flex-1 items-center justify-center rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow max-md:h-dvh"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <ExploreFilledIcon />
          <div className="flex-items-center">
            <DotLoading />
            <span className="text-base font-medium">Creating your wallet</span>
          </div>
        </div>
      ) : (
        <div className="flex-items-center max-w-[390px] flex-col">
          <FilledExclamationCircleIcon />
          <span
            className="cursor-pointer text-center text-24 text-mercury-800 max-md:text-20"
            onClick={() => connectWallet()}
          >
            <span className="font-semibold text-mercury-950">
              Connect wallet
            </span>
            <br />
            to start your own Private Agent.
          </span>
        </div>
      )}
      <div className="absolute right-6 top-4 hidden w-[240px] md:block">
        <IntroVideo />
      </div>
    </div>
  )
}

export default Login
