import CloseButton from "@components/CloseButton"
import { LinkAccountIcon } from "@components/Icons"
import { TwitterIcon } from "@components/Icons/Twitter"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AgentConfig } from "../useFetchAgentConfig"
import AutoSetup from "./AutoSetup"
import BindOptions from "./BindOptions"
import ManualSetup from "./ManualSetup"

const BindYourAccount: React.FC<{
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentConfigs, refetch }) => {
  const telegramBotData = agentConfigs?.find(
    (agent: any) => agent.key === "bindTwitterKey",
  )
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const methods = useForm({
    defaultValues: {
      consumerKey: "",
      consumerSecret: "",
      accessToken: "",
      accessTokenSecret: "",
    },
  })
  const [selectedKey, setSelectedKey] = useState<string>("MANUAL")
  const isManualOption = selectedKey === "MANUAL"

  return (
    <>
      {telegramBotData ? (
        <div className="flex items-center gap-2">
          <TwitterIcon />
          <span
            className="text-base-md cursor-pointer text-brown-10 hover:underline"
            onClick={onOpen}
          >
            Change
          </span>
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center gap-2 hover:underline"
          onClick={onOpen}
        >
          <LinkAccountIcon />
          <span className="text-base-md text-brown-500">Bind your Account</span>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "bg-mercury-100",
        }}
        size="xl"
        id="bind-your-account-modal"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="relative px-6">
            <h3 className="flex-1 text-start text-24 font-semibold text-mercury-950">
              Bind your Account
            </h3>
            <CloseButton
              onClose={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </ModalHeader>
          <ModalBody className="gap-4 px-6 py-4 pb-10">
            <BindOptions
              setSelectedKey={setSelectedKey}
              selectedKey={selectedKey}
            />

            {isManualOption ? (
              <ManualSetup methods={methods} refetch={refetch} />
            ) : (
              <AutoSetup methods={methods} refetch={refetch} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BindYourAccount
