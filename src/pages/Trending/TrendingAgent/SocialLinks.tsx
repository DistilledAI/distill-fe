import { Link } from "react-router-dom"
import { Socials } from "../hooks/useTrendingAgent"
import {
  DexScreenerIcon,
  TelegramOutlineIcon,
  XIcon,
} from "@components/Icons/SocialLinkIcon"
import { WorldGlobalIcon } from "@components/Icons/World"

const SOCIAL_LINKS = [
  { key: "web", icon: WorldGlobalIcon },
  { key: "dexscreener", icon: DexScreenerIcon },
  { key: "x", icon: XIcon },
  { key: "telegram", icon: TelegramOutlineIcon },
]

interface SocialsProps {
  socials: Socials
}

const SocialLinks = ({ socials }: SocialsProps) => {
  return (
    <div className="mt-2 flex items-center gap-3">
      {SOCIAL_LINKS.map(({ key, icon: Icon }) =>
        socials[key as keyof Socials] ? (
          <Link key={key} to={socials[key as keyof Socials]!} target="_blank">
            <Icon size={20} color="#FFFF" />
          </Link>
        ) : null,
      )}
    </div>
  )
}

export default SocialLinks
