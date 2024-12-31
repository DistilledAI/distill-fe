import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"

const TITLE_BY_PATH_NAMES = {
  [PATH_NAMES.TRENDING]: "Trending Agents",
}

const Title = () => {
  const { pathname } = useLocation()
  const title = TITLE_BY_PATH_NAMES[pathname]

  if (!title) return null

  return <h3 className="flex-1 text-24 text-mercury-950">{title}</h3>
}

export default Title
