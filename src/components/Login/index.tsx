import { desktopPrivateAgent } from "@assets/images"
import DotLoading from "@components/DotLoading"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import useConnectWallet from "@hooks/useConnectWallet"

const Login = () => {
  const { connectMultipleWallet, loading } = useConnectWallet()

  return (
    <div
      className="relative mx-auto flex h-[calc(100dvh-68px)] w-full flex-1 items-center justify-center rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow max-md:h-[calc(100dvh-50px)]"
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
            onClick={connectMultipleWallet}
          >
            <span className="font-semibold text-mercury-950">
              Connect wallet
            </span>
            <br />
            to start your own Private Agent.
          </span>
        </div>
      )}
    </div>
  )
}

export default Login
