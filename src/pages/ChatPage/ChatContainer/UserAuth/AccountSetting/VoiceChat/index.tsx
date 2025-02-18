import ComingSoon from "@components/ComingSoon"
import { VoiceChatIcon } from "@components/Icons/Voice"
import { Switch } from "@nextui-org/react"

const VoiceChat = () => {
  return (
    <ComingSoon>
      <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-3 md:p-4">
        <div className="mb-[22px] flex items-center gap-1 md:gap-2">
          <VoiceChatIcon />
          <span className="font-medium text-mercury-600">Voice Chat</span>
        </div>
        <Switch size="lg" />
      </div>
    </ComingSoon>
  )
}

export default VoiceChat
