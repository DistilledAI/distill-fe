import { solanaCircleIcon } from "@assets/svg"
import CloseButton from "@components/CloseButton"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import React from "react"
import AgentDescription from "./AgentDescription"
import AgentSocials from "./AgentSocials"
import ContractDisplay from "./ContractDisplay"
import { PATH_NAMES } from "@constants/index"
import { useGroupConfig } from "./useGroupConfig"

const AgentLiveInfo: React.FC<{
  groupDetail: UserGroup | null
}> = ({ groupDetail }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const groupConfig = useGroupConfig(groupDetail?.group)
  return (
    <>
      <Button
        className="h-11 w-11 min-w-11 rounded-full bg-mercury-100 p-0"
        onPress={onOpen}
      >
        <InfoCircleOutlineIcon size={20} />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
        placement="bottom"
        classNames={{
          base: "bg-mercury-30 m-0 rounded-b-none h-auto max-h-full",
          wrapper: "z-[99]",
          backdrop: "z-[99]",
        }}
      >
        <ModalContent>
          <ModalHeader className="relative px-3">
            <h3 className="flex-1 text-center text-18 font-semibold text-mercury-950">
              Agent info
            </h3>
            <CloseButton
              onClose={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </ModalHeader>
          <ModalBody className="gap-3 px-3 py-4">
            <AgentSocials
              agentInfo={{
                username: groupDetail?.group?.name as string,
                xLink: groupConfig?.x_link as string,
                teleLink: groupConfig?.telegram_link as string,
                shareLink: `${window.location.origin}${PATH_NAMES.CLAN}/${groupDetail?.group?.label}`,
                contract: groupConfig?.contractAddress as string,
                website: groupConfig?.website_link as string,
              }}
            />
            <ContractDisplay
              classNames={{
                wrapper: "mt-3",
              }}
              icon={groupConfig?.contractAddress ? solanaCircleIcon : ""}
              value={groupConfig?.contractAddress || ""}
            />
            <AgentDescription description={groupConfig?.description} />
          </ModalBody>
          <ModalFooter className="px-3">
            <Button
              className="h-14 w-full rounded-full bg-mercury-950 text-[16px] text-mercury-30"
              onPress={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AgentLiveInfo
