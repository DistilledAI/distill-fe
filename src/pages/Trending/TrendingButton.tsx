import { TrendingIcon } from "@components/Icons/TrendingPage"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const TrendingButton = () => {
  const navigate = useNavigate()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <Button
      className={twMerge(
        "btn-primary z-10 min-h-[60px] w-full",
        sidebarCollapsed && "min-h-14 min-w-14",
      )}
      onClick={() => navigate(PATH_NAMES.TRENDING)}
    >
      <TrendingIcon />
      <span
        className={twMerge(
          "text-[16px] text-mercury-900",
          sidebarCollapsed && "hidden",
        )}
      >
        Trending
      </span>
    </Button>
  )
}

export default TrendingButton
