import { chatIconDraw, chatIconMagic, chatIconRightArrow } from "@assets/svg"
import { ArrowUpCapLockIcon } from "@components/Icons"
import { useCommandMsgChat } from "../Providers/CommandMessageProvider"
import { useEffect } from "react"
import ComingSoon from "@components/ComingSoon"

const HeaderCommandChat = () => {
  const { setIsOpenTool, isOpenTool } = useCommandMsgChat()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "t") {
        event.preventDefault()
        event.stopPropagation()
        setIsOpenTool(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="flex h-[48px] items-center justify-between rounded-t-[22px] bg-mercury-70 px-3">
      <div className="relative flex items-center">
        <ComingSoon wrapperClassName="w-auto">
          <div className="flex items-center">
            <img className="-ml-2" src={chatIconRightArrow} />
            <span className="text-15 text-mercury-900">Chat focus</span>
          </div>
        </ComingSoon>
        <span className="mx-4 h-[22px] w-[1px] bg-mercury-200"></span>
        <ComingSoon wrapperClassName="w-auto">
          <div className="flex items-center gap-1">
            <img src={chatIconDraw} />
            <span className="whitespace-nowrap text-15 text-mercury-900">
              Add Reference
            </span>
          </div>
        </ComingSoon>
      </div>
      <div className="flex items-end gap-4">
        <div
          onClick={() => setIsOpenTool(!isOpenTool)}
          className="flex cursor-pointer items-center gap-1"
        >
          <img src={chatIconMagic} />
          <span className="text-15 text-mercury-900">Tools</span>
        </div>
        <div
          style={{
            boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.05)",
          }}
          className="flex h-[26px] w-[45px] items-center justify-center gap-1 rounded border-1 border-white bg-mercury-30"
        >
          <ArrowUpCapLockIcon size={16} />
          <span>T</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderCommandChat
