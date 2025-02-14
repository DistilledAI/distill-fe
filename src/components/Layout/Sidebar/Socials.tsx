import {
  AgentDotLandIcon,
  FilledSquareCircleIcon,
} from "@components/Icons/FilledSquareCircleIcon"
import { DuneOutlineIcon, XIcon } from "@components/Icons/SocialLinkIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { Link, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const SOCIALS = [
  {
    name: "Agents Store",
    icon: <FilledSquareCircleIcon size={18} />,
    link: PATH_NAMES.MARKETPLACE,
    type: "internal",
  },
  {
    name: "Agents.land",
    icon: <AgentDotLandIcon size={18} />,
    link: "https://agents.land",
    type: "external",
  },
  {
    name: "Dune Analytics",
    icon: <DuneOutlineIcon />,
    link: "https://dune.com/distilled_ai_team/distilledaistats",
    type: "external",
  },
  {
    name: "X (Twitter)",
    icon: <XIcon size={18} />,
    link: "https://dune.com/distilled_ai_team/distilledaistats",
    type: "external",
  },
]

const Socials = () => {
  const navigate = useNavigate()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <ul>
      {SOCIALS.map((item, index) => (
        <li key={index} className="cursor-pointer">
          {item.type === "internal" ? (
            <div
              className={twMerge(
                "flex items-center gap-2 px-4 py-2",
                sidebarCollapsed &&
                  "h-10 justify-center rounded-full border-[2px] border-transparent transition-all duration-100 ease-in-out hover:border-brown-500 hover:bg-brown-50",
              )}
              onClick={() => navigate(item.link)}
            >
              <div>{item.icon}</div>
              <span
                className={twMerge(
                  "whitespace-nowrap text-[16px] font-medium text-mercury-900 hover:underline",
                  sidebarCollapsed && "hidden",
                )}
              >
                {item.name}
              </span>
            </div>
          ) : (
            <Link
              to={item.link}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2"
            >
              <div>{item.icon}</div>
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
      ))}
    </ul>
  )
}

export default Socials
