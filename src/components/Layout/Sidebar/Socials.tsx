import { distilledAIIcon } from "@assets/svg"
import DistilledAILogo from "@components/DistilledAILogo"
import { DistilledAIIcon } from "@components/Icons/DistilledAIIcon"
import {
  AgentDotLandIcon,
  FilledSquareCircleIcon,
} from "@components/Icons/FilledSquareCircleIcon"
import { DuneOutlineIcon, XIcon } from "@components/Icons/SocialLinkIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useWindowSize from "@hooks/useWindowSize"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const SOCIALS = [
  // {
  //   name: "Agents Store",
  //   icon: (color?: string) => (
  //     <FilledSquareCircleIcon size={18} color={color} />
  //   ),
  //   link: PATH_NAMES.MARKETPLACE,
  //   type: "internal",
  // },
  {
    name: "About Distilled AI",
    icon: () => (
      <img src={distilledAIIcon} className="h-5 w-5" alt="distilled ai logo" />
    ),
    link: "https://distilled.ai",
    type: "external",
  },
  {
    name: "Agents.land",
    icon: (color?: string) => <AgentDotLandIcon size={18} color={color} />,
    link: "https://agents.land",
    type: "external",
  },
  // {
  //   name: "Dune Analytics",
  //   icon: (color?: string) => <DuneOutlineIcon color={color} />,
  //   link: "https://dune.com/distilled_ai_team/distilledaistats",
  //   type: "external",
  // },
  {
    name: "X (Twitter)",
    icon: (color?: string) => <XIcon size={18} color={color} />,
    link: "https://x.com/distilled_AI",
    type: "external",
  },
]

const Socials = () => {
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
  const { pathname: currentPath } = useLocation()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  const LIST = isMobile
    ? SOCIALS.filter((item) => item.name !== "Agents Store")
    : SOCIALS

  return (
    <ul>
      {LIST.map((item, index) => {
        const [itemBasePath] = item.link.split("?")
        const isActive = currentPath === itemBasePath

        return (
          <li key={index} className="cursor-pointer">
            {item.type === "internal" ? (
              <div
                className={twMerge(
                  "flex h-10 items-center gap-2 rounded-full border-[2px] border-transparent px-4 py-2 max-md:h-8",
                  sidebarCollapsed &&
                    "justify-center transition-all duration-100 ease-in-out hover:border-brown-500 hover:bg-brown-50",
                  isActive && "border-brown-500 bg-brown-50",
                )}
                onClick={() => navigate(item.link)}
              >
                <div>{item.icon(isActive ? "#83664B" : "#545454")}</div>
                <span
                  className={twMerge(
                    "whitespace-nowrap text-[16px] font-medium text-mercury-900 hover:underline",
                    sidebarCollapsed && "hidden",
                    isActive && "text-brown-600 hover:no-underline",
                  )}
                >
                  {item.name}
                </span>
              </div>
            ) : (
              <Link
                to={item.link}
                target="_blank"
                className="flex h-10 items-center gap-2 border-[2px] border-transparent px-4 py-2 max-md:h-8"
              >
                <div className="flex-shrink-0">{item.icon("#545454")}</div>
                <span
                  className={twMerge(
                    "whitespace-nowrap text-[16px] font-medium text-mercury-900 hover:underline",
                    sidebarCollapsed && "hidden",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Socials
