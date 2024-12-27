import { BoltOutlineIcon, TargetIcon } from "@components/Icons"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { DatabaseSettingIcon } from "@components/Icons/DatabaseImportIcon"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import SmoothScrollTo from "@components/SmoothScrollTo"
import {
  COMMUNICATION_STYLE_LIST,
  PERSONALITY_LIST,
  STATUS_AGENT,
} from "@constants/index"
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
  const agentBehaviors = agentData?.agentBehaviors
    ? JSON.parse(agentData?.agentBehaviors)
    : {}
  const agentPersonalData = agentBehaviors?.agentPersonal || []
  const agentCommunicationData = agentBehaviors?.agentCommunication || []

  const handleSetValueCustomDefaultDisplay = (
    data: any,
    list: any,
    name: "agentPersonal" | "agentCommunication",
  ) => {
    const isDataCustom = !list.map((item: any) => item.value).includes(data)
    const value = isDataCustom
      ? {
          [name]: {
            value: data,
            isFocused: false,
          },
        }
      : undefined
    setValueCustomDefault((prev: any) => ({ ...prev, ...value }))
  }

  useEffect(() => {
    if (agentPersonalData.length)
      handleSetValueCustomDefaultDisplay(
        agentPersonalData[0],
        PERSONALITY_LIST,
        "agentPersonal",
      )
    if (agentCommunicationData.length)
      handleSetValueCustomDefaultDisplay(
        agentCommunicationData[0],
        COMMUNICATION_STYLE_LIST,
        "agentCommunication",
      )
  }, [agentPersonalData.length, agentCommunicationData.length])

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
      avatar: "",
      agentPersonal: [],
      agentCommunication: [],
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
    },
  })

  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    const { agentPersonal, agentCommunication } = selected
    methods.setValue("agentPersonal", agentPersonal)
    methods.setValue("agentCommunication", agentCommunication)
  }

  useEffect(() => {
    const defaults = {
      username: userNameData,
      description: descriptionData,
      firstMsg: firstMsgData,
      avatar: avatarData,
      agentPersonal: agentPersonalData,
      agentCommunication: agentCommunicationData,
      ...getConfigAgentValueByKeys(agentConfigs, LIST_AGENT_CONFIG_KEYS),
    }
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
          data: configData,
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
      title: "Appearance",
      content: <GeneralInfo agentData={agentData} />,
      icon: <ClipboardTextIcon />,
    },
    {
      title: "Behaviors",
      content: (
        <AgentBehaviors
          onSelectBehaviors={handleSelectBehaviors}
          selectedBehaviors={{
            agentPersonal: methods.watch("agentPersonal"),
            agentCommunication: methods.watch("agentCommunication"),
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
            offsetAdjustment={300}
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
