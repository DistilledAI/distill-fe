import { CopyIcon } from "@components/Icons/Copy"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { PATH_NAMES } from "@constants/index"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import useWindowSize from "@hooks/useWindowSize"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useNavigate } from "react-router-dom"
import MyWalletDesktop from "./MyWalletDesktop"
import MyWalletMobile from "./MyWalletMobile"

interface MyWalletProps {
  onClose: () => void
}

const MyWallet = ({ onClose }: MyWalletProps) => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { logout } = useAuthAction()
  const { isMobile } = useWindowSize()

  const renderLogoutBtn = () => {
    return (
      <div
        onClick={() => {
          logout()
          navigate(PATH_NAMES.HOME)
          onClose()
        }}
        className="ml-3 cursor-pointer max-md:absolute max-md:left-3 max-md:top-5"
      >
        <LogoutIcon color={isMobile ? "#FF3B30" : "#676767"} />
      </div>
    )
  }

  return (
    <>
      <div className="text-center text-mercury-900">
        <h3 className="mb-2 text-18 font-semibold md:text-24">My wallet</h3>
        <div className="inline-flex items-center">
          <div
            onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
            className="flex cursor-pointer"
          >
            <span className="text-16 font-medium text-mercury-800">
              Address:
            </span>
            <span className="ml-1 text-16 font-bold text-mercury-800">
              {centerTextEllipsis(user?.publicAddress ?? "", 6)}
            </span>
          </div>
          <div
            onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
            className="ml-3 cursor-pointer"
          >
            <CopyIcon />
          </div>
          <div className="ml-3 hidden md:block">
            <MetamaskIconSmall />
          </div>
          {renderLogoutBtn()}
        </div>
      </div>
      <div className="mt-4 flex max-h-[calc(100%-84px)] w-full flex-col gap-3 overflow-y-auto overflow-x-hidden pb-20 scrollbar-hide max-md:max-h-[calc(100%-64px)] md:flex-row md:gap-6 md:pb-16">
        {isMobile ? (
          <MyWalletMobile onClose={onClose} />
        ) : (
          <MyWalletDesktop onClose={onClose} />
        )}
      </div>
    </>
  )
}
export default MyWallet
