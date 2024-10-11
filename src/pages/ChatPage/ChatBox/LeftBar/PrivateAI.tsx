import useAuthState from "@hooks/useAuthState"
import { defineElement } from "@utils/index"
import { useState } from "react"
import CreateGroup from "./CreateGroup"
import MessagesContainer from "./MessagesContainer"
import SearchContainer from "./SearchContainer"

export const DISPLAY_MODES = {
  MESSAGES: "MESSAGES",
  SEARCH: "SEARCH",
  CREATE_GROUP: "CREATE_GROUP",
}

const MAP_CONTENT_BY_DISPLAY_MODE = {
  [DISPLAY_MODES.MESSAGES]: <MessagesContainer />,
  [DISPLAY_MODES.SEARCH]: <SearchContainer />,
  [DISPLAY_MODES.CREATE_GROUP]: <CreateGroup />,
}

export interface ContentDisplayMode {
  onChangeDisplayMode?: any
}

const PrivateAI: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<string>(DISPLAY_MODES.MESSAGES)
  const { isLogin } = useAuthState()

  const onChangeDisplayMode = (modeValue: string) => {
    setDisplayMode(modeValue)
  }

  if (!isLogin) return <div />

  return (
    <div className="h-full">
      <div className="my-4 h-[1px] w-full bg-mercury-100" />
      {defineElement(MAP_CONTENT_BY_DISPLAY_MODE[displayMode], {
        onChangeDisplayMode,
      })}
    </div>
  )
}
export default PrivateAI
