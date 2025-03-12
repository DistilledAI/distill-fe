import ComingSoon from "@components/ComingSoon"
import { NotiOutlineIcon } from "@components/Icons/Notification"
import { Switch } from "@nextui-org/react"

const NotificationSetting = () => {
  return (
    <ComingSoon>
      <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-3 md:p-4">
        <div className="mb-[22px] flex items-center gap-1 md:gap-2">
          <NotiOutlineIcon />
          <span className="text-14 font-medium text-mercury-600 md:text-16">
            Agent Notification
          </span>
        </div>
        <Switch defaultSelected size="lg" />
      </div>
    </ComingSoon>
  )
}

export default NotificationSetting
