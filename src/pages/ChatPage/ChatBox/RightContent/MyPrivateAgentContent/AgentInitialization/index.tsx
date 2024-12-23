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
import { createBot } from "services/chat"
import { updateAvatarUser } from "services/user"
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
      agentPersonal: [PERSONALITY_LIST[0].value],
      agentCommunication: [COMMUNICATION_STYLE_LIST[0].value],
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
    methods.setValue("agentPersonal", selected.agentPersonal)
    methods.setValue("agentCommunication", selected.agentCommunication)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header isLoading={isLoading} />
        <div className="mx-auto max-w-[768px] space-y-8 pb-[100px] pt-6 max-xl:px-4 max-md:min-h-dvh max-md:bg-mercury-70">
          <GeneralInfo />
          <Divider />
          <AgentBehaviors
            selectedBehaviors={{
              agentPersonal: methods.watch("agentPersonal"),
              agentCommunication: methods.watch("agentCommunication"),
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
