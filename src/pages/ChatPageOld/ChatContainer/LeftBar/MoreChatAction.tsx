import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { DotFilledIcon } from "@components/Icons/DotIcon"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGroup, leaveGroup } from "services/chat"
import { TypeGroup, UserGroup } from "./useFetchGroups"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const MoreChatAction: React.FC<{
  groupId: number
  groupType: TypeGroup
}> = ({ groupId, groupType }) => {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { isOpen: openPopup, onOpen, onOpenChange, onClose } = useDisclosure()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLeaveGroup = async () => {
    try {
      setLoading(true)
      const isChatToUser = groupType === TypeGroup.DIRECT
      const response = isChatToUser
        ? await deleteGroup(groupId)
        : await leaveGroup(groupId)
      if (response?.data?.message) {
        queryClient.setQueryData(
          [QueryDataKeys.MY_LIST_CHAT],
          (oldData: UserGroup[]) =>
            oldData.filter((item) => item.groupId !== groupId),
        )
        onOpenChange()
        navigate("/")
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        placement="bottom-start"
        size="lg"
      >
        <PopoverTrigger>
          <div className="flex-items-center absolute right-4 top-3 hidden h-8 w-8 cursor-pointer justify-center rounded-full bg-mercury-300 shadow-1 group-hover:flex">
            <DotFilledIcon size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-white">
          <div
            className="flex w-[150px] cursor-pointer items-center justify-center px-1 py-2"
            onClick={() => {
              setIsOpen(false)
              onOpen()
            }}
          >
            <span className="text-base-sb cursor-pointer">Leave</span>
          </div>
        </PopoverContent>
      </Popover>

      <Modal
        isOpen={openPopup}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "bg-white",
        }}
        size="sm"
      >
        <ModalContent>
          <ModalBody>
            <div className="relative mt-4 w-auto pb-2">
              <div className="flex-items-center justify-between">
                <span className="text-20 font-semibold text-mercury-950">
                  Leave chat?
                </span>
                <div className="cursor-pointer" onClick={onOpenChange}>
                  <CloseFilledIcon />
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <Button
                  className="mt-4 min-w-[90px] rounded-full bg-mercury-200 text-[15px] font-medium text-primary"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="mt-4 min-w-[90px] rounded-full bg-mercury-950 text-[15px] font-medium text-white"
                  onPress={() => handleLeaveGroup()}
                  isLoading={loading}
                >
                  Leave
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default MoreChatAction
