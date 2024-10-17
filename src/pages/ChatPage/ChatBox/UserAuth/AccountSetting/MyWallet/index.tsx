import { CopyIcon } from "@components/Icons/Copy"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { logout } from "@reducers/userSlice"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import PrivateAgent from "../Agent"
import PrivateAgentPod from "../AgentPod"
import AgentCreative from "../Creative"
import MyCredits from "../Credits"
import Language from "../Language"
import NotificationSetting from "../Notification"
import VoiceCharacter from "../VoiceCharacter"
import VoiceChat from "../VoiceChat"

const MyWallet: React.FC<{ onClose?: any; setTypeContent?: any }> = ({
  onClose,
  setTypeContent,
}) => {
  const { user } = useAuthState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      <div className="text-center text-mercury-900">
        <h3 className="mb-1 text-24 font-semibold">My wallet</h3>
        <div className="inline-flex items-center">
          <div
            onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
            className="flex cursor-pointer"
          >
            <span>Address:</span>
            <span className="ml-1 font-semibold">
              {centerTextEllipsis(user?.publicAddress ?? "", 6)}
            </span>
          </div>
          <div
            onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
            className="ml-3 cursor-pointer"
          >
            <CopyIcon />
          </div>
          <div className="ml-3">
            <MetamaskIconSmall />
          </div>
          <div
            onClick={() => {
              dispatch(logout())
              navigate(PATH_NAMES.HOME)
              onClose()
            }}
            className="ml-3 cursor-pointer"
          >
            <LogoutIcon />
          </div>
        </div>
      </div>
      <div className="mt-10 flex max-h-[calc(100%-64px)] flex-wrap gap-6 overflow-y-auto pb-[60px] scrollbar-hide">
        <div className="w-[calc(56%-12px)]">
          <MyCredits />
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="w-[calc(50%-8px)]">
              <Language />
            </div>
            <div className="w-[calc(50%-8px)]">
              <NotificationSetting />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="w-[calc(60%-8px)]">
              <AgentCreative />
            </div>
            <div className="w-[calc(40%-8px)]">
              <VoiceChat />
              <div className="mt-4">
                <VoiceCharacter />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[calc(44%-12px)]">
          <div>
            <PrivateAgent setTypeContent={setTypeContent} />
          </div>
          <div className="mt-4">
            <PrivateAgentPod />
          </div>
        </div>
      </div>
    </>
  )
}
export default MyWallet
