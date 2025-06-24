import { useLocation, useNavigate } from "react-router-dom"
import AgentHeader from "./Header"
import AgentNavTab from "./NavTab"
// import TestAgent from "./TestAgent"
import CreateAgentModal from "@components/CreateAgentModal"
import { COMMUNICATION_STYLE_LIST, PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { AGENT_TYPE_KEY } from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import { refreshFetchMyAgent } from "@reducers/agentSlice"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateAgentConfig } from "services/agent"
import { createBot } from "services/chat"
import { updateAvatarUser } from "services/user"
import AgentContent from "./Content"

const DESC_MAX_LENGTH = 200

const CreateAgent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const myAgents = useAppSelector((state) => state.agents.myAgents)

  const isShowModalCreate =
    !state || state?.typeAgent === null || state?.llmModel === null

  const isBotCreated = myAgents.length > 0

  useEffect(() => {
    if (isBotCreated) {
      navigate(`${PATH_NAMES.AGENT_DETAIL}/${myAgents[0].id}`)
    }
  }, [isBotCreated])

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      avatar: "",
      personality_traits: [],
      communication_style: [],
      website_link: "",
      x_link: "",
      telegram_link: "",
    },
  })

  const isPassRuleAgentInfo = (data: any) => {
    const isUsernameLengthPass =
      data["username"]?.length >= 3 && data["username"]?.length <= 30
    const isDescLengthPass = data["description"]?.length <= DESC_MAX_LENGTH
    const hasPersonality = data["personality_traits"]?.length > 0

    if (!isUsernameLengthPass) {
      toast.warning("Agent name within 3-30 characters")
      return false
    }
    if (!isDescLengthPass) {
      toast.warning(`Agent bio max ${DESC_MAX_LENGTH} characters`)
      return false
    }
    if (!hasPersonality) {
      toast.warning("Please select the trait!")
      return false
    }
    return true
  }

  const onSubmit = async (data: any, isPause?: boolean) => {
    if (isPause) return
    try {
      if (isBotCreated)
        return toast.info("Your agent is created, please check again!")
      if (!isPassRuleAgentInfo(data)) return

      setIsLoading(true)

      const { avatar, avatarFile, ...newData } = data
      const res = await createBot({
        ...newData,
        name: newData?.username,
        typeAgent: AGENT_TYPE_KEY.DEFAI,
        llmModel: state?.llmModel,
      })
      const botId = res?.data?.id
      const isUpdateAvatar = botId && data.avatarFile
      if (res && botId) {
        toast.success("Created agent successfully")
        navigate(PATH_NAMES.ACCOUNT)
      }

      if (botId) {
        const payloadConfig = [
          {
            key: "communication_style",
            value:
              !newData.communication_style?.[0] ||
              newData.communication_style?.[0] !== ""
                ? COMMUNICATION_STYLE_LIST[0].value
                : newData.communication_style?.[0],
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data, true))}>
        <div className="pt-[70px]">
          <AgentHeader isLoading={isLoading} />
          <div className="relative mx-auto flex max-w-[1206px] items-start gap-[40px] px-6 py-6 max-md:flex-col">
            <div className="w-[260px]">
              <AgentNavTab />
            </div>
            <div className="flex-1">
              <AgentContent />
            </div>
            {/* <div className="w-[330px]">
            <TestAgent />
          </div> */}
          </div>
          {isShowModalCreate && (
            <CreateAgentModal
              isCanClose={false}
              isOpen={true}
              onClose={() => {}}
            />
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default CreateAgent
