import { PATH_NAMES } from "@constants/index"
import { useLocation } from "react-router-dom"

const TITLE_BY_PATH_NAMES = {
  [PATH_NAMES.HOME]: "Home",
  [PATH_NAMES.ACCOUNT]: "My Profile",
  [PATH_NAMES.MARKETPLACE]: "Agent Store",
  [PATH_NAMES.PRIVATE_AGENT]: "Chats",
  [PATH_NAMES.CLAN]: "Clans",
  [PATH_NAMES.MY_AGENT_CLAN]: "Clans",
}

const TitlePathName = () => {
  const { pathname } = useLocation()
  const title = TITLE_BY_PATH_NAMES[pathname]

  if (!title) return null

  return (
    <div className="flex items-center gap-3">
      <div className="hidden h-[1px] w-10 bg-mercury-800 md:block" />
      <h2 className="whitespace-nowrap text-16 font-bold text-mercury-950">
        {title}
      </h2>
    </div>
  )
}

export default TitlePathName
