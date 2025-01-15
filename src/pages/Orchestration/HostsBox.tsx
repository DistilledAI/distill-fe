import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { AgentDotLandIcon } from "@components/Icons/FilledSquareCircleIcon"
import { ExternalLinkIcon } from "@components/Icons/Share"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { centerTextEllipsis } from "@utils/index"
import { Link } from "react-router-dom"

const HostsBox = ({ conversationInfo }: { conversationInfo: any }) => {
  return (
    <div className="relative mt-4 flex gap-4 rounded-[14px] border border-mercury-100 bg-mercury-50 px-2 py-3 md:mt-6 md:px-4 md:py-[18px]">
      <div className="flex flex-1 items-center justify-between max-sm:flex-col">
        <div className="flex items-center gap-3 max-sm:mb-1">
          <AvatarCustom
            src={conversationInfo?.agent1?.avatar}
            badgeIcon={<FilledBrainAIIcon size={14} />}
            className="h-8 w-8 rounded-lg md:h-11 md:w-11"
            badgeClassName="bg-[#FC0] min-w-4 min-h-4 max-md:w-4 max-md:h-4 md:min-w-[18px] md:min-h-[18px]"
          />
          <div>
            <h4 className="text-16 font-bold text-mercury-950 max-sm:text-14">
              {conversationInfo?.agent1?.name}
            </h4>
            <a
              className="flex items-center gap-1 hover:underline"
              href={conversationInfo?.agent1?.tradeLink}
              target="_blank"
            >
              <span className="text-13 font-medium text-mercury-600">
                {centerTextEllipsis(
                  conversationInfo?.agent1?.contractAddress,
                  5,
                )}
              </span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={conversationInfo?.agent1?.tradeLink} target="_blank">
            <AgentDotLandIcon size={20} />
          </Link>
          <Link to={conversationInfo?.agent1?.x} target="_blank">
            <TwitterIcon size={20} />
          </Link>
          <Link to={conversationInfo?.agent1?.telegram} target="_blank">
            <TelegramOutlineIcon size={20} />
          </Link>
        </div>
      </div>

      <div className="h-11 w-[1px] bg-mercury-100" />

      <div className="flex flex-1 items-center justify-between max-sm:flex-col">
        <div className="flex items-center gap-3 max-sm:mb-1">
          <AvatarCustom
            src={conversationInfo?.agent2?.avatar}
            badgeIcon={<FilledBrainAIIcon size={14} />}
            className="h-8 w-8 rounded-lg md:h-11 md:w-11"
            badgeClassName="bg-[#FC0] min-w-4 min-h-4 max-md:w-4 max-md:h-4 md:min-w-[18px] md:min-h-[18px]"
          />
          <div>
            <h4 className="text-16 font-bold text-mercury-950 max-sm:text-14">
              {conversationInfo?.agent2?.name}
            </h4>
            <Link
              className="flex items-center gap-1 hover:underline"
              to={conversationInfo?.agent2?.tradeLink}
              target="_blank"
            >
              <span className="text-13 font-medium text-mercury-600">
                {centerTextEllipsis(
                  conversationInfo?.agent2?.contractAddress,
                  5,
                )}
              </span>
              <ExternalLinkIcon />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to={conversationInfo?.agent2?.tradeLink} target="_blank">
            <AgentDotLandIcon size={20} />
          </Link>
          <Link to={conversationInfo?.agent2?.x} target="_blank">
            <TwitterIcon size={20} />
          </Link>
          <Link to={conversationInfo?.agent2?.telegram} target="_blank">
            <TelegramOutlineIcon size={20} />
          </Link>
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
