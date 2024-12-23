import { maxIcon } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"

const OrchestrationHeader = () => {
  return (
    <div className="flex gap-6">
      <div className="relative">
        <AvatarCustom src={maxIcon} className="h-7 w-7" />
        <AvatarCustom
          className="absolute -right-3 top-3 z-[-1] h-7 w-7"
          publicAddress="orai...Vo5h"
        />
      </div>
      <div>
        <h4 className="text-left text-14 font-bold text-mercury-950">
          Max & Min
        </h4>
        <span className="text-14 text-mercury-800">Orchestration</span>
      </div>
    </div>
  )
}

export default OrchestrationHeader
