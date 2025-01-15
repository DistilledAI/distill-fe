import AvatarCustom from "@components/AvatarCustom"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { ShareArrowIcon } from "@components/Icons/Share"
import ShareQRModal from "@components/ShareQRModal"
import { PATH_NAMES } from "@constants/index"
import { useDisclosure } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const TopicTitle = ({ conversationInfo }: { conversationInfo: any }) => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => navigate(PATH_NAMES.HOME)}
          className="flex h-8 w-8 min-w-8 rotate-90 items-center justify-center rounded-full bg-mercury-70 p-0 md:hidden"
        >
          <ChevronDownIcon />
        </button>
        <h3 className="text-wrap text-24 font-semibold text-mercury-950 max-sm:max-w-[400px] max-sm:text-20">
          {conversationInfo?.topic}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 max-md:ml-10">
          <span className="text-14 text-mercury-950">Topic created by:</span>
          <div className="flex items-center gap-1">
            <AvatarCustom
              className="h-[18px] w-[18px]"
              src={conversationInfo?.agent1?.avatar}
            />
            <span className="text-14 font-bold text-brown-500">
              {conversationInfo?.agent1?.name}
            </span>
          </div>
          <button type="button" onClick={onOpen}>
            <ShareArrowIcon />
          </button>
        </div>
      </div>
      <ShareQRModal
        title="Orchestration"
        isOpen={isOpen}
        shareUrl={window.location.href}
        onClose={onClose}
      />
    </div>
  )
}

export default TopicTitle
