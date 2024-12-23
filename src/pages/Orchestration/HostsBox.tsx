import { maxIcon } from "@assets/images"
import { solanaCircleIcon } from "@assets/svg"
import AvatarCustom from "@components/AvatarCustom"
import { ExternalLinkIcon } from "@components/Icons/Share"
import {
  DexScreenerIcon,
  TelegramOutlineIcon,
} from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"

const HostsBox = () => {
  return (
    <div className="relative mt-6 flex gap-4 rounded-[14px] border border-mercury-100 bg-mercury-50 px-4 py-[18px]">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-3">
          <AvatarCustom
            className="h-11 w-11 rounded-lg"
            badgeClassName="bg-transparent"
            src={maxIcon}
            badgeIcon={<img src={solanaCircleIcon} />}
          />
          <div>
            <h4 className="text-16 font-bold text-mercury-950">Max</h4>
            <div className="flex items-center gap-1">
              <span className="text-13 font-medium text-mercury-600">
                orai...Vo5h
              </span>
              <ExternalLinkIcon />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button">
            <DexScreenerIcon />
          </button>
          <button type="button">
            <TwitterIcon size={20} />
          </button>
          <button type="button">
            <TelegramOutlineIcon size={20} />
          </button>
        </div>
      </div>
      <div className="h-11 w-[1px] bg-mercury-100" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-3">
          <AvatarCustom
            className="h-11 w-11 rounded-lg"
            badgeClassName="bg-transparent"
            publicAddress="orai...Vo5h"
            badgeIcon={<img src={solanaCircleIcon} />}
          />
          <div>
            <h4 className="text-16 font-bold text-mercury-950">Min</h4>
            <div className="flex items-center gap-1">
              <span className="text-13 font-medium text-mercury-600">
                orai...Vo5h
              </span>
              <ExternalLinkIcon />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button">
            <DexScreenerIcon />
          </button>
          <button type="button">
            <TwitterIcon size={20} />
          </button>
          <button type="button">
            <TelegramOutlineIcon size={20} />
          </button>
        </div>
      </div>
      <div className="absolute -top-[11px] left-1 flex h-[22px] items-center gap-[6px] rounded-full border border-mercury-100 bg-white/30 px-1 backdrop-blur-[1.5px]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A5DC004D] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#58DC00]" />
        </span>
        <span className="text-13 font-bold text-mercury-900">Hosts:</span>
      </div>
    </div>
  )
}

export default HostsBox
