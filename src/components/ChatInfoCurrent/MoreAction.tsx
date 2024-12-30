import { CloseFilledIcon } from "@components/Icons/DefiLens"
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
import {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGroup, leaveGroup } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const MoreAction: React.FC<{
  groupId: number
  groupType: TypeGroup
}> = ({ groupId, groupType }) => {
  const [loading, setLoading] = useState(false)
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
        queryClient.setQueryData(
          [QueryDataKeys.IS_REFRESH_CLANS],
          (oldData: boolean) => !oldData,
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
      <Dropdown classNames={{ base: "mt-1" }}>
        <DropdownTrigger>
          <div className="group inline-flex w-4 cursor-pointer flex-col items-center justify-center gap-[2px]">
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-500 group-hover:bg-mercury-900"></span>
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-500 group-hover:bg-mercury-900"></span>
            <span className="h-[3px] w-[3px] rounded-full bg-mercury-500 group-hover:bg-mercury-900"></span>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem onClick={onOpen} color="default" key="leave">
            <span className="font-medium">Leave</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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

export default MoreAction
