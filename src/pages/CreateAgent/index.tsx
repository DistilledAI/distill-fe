import { useLocation } from "react-router-dom"
import AgentHeader from "./Header"
import AgentNavTab from "./NavTab"
import TestAgent from "./TestAgent"
import AgentContent from "./Content"
import CreateAgentModal from "@components/CreateAgentModal"
import { FormProvider, useForm } from "react-hook-form"
import {
  INTERACTION_FREQUENCY_KEY,
  RESPONSE_LENGTH_KEY,
} from "@pages/AgentDetail/AgentBehaviors/constants"

const CreateAgent = () => {
  const { state } = useLocation()
  const isShowModalCreate =
    !state || state?.typeAgent === null || state?.llmModel === null

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
      avatar: "",
      personality_traits: [],
      communication_style: [],
      interaction_frequency: INTERACTION_FREQUENCY_KEY.Occasionally,
      tone_adaptation: false,
      response_length: RESPONSE_LENGTH_KEY.Moderate,
      knowledge_domain: "",
      prohibited_topics: "",
      audience_profile: "",
      sample_prompts: "",
      customization_instruction: "",
      post_interval: "30m",
      category: "crypto",
      typeAgent: state?.typeAgent,
      llmModel: state?.llmModel,
    },
  })

  return (
    <FormProvider {...methods}>
      <div className="pt-[70px]">
        <AgentHeader />
        <div className="relative mx-auto flex max-w-[1536px] items-start gap-[40px] px-6 py-6">
          <div className="w-[260px]">
            <AgentNavTab />
          </div>
          <div className="flex-1">
            <AgentContent />
          </div>
          <div className="w-[330px]">
            <TestAgent />
          </div>
        </div>
        {isShowModalCreate && (
          <CreateAgentModal
            isCanClose={false}
            isOpen={true}
            onClose={() => {}}
          />
        )}
      </div>
    </FormProvider>
  )
}

export default CreateAgent
