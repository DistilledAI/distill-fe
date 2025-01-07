import { ChartBarIcon } from "@components/Icons/Chart"
import { TwitterIcon } from "@components/Icons/Twitter"
import { useAppSelector } from "@hooks/useAppRedux"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const AnalyticsInfoWrap: React.FC = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <div
      className={twMerge(
        "relative z-[1] flex items-center justify-between gap-4 py-2 transition-all duration-300 ease-in-out",
        sidebarCollapsed && "flex-col",
      )}
    >
      <Link
        to="https://dune.com/distilled_ai_team/distilledaistats"
        target="_blank"
        className="flex items-center gap-1"
      >
        <ChartBarIcon color="#7B7B7B" />
        <span
          className={twMerge(
            "text-base-14 whitespace-nowrap text-mercury-700 hover:underline",
            sidebarCollapsed && "hidden",
          )}
        >
          Dune Analytics
        </span>
      </Link>
      <Link
        to="https://x.com/distilled_AI"
        target="_blank"
        className="flex items-center gap-1"
      >
        <TwitterIcon size={20} color="#545454" />
        {/* <span
          className={twMerge(
            "whitespace-nowrap text-base text-mercury-900 hover:underline",
            sidebarCollapsed && "hidden",
          )}
        >
          Twitter
        </span> */}
      </Link>
    </div>
  )
}
export default AnalyticsInfoWrap
