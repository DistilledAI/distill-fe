import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { PATH_NAMES } from "@constants/index"
import { deleteGroup } from "services/chat"
import { TypeGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

interface MoreActionProps {
  groupId: number
  groupType: TypeGroup
}

const DROPDOWN_CLASSES = { base: "mt-1" }
const MODAL_CLASSES = {
  base: "bg-white",
  wrapper: "z-[51]",
  backdrop: "z-[51]",
}

const MoreAction: React.FC<MoreActionProps> = ({ groupId, groupType }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLeaveGroup = async () => {
    setIsLoading(true)
    try {
      const response = await deleteGroup(groupId)
      if (response?.data?.message) {
        queryClient.invalidateQueries({
          queryKey: [QueryDataKeys.MY_LIST_CHAT],
        })
        onClose()
        navigate(PATH_NAMES.PRIVATE_AGENT)
      }
    } catch (error) {
      console.error("Failed to leave group:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dropdown classNames={DROPDOWN_CLASSES}>
        <DropdownTrigger>
          <button
            type="button"
            className="group inline-flex w-4 cursor-pointer flex-col items-center justify-center gap-[2px]"
          >
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-500 group-hover:bg-mercury-900" />
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-500 group-hover:bg-mercury-900" />
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-500 group-hover:bg-mercury-900" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Group Actions">
          <DropdownItem onPress={onOpen} color="default" key="leave">
            <span className="font-medium">Leave</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={MODAL_CLASSES}
        size="sm"
      >
        <ModalContent>
          <ModalBody>
            <div className="relative mt-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-20 font-semibold text-mercury-950">
                  Leave chat?
                </span>
                <button
                  onClick={onOpenChange}
                  className="cursor-pointer"
                  aria-label="Close modal"
                >
                  <CloseFilledIcon />
                </button>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <Button
                  className="mt-4 min-w-[90px] rounded-full bg-mercury-200 text-[15px] font-medium text-primary"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="mt-4 min-w-[90px] rounded-full bg-mercury-950 text-[15px] font-medium text-white"
                  onPress={handleLeaveGroup}
                  isLoading={isLoading}
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

export default MoreAction
