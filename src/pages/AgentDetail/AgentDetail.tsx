import AgentHeader from "./HeaderDetail"
import { FormProvider, useForm } from "react-hook-form"
import {
  INTERACTION_FREQUENCY_KEY,
  RESPONSE_LENGTH_KEY,
} from "./AgentBehaviors/constants"
import { TYPE_LLM_MODEL } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import AgentNavTab from "@pages/CreateAgent/NavTab"
import AgentContent from "./AgentContent"
import useFetchDetail from "./useFetchDetail"
import { editAgentClan, uploadImageAgentClan } from "services/group"
import { transformClanData } from "./AgentContent/ClanUtilities/helper"

const AgentDetail = () => {
  const { agentData } = useFetchDetail()
  const clanIdOfAgent = agentData?.botConfigs?.find(
    (val: any) => val?.key === "clanOfAgent",
  )?.value

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
        name: "",
        imageLive: null,
        isEnableClan: 2,
      },
    },
  })

  const onSubmit = async (data: any) => {
    if (data.clan.imageLive instanceof File) {
      const formData = new FormData()
      formData.append("file", data.clan.imageLive)
      formData.append("key", "imageLive")
      formData.append("groupId", clanIdOfAgent || "")
      formData.append("type", "clan")
      await uploadImageAgentClan(formData)
    }

    await editAgentClan({
      groupId: Number(clanIdOfAgent),
      data: transformClanData({
        ...data.clan,
        label: data.clan.name,
      }),
    })
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
              <AgentContent clanIdOfAgent={clanIdOfAgent} />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default AgentDetail
