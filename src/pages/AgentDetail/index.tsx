import { STATUS_AGENT } from "@constants/index"
import { TYPE_LLM_MODEL } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import AgentNavTab from "@pages/CreateAgent/NavTab"
import TestAgent from "@pages/CreateAgent/TestAgent"
import { refreshFetchMyAgent } from "@reducers/agentSlice"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAgent, updateAgentConfig } from "services/agent"
import { editAgentClan, uploadImageAgentClan } from "services/group"
import { updateAvatarUser } from "services/user"
import {
  INTERACTION_FREQUENCY_KEY,
  RESPONSE_LENGTH_KEY,
} from "./AgentBehaviors/constants"
import AgentContent from "./AgentContent"
import { transformClanData } from "./AgentContent/ClanUtilities/helper"
import HeaderDetailAgent from "./HeaderDetail"
import {
  getConfigAgentByDataForm,
  getConfigAgentValueByKeys,
  isPassRuleAgentInfo,
  LIST_AGENT_CONFIG_KEYS,
} from "./helpers"
import RepliesDashboard from "./RepliesDashboard"
import useFetchAgentConfig from "./useFetchAgentConfig"
import useFetchDetail from "./useFetchDetail"

export const BLACKLIST_BOT_VERSION = [
  "devorai/distilled-chat:0.0.6.4-cc",
  "devorai/distilled-chat:0.0.6.5-cc",
  "devorai/distilled-chat:0.0.6.6-cc",
  "distilled/distilled-agent:1.0.0-cc",
  "oraichain/distilled-agent:1.0.0",
  "harbor.orai.network/distill/distilled-agent:3.0.0",
  "harbor.orai.network/distill/distilled-agent:4.0.0",
  "harbor.orai.network/distill/distilled-agent:5.0.0",
]

const AgentDetail: React.FC = () => {
  const { agentId } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { agentConfigs, refetch: refetchConfig } = useFetchAgentConfig()
  const { agentData, refetch } = useFetchDetail()
  const clanIdOfAgent = agentData?.botConfigs?.find(
    (val: any) => val?.key === "clanOfAgent",
  )?.value
  const isActive = agentData?.status === STATUS_AGENT.ACTIVE

  const userNameData = agentData?.username
  const descriptionData = agentData?.description
  const firstMsgData = agentData?.firstMsg
  const avatarData = agentData?.avatar
  const typeAgentData = agentData?.typeAgent
  const llmModelData = agentData?.llmModel
  const xBotData = agentConfigs?.find(
    (agent: any) => agent.key === "bindTwitterKey",
  )
  const bindTwitterValue = xBotData?.value ? JSON.parse(xBotData.value) : null
  const twitterUsername = bindTwitterValue?.info?.data?.username

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

  useEffect(() => {
    const defaults: any = {
      username: userNameData,
      description: descriptionData,
      firstMsg: firstMsgData,
      avatar: avatarData,
      typeAgent: typeAgentData,
      llmModel: llmModelData,
      clan: methods.getValues("clan"),
      ...getConfigAgentValueByKeys(agentConfigs, LIST_AGENT_CONFIG_KEYS),
    }
    const selectedBehaviors = {
      personality_traits: [defaults?.personality_traits],
      communication_style: [defaults?.communication_style],
    }
    methods.reset({ ...defaults, ...selectedBehaviors })
  }, [agentData, methods.reset, agentConfigs])

  const onSubmit = async (data: any) => {
    if (!isPassRuleAgentInfo(data) || !isActive) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, avatarFile, ...newData } = data
    const agentIdNumber = Number(agentId)
    const configData = getConfigAgentByDataForm(data)

    try {
      setLoading(true)
      const res = await updateAgent({
        ...newData,
        botId: agentIdNumber,
      })
      if (data.avatarFile) {
        const formData = new FormData()
        formData.append("file", data.avatarFile)
        formData.append("userId", agentData?.id?.toString() ?? "")
        await updateAvatarUser(formData)
      }
      if (configData.length > 0) {
        await updateAgentConfig({
          botId: agentIdNumber,
          data: [
            ...configData,
            { key: "llm_model", value: newData?.llmModel?.toString() },
          ],
        })
      }
      if (res.data) {
        refetchConfig()
        refetch()
        dispatch(refreshFetchMyAgent())
        toast.success("Updated successfully!")
      }

      // edit agent clan
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
    } catch (error: any) {
      console.error("error", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          <HeaderDetailAgent isLoading={loading} />
          <div className="relative mx-auto flex max-w-[1440px] items-start gap-[40px] px-6 py-6">
            <div className="w-[260px]">
              <AgentNavTab isEdit />
            </div>
            <div className="flex-1">
              <AgentContent
                agentData={agentData}
                agentConfigs={agentConfigs}
                refetch={refetch}
                clanIdOfAgent={clanIdOfAgent}
              />
            </div>
            <div className="w-[330px]">
              {twitterUsername && (
                <div className="flex items-center justify-between rounded-lg bg-brown-50 p-4">
                  <span className="text-base-b text-mercury-950">
                    @{twitterUsername}
                  </span>
                  <RepliesDashboard isDisabled={!twitterUsername} />
                </div>
              )}
              <TestAgent />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentDetail
