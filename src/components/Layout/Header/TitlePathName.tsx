import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"

const TITLE_BY_PATH_NAMES = {
  [PATH_NAMES.HOME]: "Home",
}

const TitlePathName = () => {
  const { pathname } = useLocation()
  const title = TITLE_BY_PATH_NAMES[pathname]

  if (!title) return null

  return (
    <div className="flex items-center gap-3">
      <div className="h-[1px] w-10 bg-mercury-800" />
      <h2 className="text-16 font-bold text-mercury-950">{title}</h2>
    </div>
  )
}

export default TitlePathName
