import { MessageQuestionIcon } from "@components/Icons/Message"
import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { useDisclosure } from "@nextui-org/react"
import AddFAQModal from "./AddFAQModal"

interface Props {
  onMoreCustomRequest: (data: number[]) => any
}

const UploadFAQ = ({ onMoreCustomRequest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className="h-fit !w-full rounded-[32px] border-[1px] border-mercury-200 bg-mercury-50 p-1">
        <div
          className="flex h-[50px] w-full min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6"
          onClick={onOpen}
        >
          <div className="flex items-center gap-2">
            <div>
              <MessageQuestionIcon />
            </div>
            <span className="text-center text-14 font-bold text-mercury-950">
              FAQ Samples
            </span>
          </div>
          <TablerPlusIcon />
        </div>
      </div>
      <AddFAQModal
        isOpen={isOpen}
        onClose={onClose}
        onMoreCustomRequest={onMoreCustomRequest}
      />
    </>
  )
}

export default UploadFAQ
