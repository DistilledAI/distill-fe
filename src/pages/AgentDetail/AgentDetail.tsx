import AgentHeader from "./HeaderDetail"
import { FormProvider, useForm } from "react-hook-form"
import {
  INTERACTION_FREQUENCY_KEY,
  RESPONSE_LENGTH_KEY,
} from "./AgentBehaviors/constants"
import { TYPE_LLM_MODEL } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import AgentNavTab from "@pages/CreateAgent/NavTab"
import AgentContent from "./AgentContent"
// import { useParams } from "react-router-dom"
// import { editAgentClan, uploadImageAgentClan } from "services/group"

const AgentDetail = () => {
  // const { agentId } = useParams()

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
      typeAgent: 0,
      llmModel: TYPE_LLM_MODEL.LLM_MODEL_BASIC,
      clan: {
        description: "",
        label: "",
        imageLive: null,
        videoLive: null,
        isEnableClan: 0,
      },
    },
  })

  const onSubmit = async (data: any) => {
    // const formData = new FormData()
    // formData.append("file", data.clan.imageLive || data.clan.videLive)
    // formData.append("key", data.clan.imageLive ? "imageLive" : "videoLive")
    // formData.append("groupId", agentId || "")
    // formData.append("type", "clan")
    // await uploadImageAgentClan(formData)
    // const res = await editAgentClan({
    //   groupId: Number(agentId),
    //   data: transformClanData(data.clan),
    // })
    console.log({ data })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          <AgentHeader isLoading={false} />
          <div className="relative mx-auto flex max-w-[1206px] items-start gap-[40px] px-6 py-6">
            <div className="w-[260px]">
              <AgentNavTab isEdit />
            </div>
            <div className="flex-1">
              <AgentContent />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default AgentDetail
