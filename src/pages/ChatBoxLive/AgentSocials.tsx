import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { WorldGlobalIcon } from "@components/Icons/World"
import { twMerge } from "tailwind-merge"
import SocialButton from "./SocialButton"

export interface AgentSocialsProps {
  agentInfo:
    | {
        avatar?: string
        username?: string
        xLink?: string
        teleLink?: string
        shareLink?: string
        contract?: string
        website?: string
      }
    | undefined
  classNames?: {
    wrapper?: string
  }
}

const AgentSocials = ({ agentInfo, classNames }: AgentSocialsProps) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-3",
        classNames?.wrapper,
      )}
    >
      <SocialButton
        icon={<WorldGlobalIcon />}
        link={agentInfo?.website}
        isDisabled={!agentInfo?.website}
      />
      <SocialButton
        icon={<TwitterIcon size={20} />}
        link={agentInfo?.xLink}
        isDisabled={!agentInfo?.xLink}
      />
      <SocialButton
        icon={<TelegramOutlineIcon size={20} />}
        link={agentInfo?.teleLink}
        isDisabled={!agentInfo?.teleLink}
      />
    </div>
  )
}

export default AgentSocials
