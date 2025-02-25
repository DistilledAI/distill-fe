import { BoltOutlineIcon, TargetIcon } from "@components/Icons"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { DatabaseSettingIcon } from "@components/Icons/DatabaseImportIcon"
import {
  StarUserIconOutline,
  UserHexagonIcon,
} from "@components/Icons/UserIcon"
import SmoothScrollTo from "@components/SmoothScrollTo"
import { BEHAVIORS_AGENT, STATUS_AGENT } from "@constants/index"
import { TYPE_LLM_MODEL } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import { refreshFetchMyAgent } from "@reducers/agentSlice"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAgent, updateAgentConfig } from "services/agent"
import { updateAvatarUser } from "services/user"
import AgentBehaviors, { SelectedBehaviors } from "./AgentBehaviors"
import {
  INTERACTION_FREQUENCY_KEY,
  RESPONSE_LENGTH_KEY,
} from "./AgentBehaviors/constants"
import Functions from "./Functions"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"
import KnowledgeAgent from "./Knowledge"
import Monetization from "./Monetization"
import TargetAudience from "./TargetAudience"
import {
  getConfigAgentByDataForm,
  getConfigAgentValueByKeys,
  isPassRuleAgentInfo,
  LIST_AGENT_CONFIG_KEYS,
} from "./helpers"
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
  const [valueCustomDefault, setValueCustomDefault] = useState<any>()

  const { agentConfigs } = useFetchAgentConfig()
  const { agentData, refetch } = useFetchDetail()
  const isActive = agentData?.status === STATUS_AGENT.ACTIVE

  const userNameData = agentData?.username
  const descriptionData = agentData?.description
  const firstMsgData = agentData?.firstMsg
  const avatarData = agentData?.avatar
  const typeAgentData = agentData?.typeAgent
  const llmModelData = agentData?.llmModel
  const botVersionData = agentData?.botVersion
  const isDisabledLLMModel = BLACKLIST_BOT_VERSION.includes(botVersionData)

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
    },
  })

  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    const { personality_traits, communication_style } = selected
    methods.setValue("personality_traits", personality_traits)
    methods.setValue("communication_style", communication_style)
  }

  const updateCustomFields = (selectedBehaviors: SelectedBehaviors) => {
    const updatedFields: {
      [key: string]: { value: string; isFocused: boolean }
    } = {}

    Object.keys(selectedBehaviors).forEach((key) => {
      const value = selectedBehaviors[key as keyof SelectedBehaviors]?.[0]
      const validList = BEHAVIORS_AGENT[key as keyof typeof BEHAVIORS_AGENT]

      if (
        validList &&
        value &&
        !validList.some((item) => item.value === value)
      ) {
        updatedFields[key] = {
          value,
          isFocused: true,
        }
      }
    })

    setValueCustomDefault(updatedFields)
  }

  useEffect(() => {
    const defaults: any = {
      username: userNameData,
      description: descriptionData,
      firstMsg: firstMsgData,
      avatar: avatarData,
      typeAgent: typeAgentData,
      llmModel: llmModelData,
      ...getConfigAgentValueByKeys(agentConfigs, LIST_AGENT_CONFIG_KEYS),
    }
    const selectedBehaviors = {
      personality_traits: [defaults?.personality_traits],
      communication_style: [defaults?.communication_style],
    }
    updateCustomFields(selectedBehaviors)
    methods.reset(defaults)
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
        refetch()
        dispatch(refreshFetchMyAgent())
        toast.success("Updated successfully!")
      }
    } catch (error: any) {
      console.error("error", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const componentScrollTo = [
    {
      title: "Agent Type",
      // content: <AgentType isDisabled />,
      content: <div></div>,
      icon: <UserHexagonIcon />,
    },
    {
      title: "Public Appearance",
      content: <GeneralInfo agentData={agentData} />,
      icon: <ClipboardTextIcon />,
    },
    {
      title: "Behaviors",
      content: (
        <AgentBehaviors
          onSelectBehaviors={handleSelectBehaviors}
          selectedBehaviors={{
            personality_traits: methods.watch("personality_traits"),
            communication_style: methods.watch("communication_style"),
          }}
          valueCustomDefault={valueCustomDefault}
        />
      ),
      icon: <StarUserIconOutline color="#A2845E" />,
    },
    {
      title: "Autonomous AI Agent",
      content: (
        <Functions
          agentData={agentData}
          agentConfigs={agentConfigs}
          refetch={refetch}
        />
      ),
      isNew: true,
      icon: <BoltOutlineIcon color="#A2845E" />,
    },
    {
      title: "Knowledge",
      content: <KnowledgeAgent />,
      icon: <DatabaseSettingIcon />,
    },
    {
      title: "Target Audience",
      content: <TargetAudience />,
      icon: <TargetIcon />,
    },
    {
      title: "Monetization",
      content: <Monetization />,
      icon: <ClipboardTextIcon />,
    },
  ]

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header submitLoading={loading} agentData={agentData} />
          <SmoothScrollTo
            components={componentScrollTo}
            offsetAdjustment={200}
            classNames={{
              contentWrapper: "pt-5",
            }}
          />
        </form>
      </FormProvider>
    </>
  )
}
export default AgentDetail
