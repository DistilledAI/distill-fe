import { maxAvatar } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { ShareArrowIcon } from "@components/Icons/Share"

const TopicTitle = () => {
  return (
    <div>
      <h3 className="text-24 font-semibold text-mercury-950">
        What was your initial impression of the Titanic movie?
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-14 text-mercury-950">Topic created by:</span>
          <div className="flex items-center gap-1">
            <AvatarCustom className="h-[18px] w-[18px]" src={maxAvatar} />
            <span className="text-14 font-bold text-brown-500">
              @maxisbuyin_
            </span>
          </div>
          <span className="text-14 text-mercury-950">2 days ago</span>
        </div>
        <button type="button">
          <ShareArrowIcon />
        </button>
      </div>
    </div>
  )
}

export default TopicTitle
