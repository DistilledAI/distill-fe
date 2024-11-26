import GeneralInfo from "@pages/AgentDetail/GeneralInfo"
import { FormProvider, useForm } from "react-hook-form"
import Header from "./Header"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { Divider } from "@pages/AgentDetail/CategoryLabel"
import AgentBehaviors, {
  SelectedBehaviors,
} from "@pages/AgentDetail/AgentBehaviors"
import { useState } from "react"
import { createBot } from "services/chat"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {
  COMMUNICATION_STYLE_LIST,
  PATH_NAMES,
  PERSONALITY_LIST,
} from "@constants/index"
import { updateAvatarUser } from "services/user"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { isPassRuleAgentInfo } from "@pages/AgentDetail/helpers"

const AgentInitialization = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })

  const isBotCreated = data ? data.data.items.length > 0 : false

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
