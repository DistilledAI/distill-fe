import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import {
  COMMUNICATION_STYLE_LIST,
  PATH_NAMES,
  PERSONALITY_LIST,
} from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import AgentBehaviors, {
  SelectedBehaviors,
} from "@pages/AgentDetail/AgentBehaviors"
import { Divider } from "@pages/AgentDetail/CategoryLabel"
import GeneralInfo from "@pages/AgentDetail/GeneralInfo"
import { isPassRuleAgentInfo } from "@pages/AgentDetail/helpers"
import { refreshFetchMyAgent } from "@reducers/agentSlice"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAgentConfig } from "services/agent"
import { createBot } from "services/chat"
import { updateAvatarUser } from "services/user"
import AgentType from "./AgentType"
import Header from "./Header"

const AgentInitialization = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myAgents = useAppSelector((state) => state.agents.myAgents)

  const isBotCreated = myAgents.length > 0

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      avatar: "",
      personality_traits: [PERSONALITY_LIST[0].value],
      communication_style: [COMMUNICATION_STYLE_LIST[0].value],
      website_link: "",
      x_link: "",
      telegram_link: "",
      agentType: 0,
    },
  })

  const onSubmit = async (data: any) => {
    try {
      if (isBotCreated)
        return toast.info("Your agent is created, please check again!")
      if (!isPassRuleAgentInfo(data)) return

      setIsLoading(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { avatar, avatarFile, ...newData } = data
      const res = await createBot({
        ...newData,
        name: newData?.username,
      })
      const botId = res?.data?.id
      const isUpdateAvatar = botId && data.avatarFile
      if (res && botId) {
        toast.success("Created agent successfully")
        navigate(`${PATH_NAMES.ADD_MY_DATA}/${botId}`)
      }
      if (botId) {
        const payloadConfig = [
          {
            key: "communication_style",
            value: newData.communication_style?.[0],
          },
          {
            key: "personality_traits",
            value: newData.personality_traits?.[0],
          },
        ]
        await updateAgentConfig({
          botId,
          data: payloadConfig,
        })
      }
      if (isUpdateAvatar) {
        const formData = new FormData()
        formData.append("file", data.avatarFile)
        formData.append("userId", botId.toString() ?? "")
        await updateAvatarUser(formData)
      }

      dispatch(refreshFetchMyAgent())
    } catch (error: any) {
      console.error({ error })
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    methods.setValue("personality_traits", selected.personality_traits)
    methods.setValue("communication_style", selected.communication_style)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header isLoading={isLoading} />
        <div className="mx-auto max-w-[768px] space-y-8 pb-[100px] pt-6 max-xl:px-4 max-md:min-h-dvh max-md:bg-mercury-70">
          <AgentType />
          <GeneralInfo />
          <Divider />
          <AgentBehaviors
            selectedBehaviors={{
              personality_traits: methods.watch("personality_traits"),
              communication_style: methods.watch("communication_style"),
            }}
            onSelectBehaviors={handleSelectBehaviors}
            isCreate
          />
          <Divider />
          <div className="flex items-center gap-2">
            <InfoCircleOutlineIcon color="#A2845E" />
            <p className="text-[22px] font-bold text-mercury-950">
              You can set more advanced preferences for your agent later.
            </p>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentInitialization
