import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { PATH_NAMES } from "@constants/index"
import { Button, Modal, ModalContent } from "@nextui-org/react"
import AgentType, {
  TYPE_LLM_MODEL,
} from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateAgentModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [typeAgent, setTypeAgent] = useState<number>(0)
  const [llmModel, setLlmModel] = useState<number>(
    TYPE_LLM_MODEL.LLM_MODEL_BASIC,
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-mercury-100 py-6 max-md:py-4 max-w-[800px]",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      backdrop="blur"
    >
      <ModalContent>
        <div className="px-4">
          <div className="relative flex items-center justify-center">
            <p className="mb-2 text-20 font-semibold">Select Agent Type</p>
            <div
              onClick={onClose}
              className="absolute right-0 top-0 cursor-pointer"
            >
              <CloseFilledIcon />
            </div>
          </div>
          <div>
            <AgentType
              llmModel={llmModel}
              setLlmModel={setLlmModel}
              typeAgent={typeAgent}
              setTypeAgent={setTypeAgent}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              onPress={() =>
                navigate(PATH_NAMES.CREATE_AGENT, {
                  state: { typeAgent, llmModel },
                })
              }
              className="mt-5 h-[46px] rounded-full bg-mercury-950 font-semibold text-white"
            >
              Next - Setup Information
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default CreateAgentModal
