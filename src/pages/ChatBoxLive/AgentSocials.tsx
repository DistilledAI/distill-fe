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
    button?: string
  }
}

const AgentSocials = ({ agentInfo, classNames }: AgentSocialsProps) => {
  return (
    <div className={twMerge("flex items-center gap-3", classNames?.wrapper)}>
      <SocialButton
        icon={<WorldGlobalIcon />}
        link={agentInfo?.website}
        isDisabled={!agentInfo?.website}
        btnClassName={classNames?.button}
      />
      <SocialButton
        icon={<TwitterIcon size={20} />}
        link={agentInfo?.xLink}
        isDisabled={!agentInfo?.xLink}
        btnClassName={classNames?.button}
      />
      <SocialButton
        icon={<TelegramOutlineIcon size={20} />}
        link={agentInfo?.teleLink}
        isDisabled={!agentInfo?.teleLink}
        btnClassName={classNames?.button}
      />
    </div>
  )
}

export default AgentSocials
