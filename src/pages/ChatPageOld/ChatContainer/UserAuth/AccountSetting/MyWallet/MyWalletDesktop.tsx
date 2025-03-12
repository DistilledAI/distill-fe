import MyCredits from "../Credits"
import Language from "../Language"
import NotificationSetting from "../Notification"
import AgentCreative from "../Creative"
import VoiceChat from "../VoiceChat"
import VoiceCharacter from "../VoiceCharacter"
import PrivateAgent from "../Agent"
import PrivateAgentPod from "../AgentPod"
import React from "react"

const MyWalletDesktop: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  return (
    <>
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
          <PrivateAgent onClose={onClose} />
        </div>
        <div className="mt-4">
          <PrivateAgentPod />
        </div>
      </div>
    </>
  )
}

export default MyWalletDesktop
