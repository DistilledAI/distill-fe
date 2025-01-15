import AvatarCustom from "@components/AvatarCustom"
import { ShareArrowIcon } from "@components/Icons/Share"
import ShareQRModal from "@components/ShareQRModal"
import { useDisclosure } from "@nextui-org/react"

const TopicTitle = ({ conversationInfo }: { conversationInfo: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <h3 className="text-wrap text-24 font-semibold text-mercury-950 max-sm:max-w-[400px] max-sm:text-20">
        {conversationInfo?.topic}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
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
